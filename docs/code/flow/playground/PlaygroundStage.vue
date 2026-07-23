<template>
    <section class="stage">
        <div class="stage__head">
            <h3
                v-if="title"
                class="stage__title">{{ title }}</h3>

            <div class="stage__controls">
                <label class="stage__toggle">
                    <FluxToggle v-model="under"/>
                    Under cards
                </label>
            </div>
        </div>

        <div :class="['stage__canvas', tall && 'stage__canvas--tall']">
            <slot/>
        </div>
    </section>
</template>

<script
    setup
    lang="ts">
    import { FluxToggle } from '@flux-ui/components';
    import { FluxFlowEdgeLayerInjectionKey } from '@flux-ui/flow';
    import { computed, provide, ref } from 'vue';

    defineProps<{
        readonly title?: string;
        readonly tall?: boolean;
    }>();

    // On by default (the real behaviour); toggle off to see the lines drawn over
    // the cards. Each stage drives only the flow in its own slot.
    const under = ref(true);

    provide(FluxFlowEdgeLayerInjectionKey, computed(() => under.value ? 'under' : 'over'));
</script>

<style scoped>
    .stage {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .stage__head {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }

    .stage__title {
        font-size: 15px;
        font-weight: 600;
        color: var(--foreground-secondary);
    }

    .stage__controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 18px;
    }

    .stage__toggle {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 14px;
        cursor: pointer;
    }

    .stage__canvas {
        border: 1px solid var(--surface-stroke);
        border-radius: 12px;
        overflow: hidden;
        padding: 15px;
    }

    .stage__canvas--tall {
        height: 72vh;
        min-height: 480px;
        padding: 0;
    }
</style>
