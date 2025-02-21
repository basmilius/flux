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
    import { FluxGridPattern } from '@basmilius/flux';
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
        background: rgb(var(--gray-1));
        border: 1px solid rgb(var(--gray-3));
        border-radius: var(--radius);
        font-size: 15px;

        :global(p) {
            margin: unset;
            line-height: 1.6;
        }

        :global(svg) {
            stroke: rgb(var(--gray-3));
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
</style>
