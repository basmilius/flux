<template>
    <div
        ref="previewRef"
        :class="$style.preview"
        :style="{'--preview-min-height': minHeight}">
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
    import { onMounted, ref, unref, useTemplateRef } from 'vue';
    import FluxView from './FluxView.vue';

    defineProps<{
        readonly flush?: boolean;
    }>();

    const minHeight = ref(0);
    const previewRef = useTemplateRef<HTMLDivElement>('previewRef');

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

<style lang="scss" module src="./Preview.module.scss"/>
