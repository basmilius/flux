<template>
    <div
        ref="previewRef"
        :class="$style.preview">
        <FluxVisualGridPattern :stroke-dasharray="3"/>

        <slot name="body">
            <FluxView :class="[$style.previewBody, flush && $style.isFlush]">
                <slot/>
            </FluxView>
        </slot>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualGridPattern } from '@flux-ui/visuals';
    import { onMounted, ref, unref } from 'vue';
    import FluxView from './FluxView.vue';

    defineProps<{
        readonly flush?: boolean;
    }>();

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
        background: color-mix(in srgb, var(--vp-c-bg), var(--vp-c-bg-soft));
        border: 1px solid var(--vp-c-gutter);
        border-radius: var(--radius);
        font-size: 15px;
        line-height: 1.6;

        /* The grid needs the same faint presence in both themes, and the neutral
           steps are not evenly spaced in luminance, so each theme takes the token
           that lands there: 1.18 against the preview background in light, 1.34 in
           dark. One token for both would be invisible on one side or heavy on the
           other. */
        > :global(svg) {
            stroke: light-dark(var(--surface-stroke), var(--surface-stroke-muted));
        }
    }

    .previewBody.isFlush {
        display: block;
        min-height: 0;
        padding: 0;
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
