import { flattenVNodeTree, useFocusTrap } from '@flux-ui/internals';
import { Comment, h, onUnmounted, ref, Teleport, watch, type Component, type RenderFunction, type SetupContext, type Slots, type VNode } from 'vue';
import { registerDialog, type FluxDialogRegistration } from '~flux/components/data';
import $style from '~flux/components/css/component/Overlay.module.scss';

type Emit = SetupContext<['close']>['emit'];
type Props = {
    readonly isCloseable?: boolean;
    readonly viewKey?: string;
};

const TARGET_SELECTOR = `.${$style.overlayProvider.replaceAll(' ', '.')}`;
let DIALOG_ID = 0;

export default function (attrs: object, props: Props, emit: Emit, slots: Slots, className: string, transition: Component): RenderFunction {
    const dialogId = `flux-dialog:${DIALOG_ID++}`;
    let registration: FluxDialogRegistration | null = null;

    const dialogRef = ref<HTMLElement>();

    useFocusTrap(dialogRef);

    onUnmounted(() => {
        registration?.unregister();
        registration = null;
    });

    watch(dialogRef, (dialog, _, onCleanup) => {
        if (!dialog) {
            return;
        }

        dialog.addEventListener('keydown', onKeyDown, {passive: true});

        onCleanup(() => {
            dialog.removeEventListener('keydown', onKeyDown);
        });
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Escape' || !registration || !props.isCloseable) {
            return;
        }

        emit('close');
    }

    return () => {
        const children = flattenVNodeTree(slots.default?.() ?? []);
        const isVisible = children.length > 0 && children.some(child => child.type !== Comment);
        let content: VNode | undefined;

        if (isVisible) {
            registration ??= registerDialog();

            content = h('div', {
                key: props.viewKey ?? dialogId,
                ref: dialogRef,
                class: [className, registration.isCurrent() && $style.isCurrent],
                style: {
                    zIndex: registration.getPosition() + 1000
                },
                tabindex: 0
            }, children);
        } else {
            registration?.unregister();
            registration = null;
        }

        return h(Teleport, {defer: true, disabled: !content, to: TARGET_SELECTOR}, [
            h(transition, attrs, {
                default: () => content
            })
        ]);
    };
}
