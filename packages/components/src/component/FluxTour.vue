<template>
    <Teleport to="body">
        <FluxFadeTransition>
            <div
                v-if="active"
                :class="$style.tour">
                <div
                    v-if="targetRect"
                    :class="$style.tourSpotlight"
                    :style="{
                        '--x': `${targetRect.x - maskPadding}px`,
                        '--y': `${targetRect.y - maskPadding}px`,
                        '--w': `${targetRect.width + maskPadding * 2}px`,
                        '--h': `${targetRect.height + maskPadding * 2}px`
                    }"/>

                <AnchorPopup
                    v-if="targetRect && currentStep"
                    ref="popup"
                    :anchor="virtualAnchor"
                    :class="$style.tourPopover"
                    :position="currentStep.position ?? 'bottom'"
                    aria-modal="true"
                    role="dialog">
                    <FluxPane :class="$style.tourPane">
                        <slot v-bind="{step: currentStep, index: step, total, next, previous, skip, finish}">
                            <div :class="$style.tourBody">
                                <strong
                                    v-if="currentStep.title"
                                    :class="$style.tourTitle">
                                    {{ currentStep.title }}
                                </strong>

                                <p
                                    v-if="currentStep.content"
                                    :class="$style.tourContent">
                                    {{ currentStep.content }}
                                </p>
                            </div>

                            <div :class="$style.tourFooter">
                                <span :class="$style.tourProgress">
                                    {{ step + 1 }} / {{ total }}
                                </span>

                                <FluxSpacer/>

                                <FluxSecondaryButton
                                    :label="translate('flux.skip')"
                                    @click="skip"/>

                                <FluxSecondaryButton
                                    v-if="step > 0"
                                    :label="translate('flux.previous')"
                                    @click="previous"/>

                                <FluxPrimaryButton
                                    :label="step < total - 1 ? translate('flux.next') : translate('flux.done')"
                                    @click="next"/>
                            </div>
                        </slot>
                    </FluxPane>
                </AnchorPopup>
            </div>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { isSSR, useEventListener } from '@flux-ui/internals';
    import { type ComponentPublicInstance, computed, nextTick, ref, watch, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxFadeTransition } from '~flux/components/transition';
    import { AnchorPopup } from '~flux/components/component/primitive';
    import FluxPane from './FluxPane.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import $style from '~flux/components/css/component/Tour.module.scss';

    type FluxTourPosition =
        | 'top' | 'top-left' | 'top-right'
        | 'left' | 'left-top' | 'left-bottom'
        | 'right' | 'right-top' | 'right-bottom'
        | 'bottom' | 'bottom-left' | 'bottom-right';

    type FluxTourStep = {
        readonly target: string | (() => HTMLElement | null);
        readonly title?: string;
        readonly content?: string;
        readonly position?: FluxTourPosition;
    };

    const active = defineModel<boolean>('active', {
        required: true
    });

    const step = defineModel<number>('step', {
        default: 0
    });

    const {
        maskPadding = 8,
        steps
    } = defineProps<{
        readonly maskPadding?: number;
        readonly steps: readonly FluxTourStep[];
    }>();

    const emit = defineEmits<{
        finish: [];
        skip: [];
        next: [number];
        prev: [number];
    }>();

    defineSlots<{
        default(props: {
            readonly step: FluxTourStep;
            readonly index: number;
            readonly total: number;

            next(): void;
            previous(): void;
            skip(): void;
            finish(): void;
        }): VNode[];
    }>();

    const translate = useTranslate();

    const targetRect = ref<DOMRect | null>(null);

    const total = computed(() => steps.length);
    const currentStep = computed(() => steps[step.value]);

    const virtualAnchor = {
        $el: {
            getBoundingClientRect: () => {
                const rect = targetRect.value;

                if (!rect) {
                    return new DOMRect(0, 0, 0, 0);
                }

                return new DOMRect(rect.x - maskPadding, rect.y - maskPadding, rect.width + maskPadding * 2, rect.height + maskPadding * 2);
            }
        }
    } as unknown as ComponentPublicInstance;

    function resolveTarget(): HTMLElement | null {
        const current = steps[step.value];

        if (!current) {
            return null;
        }

        return typeof current.target === 'function' ? current.target() : document.querySelector<HTMLElement>(current.target);
    }

    function measure(): void {
        const element = resolveTarget();

        if (!element) {
            targetRect.value = null;
            return;
        }

        element.scrollIntoView({block: 'center', inline: 'center'});

        requestAnimationFrame(() => {
            const resolved = resolveTarget();
            targetRect.value = resolved ? resolved.getBoundingClientRect() : null;
        });
    }

    function next(): void {
        if (step.value < total.value - 1) {
            step.value++;
            emit('next', step.value);
            return;
        }

        finish();
    }

    function previous(): void {
        if (step.value > 0) {
            step.value--;
            emit('prev', step.value);
        }
    }

    function skip(): void {
        active.value = false;
        emit('skip');
    }

    function finish(): void {
        active.value = false;
        emit('finish');
    }

    watch([active, step], async () => {
        if (!active.value) {
            targetRect.value = null;
            return;
        }

        await nextTick();
        measure();
    }, {immediate: true});

    if (!isSSR) {
        const onRemeasure = () => {
            if (active.value && targetRect.value) {
                const resolved = resolveTarget();
                targetRect.value = resolved ? resolved.getBoundingClientRect() : null;
            }
        };

        useEventListener(ref(window), 'resize', onRemeasure);
        useEventListener(ref(window), 'scroll', onRemeasure, {capture: true, passive: true});
        useEventListener(ref(window), 'keydown', (evt: KeyboardEvent) => {
            if (active.value && evt.key === 'Escape') {
                skip();
            }
        });
    }
</script>
