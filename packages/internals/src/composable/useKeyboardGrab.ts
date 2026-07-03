import { computed, type ComputedRef, ref, type Ref, unref } from 'vue';

export type KeyboardGrabDirection = 'up' | 'down' | 'left' | 'right';

export type UseKeyboardGrabOptions<TPos> = {
    readonly isDraggable: Ref<boolean>;
    readonly itemId: Ref<string | number | null | undefined>;
    readonly grabbedId: Ref<string | number | null>;
    onGrab(): TPos;
    onMove(direction: KeyboardGrabDirection): void;
    onCommit(origin: TPos | null): void;
    onCancel(origin: TPos | null): void;
    announce?(message: string): void;
};

export type UseKeyboardGrabReturn = {
    readonly isGrabbed: ComputedRef<boolean>;
    handleKeyDown(evt: KeyboardEvent): void;
    release(): void;
};

let liveRegion: HTMLElement | null = null;

function ensureLiveRegion(): HTMLElement {
    if (liveRegion) {
        return liveRegion;
    }

    if (typeof document === 'undefined') {
        return null as unknown as HTMLElement;
    }

    const region = document.createElement('div');
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    document.body.appendChild(region);
    liveRegion = region;
    return region;
}

export function defaultAnnounce(message: string): void {
    const region = ensureLiveRegion();

    if (!region) {
        return;
    }

    region.textContent = '';
    requestAnimationFrame(() => {
        region.textContent = message;
    });
}

/**
 * Generic keyboard-grab state machine. Maps Space/Enter/Escape/Arrow keys
 * onto grab/commit/cancel/move callbacks. The actual movement logic is
 * delegated to `onMove` since it depends on the host component's topology.
 */
export default function useKeyboardGrab<TPos>(options: UseKeyboardGrabOptions<TPos>): UseKeyboardGrabReturn {
    const origin = ref<TPos | null>(null);
    const announce = options.announce ?? defaultAnnounce;

    const isGrabbed = computed<boolean>(() => {
        const id = unref(options.itemId);
        const grabbed = unref(options.grabbedId);

        return id != null && grabbed === id;
    });

    function release(): void {
        origin.value = null;
    }

    function handleKeyDown(evt: KeyboardEvent): void {
        if (!unref(options.isDraggable)) {
            return;
        }

        const id = unref(options.itemId);

        if (id == null) {
            return;
        }

        if (!isGrabbed.value) {
            if (evt.key === ' ' || evt.key === 'Enter') {
                evt.preventDefault();
                origin.value = options.onGrab() as TPos;
                announce('Grabbed, use arrow keys to move');
            }

            return;
        }

        switch (evt.key) {
            case 'ArrowUp':
                evt.preventDefault();
                options.onMove('up');
                announce('Moved up');
                break;

            case 'ArrowDown':
                evt.preventDefault();
                options.onMove('down');
                announce('Moved down');
                break;

            case 'ArrowLeft':
                evt.preventDefault();
                options.onMove('left');
                announce('Moved left');
                break;

            case 'ArrowRight':
                evt.preventDefault();
                options.onMove('right');
                announce('Moved right');
                break;

            // The grabbed state is owned by the shared `grabbedId` ref (already checked
            // above); `origin` is instance-local and is lost when the host component
            // remounts mid-grab (e.g. a calendar item that moved to another cell), so it
            // must not gate the commit/cancel — it's passed along as best-effort data.
            case ' ':
            case 'Enter': {
                evt.preventDefault();
                const originValue = origin.value;
                origin.value = null;

                options.onCommit(originValue);
                announce('Dropped');
                break;
            }

            case 'Escape': {
                evt.preventDefault();
                const originValue = origin.value;
                origin.value = null;

                options.onCancel(originValue);
                announce('Cancelled');
                break;
            }
        }
    }

    return {
        isGrabbed,
        handleKeyDown,
        release
    };
}
