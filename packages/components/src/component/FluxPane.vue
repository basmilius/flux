<template>
    <div
        ref="pane"
        :class="CLASS_MAP[variant]"
        :style="headerHeight !== null ? {'--flux-pane-header-height': `${headerHeight}px`} : undefined">
        <slot/>

        <FluxFadeTransition>
            <slot
                v-if="isLoading"
                name="loader">
                <div :class="$style.paneLoader">
                    <FluxSpinner/>
                </div>
            </slot>
        </FluxFadeTransition>

        <div
            v-if="tag"
            :class="$style.paneTag">
            {{ tag }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useMutationObserver, useResizeObserver } from '@basmilius/common';
    import { onMounted, ref, shallowRef, useTemplateRef, type VNode } from 'vue';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Pane.module.scss';

    const CLASS_MAP = {
        default: $style.paneDefault,
        flat: $style.paneFlat,
        well: $style.paneWell
    } as const;

    const HEADER_SELECTOR = `:scope > .${$style.paneHeader.trim().split(/\s+/).join('.')}`;

    const {
        variant = 'default'
    } = defineProps<{
        readonly isLoading?: boolean;
        readonly tag?: string;
        readonly variant?: 'default' | 'flat' | 'well';
    }>();

    defineSlots<{
        default(): VNode[];
        loader(): VNode[];
    }>();

    const paneRef = useTemplateRef<HTMLElement>('pane');
    const headerRef = shallowRef<HTMLElement | null>(null);
    const headerHeight = ref<number | null>(null);

    useResizeObserver(headerRef, ([entry]) => {
        headerHeight.value = entry.borderBoxSize?.[0]?.blockSize ?? (entry.target as HTMLElement).offsetHeight;
    });

    useMutationObserver(paneRef, () => syncHeader(), {childList: true});

    onMounted(() => syncHeader());

    function syncHeader(): void {
        const header = paneRef.value?.querySelector<HTMLElement>(HEADER_SELECTOR) ?? null;

        headerRef.value = header;

        if (header === null) {
            headerHeight.value = null;
        }
    }
</script>
