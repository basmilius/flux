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
                    v-if="targetRect && currentItem"
                    ref="popup"
                    :anchor="virtualAnchor"
                    :class="clsx($style.tourPopover, isStepping && $style.isStepping)"
                    :position="currentItem.position ?? 'bottom'"
                    aria-modal="true"
                    clamp-to-viewport
                    role="dialog">
                    <FluxPane :class="$style.tourPane">
                        <div
                            ref="bodyViewport"
                            :class="$style.tourBodyViewport">
                            <Transition
                                @after-enter="onBodyAfterEnter"
                                @enter="onBodyEnter">
                                <div
                                    :key="step"
                                    :class="$style.tourBody">
                                    <strong
                                        v-if="currentItem.title"
                                        :class="$style.tourTitle">
                                        {{ currentItem.title }}
                                    </strong>

                                    <div :class="$style.tourContent">
                                        <VNodeRenderer :vnode="currentContent"/>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div :class="$style.tourFooter">
                            <span :class="$style.tourProgress">
                                {{ step + 1 }} / {{ total }}
                            </span>

                            <FluxSpacer/>

                            <button
                                :class="$style.tourSkip"
                                type="button"
                                @click="skip">
                                {{ translate('flux.skip') }}
                            </button>

                            <FluxSecondaryButton
                                v-if="step > 0"
                                :aria-label="translate('flux.previous')"
                                icon-leading="angle-left"
                                size="small"
                                @click="previous"/>

                            <FluxPrimaryButton
                                v-if="step < total - 1"
                                :aria-label="translate('flux.next')"
                                icon-leading="angle-right"
                                size="small"
                                @click="next"/>

                            <FluxPrimaryButton
                                v-else
                                :aria-label="translate('flux.done')"
                                icon-leading="check"
                                size="small"
                                @click="next"/>
                        </div>
                    </FluxPane>
                </AnchorPopup>
            </div>
        </FluxFadeTransition>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { isHtmlElement } from '@basmilius/utils';
    import { flattenVNodeTree, isSSR, useEventListener } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { type ComponentPublicInstance, computed, Fragment, h, nextTick, ref, useTemplateRef, type VNode, watch } from 'vue';
    import { AnchorPopup, VNodeRenderer } from '~flux/components/component/primitive';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxPane from './FluxPane.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import FluxTourItem from './FluxTourItem.vue';
    import $style from '~flux/components/css/component/Tour.module.scss';

    type FluxTourPosition =
        | 'top' | 'top-left' | 'top-right'
        | 'left' | 'left-top' | 'left-bottom'
        | 'right' | 'right-top' | 'right-bottom'
        | 'bottom' | 'bottom-left' | 'bottom-right';

    type TourItem = {
        readonly target: string | (() => HTMLElement | null);
        readonly title?: string;
        readonly position?: FluxTourPosition;
        readonly content?: () => VNode[];
    };

    const active = defineModel<boolean>('active', {
        required: true
    });

    const step = defineModel<number>('step', {
        default: 0
    });

    const {
        maskPadding = 8,
        root
    } = defineProps<{
        readonly maskPadding?: number;
        readonly root?: string | HTMLElement | (() => HTMLElement | null);
    }>();

    const emit = defineEmits<{
        finish: [];
        skip: [];
        next: [number];
        prev: [number];
    }>();

    const slots = defineSlots<{
        default(): VNode[];
    }>();

    const translate = useTranslate();

    const popup = useTemplateRef<{ reposition(): void; resize(): void }>('popup');
    const bodyViewport = useTemplateRef<HTMLElement>('bodyViewport');
    const targetRect = ref<DOMRect | null>(null);
    const isStepping = ref(false);

    let steppingTimer: ReturnType<typeof setTimeout> | undefined;

    const items = computed<readonly TourItem[]>(() => {
        const vnodes = flattenVNodeTree(slots.default?.() ?? []);
        const out: TourItem[] = [];

        for (const vnode of vnodes) {
            if (vnode.type !== FluxTourItem) {
                continue;
            }

            const props = vnode.props ?? {};
            const children = vnode.children as { default?: () => VNode[] } | null;

            out.push({
                target: props.target,
                title: props.title,
                position: props.position,
                content: children?.default
            });
        }

        return out;
    });

    const total = computed(() => items.value.length);
    const currentItem = computed(() => items.value[step.value]);
    const currentContent = computed(() => {
        const content = currentItem.value?.content?.();
        return content ? h(Fragment, content) : null;
    });

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

    function resolveScope(): ParentNode {
        if (!root) {
            return document;
        }

        if (typeof root === 'string') {
            return document.querySelector(root) ?? document;
        }

        if (typeof root === 'function') {
            return root() ?? document;
        }

        return root;
    }

    function resolveTarget(): HTMLElement | null {
        const current = items.value[step.value];

        if (!current) {
            return null;
        }

        return typeof current.target === 'function' ? current.target() : resolveScope().querySelector<HTMLElement>(current.target);
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
            popup.value?.reposition();
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

    function onBodyEnter(el: Element): void {
        if (!isHtmlElement(el) || !bodyViewport.value) {
            return;
        }

        const height = el.offsetHeight;

        requestAnimationFrame(() => {
            if (bodyViewport.value) {
                bodyViewport.value.style.height = `${height}px`;
            }
        });
    }

    function onBodyAfterEnter(): void {
        if (bodyViewport.value) {
            bodyViewport.value.style.height = 'auto';
        }
    }

    watch(step, (newStep, oldStep) => {
        if (active.value && newStep !== oldStep) {
            if (bodyViewport.value) {
                bodyViewport.value.style.height = `${bodyViewport.value.offsetHeight}px`;
            }

            isStepping.value = true;
            clearTimeout(steppingTimer);
            steppingTimer = setTimeout(() => {
                isStepping.value = false;
            }, 300);
        }
    });

    watch([active, step], async () => {
        if (!active.value) {
            targetRect.value = null;
            isStepping.value = false;
            clearTimeout(steppingTimer);
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
