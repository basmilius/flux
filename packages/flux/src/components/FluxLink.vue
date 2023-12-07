<template>
    <BaseButton
        v-bind="{type, disabled, iconBefore: icon, iconAfter: 'arrow-right-long', label, href, rel, target, to}"
        :css-class="styles.link"
        :css-class-icon="styles.linkIcon"
        :css-class-label="styles.linkLabel"
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
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import { BaseButton } from './primitive';
    import styles from '@/css/components/Button.module.scss';

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
        readonly icon?: IconNames;
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
