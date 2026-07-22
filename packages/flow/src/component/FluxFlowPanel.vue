<template>
    <Teleport
        v-if="overlay"
        :to="overlay">
        <div
            data-nopan
            :class="$style.flowPanel"
            :style="style">
            <slot/>
        </div>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import { computed, type CSSProperties } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowPanelPosition } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/FlowPanel.module.scss';

    const {
        offset = 15,
        position = 'bottom-right'
    } = defineProps<{
        readonly offset?: number;
        readonly position?: FluxFlowPanelPosition;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const controller = useFluxFlowInjection();

    const overlay = controller.overlayElement;

    // The corner the panel hangs in decides which two insets it is set by; the
    // other two are left alone, so a wide panel grows away from its own corner.
    const style = computed<CSSProperties>(() => ({
        [position.startsWith('top') ? 'top' : 'bottom']: `${offset}px`,
        [position.endsWith('left') ? 'left' : 'right']: `${offset}px`
    }));
</script>
