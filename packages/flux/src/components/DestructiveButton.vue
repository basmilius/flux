<template>
    <flux-base-button
        class="flux-destructive-button"
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

    interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames;
        readonly iconBefore?: IconNames;
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
    .flux-destructive-button {
        --background: var(--destructive-button-background);
        --background-hover: var(--destructive-button-background-hover);
        --background-active: var(--destructive-button-background-active);
        --foreground: var(--destructive-button-foreground);
        --icon: var(--destructive-button-icon);
        --stroke: var(--destructive-button-stroke);
    }
</style>
