<template>
    <Preview :class="$style.windowTransitionPreview">
        <FluxWindowTransition :is-back="visible">
            <FluxPane v-if="visible">A</FluxPane>
            <FluxPane v-else>B</FluxPane>
        </FluxWindowTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxWindowTransition } from '@flux-ui/components';
    import { useInterval } from '@flux-ui/internals';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>

<style
    lang="scss"
    module>
    .windowTransitionPreview {
        overflow: clip;

        :local(.pane) {
            display: flex;
            height: 150px;
            width: 150px;
            align-items: center;
            justify-content: center;
            color: var(--foreground-secondary);
            font-size: 42px;
            font-weight: 700;
        }
    }
</style>
