import type { FluxFlowController } from '~flux/flow/data';

type FlowKeyboardOptions = {
    readonly controller: FluxFlowController;
    isInteractive(): boolean;
};

type FlowKeyboard = {
    onKeyDown(event: KeyboardEvent): void;
};

// One press moves the flow a card's worth of air; holding shift covers three
// times that, so crossing a wide diagram is not a drum roll.
const PAN_STEP = 45;
const PAN_STEP_FAST = 135;

/**
 * The keyboard handling of an interactive flow: the arrows pan, `+` and `-`
 * zoom, and `0` fits the whole flow in view. It pans through `panBounded`, the
 * same way a drag and a trackpad scroll do, so the keyboard cannot push the
 * world somewhere a pointer could not.
 */
export default function useFlowKeyboard(options: FlowKeyboardOptions): FlowKeyboard {
    const {controller} = options;

    function pan(event: KeyboardEvent, dx: number, dy: number): void {
        const step = event.shiftKey ? PAN_STEP_FAST : PAN_STEP;
        controller.panBounded(dx * step, dy * step);
    }

    function onKeyDown(event: KeyboardEvent): void {
        // Only the canvas itself answers to these: a text field or a button
        // inside a card keeps every key it is given.
        if (!options.isInteractive() || event.target !== event.currentTarget) {
            return;
        }

        switch (event.key) {
            case 'ArrowUp':
                pan(event, 0, 1);
                break;
            case 'ArrowDown':
                pan(event, 0, -1);
                break;
            case 'ArrowLeft':
                pan(event, 1, 0);
                break;
            case 'ArrowRight':
                pan(event, -1, 0);
                break;
            case '+':
            case '=':
                controller.zoomIn();
                break;
            case '-':
                controller.zoomOut();
                break;
            case '0':
                controller.fitView();
                break;
            default:
                return;
        }

        // Only reached by a key the flow answered, so the page keeps its own
        // scrolling everywhere else.
        event.preventDefault();
    }

    return {onKeyDown};
}
