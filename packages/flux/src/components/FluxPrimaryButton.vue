<template>
    <flux-base-button
        class="flux-primary-button"
        v-bind="{type, disabled, iconAfter, iconBefore, isLoading, isSubmit, label, href, rel, target, to}"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
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

        (e: 'mouseenter', evt: MouseEvent): void;

        (e: 'mouseleave', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames;
        readonly iconBefore?: IconNames;
        readonly isLoading?: boolean;
        readonly isSubmit?: boolean;
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
    @use '../scss/mixin' as flux;

    .flux-primary-button {
        --button-background: rgb(var(--primary-7));
        --button-background-hover: rgb(var(--primary-8));
        --button-background-active: rgb(var(--primary-9));
        --button-foreground: rgb(var(--primary-0));
        --button-icon: rgb(var(--primary-0));
        --button-stroke: transparent;

        --spinner-track: rgb(var(--primary-8));
        --spinner-value: rgb(var(--primary-0));
    }

    @include flux.dark-mode {
        .flux-primary-button {
            --button-background: rgb(var(--primary-6));
            --button-background-hover: rgb(var(--primary-7));
            --button-background-active: rgb(var(--primary-8));

            --spinner-track: rgb(var(--primary-7));
        }
    }
</style>
