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
        minHeight.value = Math.max(6, Math.ceil(height / 45) + 2) * 45;
    }
</script>

<style lang="scss">
    .preview {
        position: relative;
        display: flex;
        min-height: calc(v-bind(minHeight) * 1px);
        padding: 15px 60px;
        align-items: center;
        justify-content: center;
        background: rgb(var(--gray-1));
        border: 1px solid rgb(var(--gray-3));
        border-radius: var(--radius);
        font-size: 15px;

        &::before {
            position: absolute;
            display: block;
            inset: 0;
            content: '';
            background: rgb(var(--gray-3) / .75);
            -webkit-mask-image: linear-gradient(to bottom, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, transparent calc(100% - 1px), black calc(100% - 1px));
            -webkit-mask-position: top center;
            -webkit-mask-size: 45px 45px;
            mask-image: linear-gradient(to bottom, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, transparent calc(100% - 1px), black calc(100% - 1px));
            mask-position: top center;
            mask-size: 45px 45px;
        }

        > .flux-pane {
            width: 100%;
        }
    }
</style>
