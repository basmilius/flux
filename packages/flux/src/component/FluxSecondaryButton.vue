<template>
    <BaseButton
        class="flux-secondary-button"
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
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
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
        size: 'medium',
        type: 'button'
    });

    const slots = useSlots();
</script>

<style lang="scss">
    .flux-secondary-button {
        --button-background: rgb(var(--gray-0));
        --button-background-hover: rgb(var(--gray-2));
        --button-background-active: rgb(var(--gray-3));
        --button-foreground: var(--foreground);
        --button-icon: var(--foreground-prominent);
        --button-stroke: rgb(var(--gray-4) / .75);
    }
</style>
