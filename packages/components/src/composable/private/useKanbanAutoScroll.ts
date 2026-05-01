const AUTOSCROLL_ZONE = 40;
const AUTOSCROLL_MAX_SPEED = 12;

export type UseKanbanAutoScrollOptions = {
    getBoardElement(): Element | null;
    getVerticalTarget(): Element | null;
};

export type UseKanbanAutoScrollReturn = {
    onPointerMove(clientX: number, clientY: number): void;
    stop(): void;
};

/**
 * Drives horizontal (board) and vertical (column body) auto-scroll while a drag
 * is in progress. Reads the active scroll containers via the option callbacks.
 */
export function useKanbanAutoScroll(options: UseKanbanAutoScrollOptions): UseKanbanAutoScrollReturn {
    let frame: number | null = null;
    let deltaX = 0;
    let deltaY = 0;
    let verticalTarget: Element | null = null;

    function onPointerMove(clientX: number, clientY: number): void {
        const board = options.getBoardElement();
        const target = options.getVerticalTarget();

        deltaX = board ? computeScrollDelta(board.getBoundingClientRect(), clientX, 'horizontal') : 0;
        deltaY = target ? computeScrollDelta(target.getBoundingClientRect(), clientY, 'vertical') : 0;
        verticalTarget = target;

        if (deltaX !== 0 || deltaY !== 0) {
            start();
        } else {
            stop();
        }
    }

    function start(): void {
        if (frame !== null) {
            return;
        }

        const tick = (): void => {
            const board = options.getBoardElement();

            if (deltaX !== 0 && board) {
                board.scrollLeft += deltaX;
            }

            if (deltaY !== 0 && verticalTarget) {
                verticalTarget.scrollTop += deltaY;
            }

            if (deltaX === 0 && deltaY === 0) {
                frame = null;
                return;
            }

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
    }

    function stop(): void {
        if (frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
        }

        deltaX = 0;
        deltaY = 0;
        verticalTarget = null;
    }

    return {onPointerMove, stop};
}

function computeScrollDelta(rect: DOMRect, position: number, axis: 'horizontal' | 'vertical'): number {
    const start = axis === 'horizontal' ? rect.left : rect.top;
    const end = axis === 'horizontal' ? rect.right : rect.bottom;

    if (position < start + AUTOSCROLL_ZONE) {
        const distance = Math.max(0, position - start);
        return -Math.round(((AUTOSCROLL_ZONE - distance) / AUTOSCROLL_ZONE) * AUTOSCROLL_MAX_SPEED);
    }

    if (position > end - AUTOSCROLL_ZONE) {
        const distance = Math.max(0, end - position);
        return Math.round(((AUTOSCROLL_ZONE - distance) / AUTOSCROLL_ZONE) * AUTOSCROLL_MAX_SPEED);
    }

    return 0;
}
