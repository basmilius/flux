<template>
    <div
        ref="previewRef"
        :class="$style.preview"
        data-typography-aware>
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
        let rows = Math.ceil(height / 45) + 2;

        if (rows % 2 === 1) {
            rows++;
        }

        minHeight.value = Math.max(6, rows) * 45;
    }
</script>

<style
    lang="scss"
    module>
    .preview {
        position: relative;
        background: rgb(var(--gray-1) / .75);
        border: 1px solid rgb(var(--gray-3));
        border-radius: var(--radius);
        font-size: 15px;
    }

    .previewBody {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(v-bind(minHeight) * 1px - 1px);
        padding: 15px 60px;

        > .pane {
            width: 100%;
        }
    }
</style>
