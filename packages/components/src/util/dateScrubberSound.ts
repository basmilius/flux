export type DateScrubberSound = 'line' | 'month' | 'travel' | 'fine' | 'close';

type Voice = {
    readonly pitch: number;
    readonly decay: number;
    readonly level: number;
    readonly clear?: number;
};

const MASTER_GAIN = 0.2;
const MIN_GAP = 0.06;
const TRAIL_GAP = 0.02;
const MAX_TRAIL_AHEAD = 0.25;
const PARTIALS = [
    [5200, 0.8, 0.6],
    [7400, 0.5, 0.4]
] as const;
const NOISE = {decay: 0.25, gain: 0.5, highpass: 4000};
const VOICES: Record<DateScrubberSound, Voice> = {
    line: {pitch: 1, decay: 1, level: 1},
    month: {pitch: 0.88, decay: 1.2, level: 1.1},
    travel: {pitch: 1.08, decay: 0.8, level: 0.5},
    fine: {pitch: 1.5, decay: 0.7, level: 0.55},
    close: {pitch: 1.2, decay: 0.85, level: 0.4, clear: 0.07}
};

let context: AudioContext | undefined;
let failedResumes = 0;
let lastResumeAttempt = -1e9;
let unlockInstalled = false;

let buffers: Record<DateScrubberSound, AudioBuffer> | undefined;
let busyUntil = 0;
let pending: { kind: DateScrubberSound; level: number } | undefined;
let pendingTimer = 0;
let lastStart = -1;
let trailEnd = 0;
let boundContext: AudioContext | undefined;
let deferred: { kind: DateScrubberSound; level: number; trail: boolean } | undefined;
let deferredContext: AudioContext | undefined;

function watchContext(audio: AudioContext): void {
    audio.addEventListener('statechange', () => {
        if (audio.state === 'running' && context === audio) {
            failedResumes = 0;
        }
    });
}

function createContext(): AudioContext | undefined {
    const Context = window.AudioContext ?? (window as any).webkitAudioContext;

    if (!Context) {
        return undefined;
    }

    context = new Context();
    failedResumes = 0;
    watchContext(context);

    return context;
}

function recreateContext(): AudioContext | undefined {
    if (context && context.state !== 'closed') {
        context.close().catch(() => {
        });
    }

    return createContext();
}

/**
 * Browsers only start audio from a user gesture, and iOS sometimes leaves a
 * context suspended forever; after two failed resumes it gets replaced.
 */
export function unlockDateScrubberAudio(): void {
    const audio = context ?? createContext();

    if (!audio) {
        return;
    }

    if (audio.state === 'running') {
        failedResumes = 0;
        return;
    }

    if (audio.state === 'closed' || failedResumes >= 2) {
        const fresh = recreateContext();

        if (fresh && fresh.state !== 'running') {
            fresh.resume();
        }

        return;
    }

    const now = performance.now();

    if (now - lastResumeAttempt > 600) {
        failedResumes++;
        lastResumeAttempt = now;
    }

    audio.resume();
}

// Safari can report a running context whose clock no longer advances after a bfcache restore.
function reviveContext(): void {
    const audio = context;

    if (!audio) {
        return;
    }

    if (audio.state === 'closed') {
        recreateContext();
        return;
    }

    if (audio.state !== 'running') {
        audio.resume();
        return;
    }

    const time = audio.currentTime;

    setTimeout(() => {
        if (context === audio && audio.state === 'running' && audio.currentTime === time) {
            recreateContext();
        }
    }, 350);
}

export function installDateScrubberAudio(): void {
    if (unlockInstalled || typeof window === 'undefined') {
        return;
    }

    unlockInstalled = true;

    window.addEventListener('touchstart', unlockDateScrubberAudio, {capture: true, passive: true});
    window.addEventListener('pointerdown', unlockDateScrubberAudio, {capture: true, passive: true});
    window.addEventListener('touchend', unlockDateScrubberAudio, {capture: true, passive: true});
    window.addEventListener('pointerup', unlockDateScrubberAudio, {capture: true, passive: true});
    window.addEventListener('keydown', unlockDateScrubberAudio, {capture: true});
    window.addEventListener('pageshow', reviveContext);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            reviveContext();
        }
    });
}

function runningContext(): AudioContext | undefined {
    return context && context.state === 'running' ? context : undefined;
}

// A highpassed noise burst with two decaying partials on top, normalized to peak at 1.
function synthesize(sampleRate: number, pitch: number, decay: number): Float32Array {
    const length = Math.round(sampleRate * 0.04 * Math.max(1, decay));
    const samples = new Float32Array(length);
    const omega = (2 * Math.PI * NOISE.highpass * pitch) / sampleRate;
    const cos = Math.cos(omega);
    const alpha = Math.sin(omega) / 1.414;
    const [b0, b1, b2] = [(1 + cos) / 2, -(1 + cos), (1 + cos) / 2];
    const [a0, a1, a2] = [1 + alpha, -2 * cos, 1 - alpha];
    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;
    let peak = 0;

    for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        const noise = Math.random() * 2 - 1;
        const filtered = (b0 * noise + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;

        x2 = x1;
        x1 = noise;
        y2 = y1;
        y1 = filtered;

        let sample = NOISE.gain * filtered * Math.exp(-time / ((NOISE.decay * decay) / 1000)) * 3;

        for (const [frequency, partialDecay, gain] of PARTIALS) {
            sample += gain * Math.sin(2 * Math.PI * frequency * pitch * time) * Math.exp(-time / ((partialDecay * decay) / 1000));
        }

        samples[i] = sample * Math.min(1, time / 1e-4);
        peak = Math.max(peak, Math.abs(samples[i]));
    }

    const fade = Math.round(sampleRate * 0.005);

    for (let i = 0; i < fade; i++) {
        samples[length - 1 - i] *= i / fade;
    }

    for (let i = 0; i < length; i++) {
        samples[i] /= peak || 1;
    }

    return samples;
}

function bufferFor(audio: AudioContext, kind: DateScrubberSound): AudioBuffer {
    if (!buffers) {
        const render = (voice: DateScrubberSound): AudioBuffer => {
            const samples = synthesize(audio.sampleRate, VOICES[voice].pitch, VOICES[voice].decay);
            const buffer = audio.createBuffer(1, samples.length, audio.sampleRate);
            buffer.getChannelData(0).set(samples);

            return buffer;
        };

        buffers = {
            line: render('line'),
            month: render('month'),
            travel: render('travel'),
            fine: render('fine'),
            close: render('close')
        };
    }

    return buffers[kind];
}

function schedule(audio: AudioContext, kind: DateScrubberSound, level: number, at: number): void {
    const source = audio.createBufferSource();
    source.buffer = bufferFor(audio, kind);
    source.playbackRate.value = 1 + (Math.random() - 0.5) * 0.04;

    const gain = audio.createGain();
    gain.gain.value = MASTER_GAIN * VOICES[kind].level * level;

    source.connect(gain).connect(audio.destination);
    source.start(at);
}

/**
 * Plays one click. A trail queues clicks back to back (scrolling past items),
 * otherwise clicks within the minimum gap collapse into the latest one.
 */
export function playDateScrubberSound(kind: DateScrubberSound, level: number = 1, trail: boolean = false): void {
    const audio = runningContext();

    if (!audio) {
        const suspended = context;

        if (!suspended) {
            return;
        }

        deferred = {kind, level, trail};

        if (deferredContext !== suspended) {
            deferredContext = suspended;
            suspended.addEventListener('statechange', () => {
                if (suspended.state !== 'running' || !deferred) {
                    return;
                }

                const replay = deferred;
                deferred = undefined;
                playDateScrubberSound(replay.kind, replay.level, replay.trail);
            });
        }

        return;
    }

    deferred = undefined;

    if (audio !== boundContext) {
        boundContext = audio;
        busyUntil = 0;
        lastStart = -1;
        trailEnd = 0;
    }

    if (trail) {
        const at = Math.max(audio.currentTime, trailEnd);

        if (at - audio.currentTime > MAX_TRAIL_AHEAD) {
            return;
        }

        trailEnd = at + TRAIL_GAP;
        lastStart = Math.max(lastStart, at);
        schedule(audio, kind, level, at);
        return;
    }

    const clear = VOICES[kind].clear ?? 0;

    if (!clear && audio.currentTime < busyUntil) {
        pending = {kind, level};
        pendingTimer ||= window.setTimeout(() => {
            pendingTimer = 0;
            const next = pending;
            pending = undefined;

            if (next) {
                playDateScrubberSound(next.kind, next.level);
            }
        }, (busyUntil - audio.currentTime) * 1000 + 1);
        return;
    }

    if (clear) {
        pending = undefined;
    }

    const at = Math.max(audio.currentTime, lastStart + clear);
    lastStart = at;
    busyUntil = at + Math.max(MIN_GAP, clear);
    schedule(audio, kind, level, at);
}
