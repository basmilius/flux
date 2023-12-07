<template>
    <Component
        :is="component"
        :class="{
            [styles.pane]: true,
            [styles.paneContained]: isContained,
            [styles.paneGrid]: !!columns && breakpoints.lg
        }"
        :style="{'--columns': columns}"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to">
        <slot/>

        <div
            v-if="isLoading"
            :class="styles.paneLoader">
            <FluxSpinner/>
        </div>

        <div
            v-if="tag"
            :class="styles.paneTag">
            {{ tag }}
        </div>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs } from 'vue';
    import { useBreakpoints } from '@/composables';
    import type { FluxRoutingLocation } from '@/data';
    import styles from '@/css/components/Pane.module.scss';
    import FluxSpinner from './FluxSpinner.vue';

    export interface Props {
        readonly columns?: number;
        readonly isContained?: boolean;
        readonly isLoading?: boolean;
        readonly tag?: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    const props = withDefaults(defineProps<Props>(), {
        columns: 0
    });
    const {href, to} = toRefs(props);

    const {breakpoints} = useBreakpoints();

    const component = computed(() => {
        if (href?.value) {
            return 'a';
        }

        if (to?.value) {
            return 'router-link';
        }

        return 'div';
    });
</script>
