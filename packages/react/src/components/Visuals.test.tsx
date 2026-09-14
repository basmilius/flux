import { act, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
    FluxVisualAttention,
    type FluxVisualAttentionHandle,
    FluxVisualBorderBeam,
    FluxVisualDotPattern,
    FluxVisualGridPattern,
    FluxVisualHighlighter,
    FluxVisualHighlighterGroup,
    FluxVisualNumberFlow,
    FluxVisualSlotText,
    type FluxVisualSlotTextHandle,
    FluxVisualTextScramble,
    type FluxVisualTextScrambleHandle,
    FluxVisualTextShimmer
} from './Visuals';

describe('visual effects', () => {
    it('creates collision-free SVG pattern ids', () => {
        const { container } = render(<><FluxVisualDotPattern /><FluxVisualGridPattern squares={[[1, 2]]} /></>);
        const ids = Array.from(container.querySelectorAll('pattern'), (pattern) => pattern.id);
        expect(new Set(ids).size).toBe(ids.length);
        expect(container.querySelector('rect[x="42"][y="84"]')).toBeInTheDocument();
    });

    it('exposes replayable attention and highlighter controls', () => {
        vi.useFakeTimers();
        const finished = vi.fn();
        const attention = createRef<FluxVisualAttentionHandle>();
        render(<FluxVisualAttention ref={attention} onFinished={finished}><button>Notice</button></FluxVisualAttention>);
        act(() => attention.current?.play());
        act(() => vi.runAllTimers());
        expect(finished).toHaveBeenCalledOnce();
        vi.useRealTimers();

        const { getByText } = render(<FluxVisualHighlighterGroup color="red"><FluxVisualHighlighter variant="underline">Important</FluxVisualHighlighter></FluxVisualHighlighterGroup>);
        expect(getByText('Important').getAttribute('style')).toContain('red');
    });

    it('updates animated text through props and imperative handles', () => {
        const slot = createRef<FluxVisualSlotTextHandle>();
        const scramble = createRef<FluxVisualTextScrambleHandle>();
        const { rerender } = render(<><FluxVisualSlotText ref={slot} text="Copy" /><FluxVisualTextScramble ref={scramble} text="Ready" duration={0} /><FluxVisualNumberFlow value={42} duration={0} /><FluxVisualTextShimmer>Shine</FluxVisualTextShimmer></>);
        act(() => slot.current?.set('Copied'));
        expect(screen.getByLabelText('Copied')).toBeInTheDocument();
        act(() => scramble.current?.set('Done'));
        expect(screen.getByLabelText('Ready')).toHaveTextContent('Done');
        rerender(<><FluxVisualSlotText ref={slot} text="Paste" /><FluxVisualTextScramble ref={scramble} text="Ready" duration={0} /><FluxVisualNumberFlow value={42} duration={0} /><FluxVisualTextShimmer>Shine</FluxVisualTextShimmer></>);
        expect(screen.getByLabelText('Paste')).toBeInTheDocument();
        expect(screen.getByLabelText('42')).toBeInTheDocument();
    });

    it('finishes border-beam deactivation after its animation', () => {
        vi.useFakeTimers();
        const onDeactivate = vi.fn();
        const { rerender } = render(<FluxVisualBorderBeam active onDeactivate={onDeactivate}><div>Card</div></FluxVisualBorderBeam>);
        rerender(<FluxVisualBorderBeam active={false} onDeactivate={onDeactivate}><div>Card</div></FluxVisualBorderBeam>);
        act(() => vi.runAllTimers());
        expect(onDeactivate).toHaveBeenCalledOnce();
        vi.useRealTimers();
    });
});
