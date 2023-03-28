<template>
    <component
        :is="component"
        class="flux-surface flux-pane"
        :class="{
            'is-contained': isContained,
            'is-grid': !!columns && breakpoints.lg
        }"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to">
        <slot/>

        <div
            v-if="isLoading"
            class="flux-pane-overlay">
            <flux-spinner/>
        </div>

        <div
            v-if="tag"
            class="flux-pane-tag">
            {{ tag }}
        </div>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs } from 'vue-demi';
    import { useBreakpoints } from '../composables';
    import { FluxRoutingLocation } from '../data';
    import { FluxSpinner } from '.';

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

    const props = defineProps<Props>();
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

<style lang="scss">
    @layer component {
        .flux-pane {
            position: relative;
            box-shadow: var(--shadow);
            color: unset;
            text-decoration: unset;

            &.is-contained {
                overflow: hidden;
            }

            &.is-grid {
                display: grid;
                grid-template-columns: repeat(v-bind(columns), minmax(0, 1fr));
            }

            &-overlay {
                position: absolute;
                display: flex;
                inset: 0;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(2px);
                background: rgb(var(--gray-0) / .75);
                border-radius: inherit;
                z-index: 100;
            }

            &-tag {
                position: absolute;
                top: 0;
                left: 21px;
                padding: 6px 9px;
                background: rgb(var(--gray-10));
                border-radius: calc(var(--radius) / 2);
                color: rgb(var(--gray-0));
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 1px;
                line-height: 1;
                text-transform: uppercase;
                translate: 0 -50%;
            }
        }

        .flux-pane > .flux-pane {
            border: unset;
            border-radius: unset;
            box-shadow: unset;
        }

        a.flux-pane {
            cursor: pointer;
            transition: box-shadow 180ms var(--swift-out);

            &:hover {
                box-shadow: var(--shadow-large);
            }
        }
    }
</style>
