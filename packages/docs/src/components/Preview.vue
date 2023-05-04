<template>
    <div
        ref="previewRef"
        class="preview flux-typography-aware">
        <slot name="body">
            <div class="preview-body">
                <slot/>
            </div>
        </slot>
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
        let rows = Math.ceil(height / 45) + 2;

        if (rows % 2 === 1) {
            rows++;
        }

        minHeight.value = Math.max(6, rows) * 45;
    }
</script>

<style lang="scss">
    .preview {
        position: relative;
        background: rgb(var(--gray-1));
        border: 1px solid rgb(var(--gray-3));
        border-radius: var(--radius);
        font-size: 15px;

        &::before {
            --mask: linear-gradient(to bottom, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, transparent calc(100% - 1px), black calc(100% - 1px));

            position: absolute;
            display: block;
            inset: 0;
            content: '';
            background: rgb(var(--gray-3) / .75);
            border-radius: var(--radius);
            -webkit-mask-image: var(--mask);
            -webkit-mask-position: top center;
            -webkit-mask-size: 45px 45px;
            mask-image: var(--mask);
            mask-position: top center;
            mask-size: 45px 45px;
        }

        &-body {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(v-bind(minHeight) * 1px - 1px);
            padding: 15px 60px;
        }

        &-body > .flux-pane {
            width: 100%;
        }
    }
</style>
