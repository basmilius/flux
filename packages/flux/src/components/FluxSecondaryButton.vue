<template>
    <flux-base-button
        class="flux-secondary-button"
        v-bind="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        @click="$emit('click', $event)">
        <template
            v-for="(_, slot) of slots"
            v-slot:[slot]="scope">
            <slot
                :name="slot"
                v-bind="scope"/>
        </template>
    </flux-base-button>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue-demi';
    import { FluxRoutingLocation, IconNames } from '../data';
    import { FluxBaseButton } from '.';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly isLoading?: boolean;
        readonly label?: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        type: 'button'
    });

    const slots = useSlots();
</script>

<style lang="scss">
    .flux-secondary-button {
        --background: var(--secondary-button-background);
        --background-hover: var(--secondary-button-background-hover);
        --background-active: var(--secondary-button-background-active);
        --foreground: var(--secondary-button-foreground);
        --icon: var(--secondary-button-icon);
        --stroke: var(--secondary-button-stroke);
    }
</style>
