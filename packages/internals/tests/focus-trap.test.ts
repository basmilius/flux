import { expect, test } from 'bun:test';
import { createRenderer, defineComponent, ref } from 'vue';

test('removes capturing focus listeners when a component unmounts', async () => {
    const previousDocument = globalThis.document;
    const listeners: {type: string; listener: EventListener; capture: boolean}[] = [];
    globalThis.document = {
        activeElement: null,
        addEventListener(type: string, listener: EventListener, options?: AddEventListenerOptions) {
            listeners.push({type, listener, capture: options?.capture === true});
        },
        removeEventListener(type: string, listener: EventListener, options?: EventListenerOptions) {
            const index = listeners.findIndex(entry => entry.type === type
                && entry.listener === listener && entry.capture === (options?.capture === true));

            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    } as unknown as Document;

    const {default: useFocusTrap} = await import('../src/composable/useFocusTrap');
    const renderer = createRenderer({
        createComment: () => ({}),
        createText: () => ({}),
        createElement: () => ({}),
        insert() {}, remove() {}, setText() {}, setElementText() {}, patchProp() {},
        parentNode: () => null, nextSibling: () => null
    });

    try {
        for (let index = 0; index < 5; index++) {
            const app = renderer.createApp(defineComponent({
                setup() {
                    useFocusTrap(ref(null), {disable: ref(true)});
                    return () => null;
                }
            }));

            app.mount({});
            expect(listeners).toHaveLength(2);
            app.unmount();
            expect(listeners).toHaveLength(0);
        }
    } finally {
        globalThis.document = previousDocument;
    }
});
