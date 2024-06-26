<template>
    <BaseButton
        class="flux-primary-button"
        :="{type, disabled, iconAfter, iconBefore, isLoading, isSubmit, label, size, href, rel, target, to}"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <template
            v-for="(_, slot) of slots"
            #[slot]="scope">
            <slot
                :name="slot"
                v-bind="scope"/>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import { BaseButton } from './primitive';

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
        readonly size?: 'small' | 'medium' | 'large';
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
    .flux-primary-button {
        --button-background: rgb(var(--primary-7));
        --button-background-hover: rgb(var(--primary-8));
        --button-background-active: rgb(var(--primary-9));
        --button-foreground: rgb(var(--primary-0));
        --button-icon: rgb(var(--primary-0));
        --button-stroke: rgb(var(--primary-8));

        --spinner-track: rgb(var(--primary-8));
        --spinner-value: rgb(var(--primary-0));

        box-shadow: 0 1px 1px rgb(var(--primary-7) / .25);
    }

    [dark] .flux-primary-button {
        --button-foreground: rgb(0 0 0 / .975);
        --button-icon: rgb(0 0 0 / .975);
        --button-stroke: rgb(var(--primary-6) / .5);
    }
</style>
