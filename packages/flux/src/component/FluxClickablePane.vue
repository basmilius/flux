<template>
    <ButtonComponent
        :component-type="type"
        :class="CLASS_MAP[variant]"
        type="button"
        :tabindex="tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to">
        <slot/>

        <slot
            v-if="isLoading"
            name="loader">
            <div :class="styles.paneLoader">
                <FluxSpinner/>
            </div>
        </slot>

        <div
            v-if="tag"
            :class="styles.paneTag">
            {{ tag }}
        </div>
    </ButtonComponent>
</template>

<script
    lang="ts"
    setup>
    import { ButtonType, To } from '@/types';
    import ButtonComponent from './primitive/ButtonComponent.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Pane.module.scss';

    const CLASS_MAP = {
        default: styles.paneDefault,
        flat: styles.paneFlat,
        well: styles.paneWell
    } as const;

    const {
        variant = 'default'
    } = defineProps<{
        readonly isLoading?: boolean;
        readonly tag?: string;
        readonly variant?: 'default' | 'flat' | 'well';
        readonly type?: ButtonType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: To;
    }>();

    defineSlots<{
        default(): any;
        loader(): any;
    }>();
</script>
