import { flattenVNodeTree, useFocusTrap } from '@flux-ui/internals';
import { Comment, type Component, h, type InjectionKey, onUnmounted, provide, type Ref, ref, type RenderFunction, type SetupContext, type Slots, Teleport, type VNode, watch } from 'vue';
import { registerDialog, type FluxDialogRegistration } from '~flux/components/data';
import $style from '~flux/components/css/component/Overlay.module.scss';

type Emit = SetupContext<['close']>['emit'];
type Props = {
    readonly isCloseable?: boolean;
    readonly viewKey?: string;
};

export type FluxDialogContext = {
    readonly labelledBy: Ref<string | undefined>;
    readonly label: Ref<string | undefined>;
};

export const FluxDialogInjectionKey: InjectionKey<FluxDialogContext> = Symbol('flux:dialog');

const TARGET_SELECTOR = `.${$style.overlayProvider.replaceAll(' ', '.')}`;
let DIALOG_ID = 0;

export default function (attrs: object, props: Props, emit: Emit, slots: Slots, className: string | (() => string), transition: Component): RenderFunction {
    const dialogId = `flux-dialog:${DIALOG_ID++}`;
    let registration: FluxDialogRegistration | null = null;

    const dialogRef = ref<HTMLElement>();
    const labelledBy = ref<string>();
    const label = ref<string>();

    provide(FluxDialogInjectionKey, {labelledBy, label});

    useFocusTrap(dialogRef);

    onUnmounted(() => {
        registration?.unregister();
        registration = null;
    });

    watch(dialogRef, (dialog, _, onCleanup) => {
        if (!dialog) {
            return;
        }

        dialog.addEventListener('keydown', onKeyDown);

        onCleanup(() => {
            dialog.removeEventListener('keydown', onKeyDown);
        });
    });

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key !== 'Escape' || !registration || !props.isCloseable || !registration.isCurrent()) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();
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
                class: [typeof className === 'function' ? className() : className, registration.isCurrent() && $style.isCurrent],
                style: {
                    zIndex: registration.getPosition() + 1000
                },
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': labelledBy.value,
                'aria-label': labelledBy.value ? undefined : label.value,
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
