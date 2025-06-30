<template>
    <div
        ref="previewRef"
        :class="$style.preview">
        <FluxGridPattern :stroke-dasharray="3"/>

        <slot name="body">
            <div :class="$style.previewBody">
                <slot/>
            </div>
        </slot>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxGridPattern } from '@flux-ui/components';
    import { onMounted, ref, unref } from 'vue';

    const minHeight = ref(0);
    const previewRef = ref<HTMLDivElement>();

    onMounted(() => resize());

    function resize(): void {
        const preview = unref(previewRef);

        if (!preview) {
            return;
        }

        minHeight.value = 0;

        getComputedStyle(preview);

        const {height} = preview.getBoundingClientRect();
        let rows = Math.ceil(height / 42) + 1;

        minHeight.value = Math.max(6, rows) * 42;

        requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }
</script>

<style
    lang="scss"
    module>
    .preview {
        position: relative;
        margin: 16px 0;
        background: var(--vp-c-bg-soft);
        border: 1px solid var(--vp-c-gutter);
        border-radius: var(--radius);
        font-size: 15px;
        line-height: 1.8;

        :global(h1, h2, h3, h4, h5, h6) {
            line-height: 1.6;
        }

        :global(p) {
            margin: unset;
            line-height: 1.8;
        }

        :global(svg) {
            stroke: var(--gray-2);
        }
    }

    .previewBody {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(v-bind(minHeight) * 1px - 1px);
        padding: 15px 60px;

        > .button,
        > .flyout > .button {
            align-self: center;
        }

        > .pane {
            width: 100%;
        }
    }

    @media (max-width: 639px) {
        .preview {
            margin-left: -24px;
            margin-right: -24px;
            border-left: 0;
            border-right: 0;
            border-radius: 0;
        }

        .previewBody {
            padding: 15px 24px;
        }
    }
</style>
