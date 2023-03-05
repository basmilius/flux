<template>
    <div
        ref="previewRef"
        class="preview">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
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
        minHeight.value = (Math.ceil(height / 45) + 2) * 45;
    }
</script>

<style lang="scss">
    .preview {
        position: relative;
        display: flex;
        min-height: calc(v-bind(minHeight) * 1px);
        padding: 60px;
        align-items: center;
        justify-content: center;
        background-image:
            linear-gradient(to bottom, transparent calc(100% - 1px), rgb(var(--primary-2)) calc(100% - 1px)),
            linear-gradient(to right, rgb(var(--gray-1)) calc(100% - 1px), rgb(var(--primary-2)) calc(100% - 1px));
        background-position: top center;
        background-size: 45px 45px;
        border: 1px solid rgb(var(--gray-3));
        border-radius: var(--radius);

        > .flux-pane {
            width: 100%;
        }
    }
</style>
