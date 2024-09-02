<template>
    <FluxStack
        :class="styles.actionBar"
        axis="horizontal"
        :gap="9">
        <slot name="primary"/>

        <slot name="actions-start"/>

        <FluxSpacer/>

        <slot name="actions-before-search"/>

        <slot name="search"/>

        <slot name="actions-after-search"/>

        <FluxFlyout v-if="slots.filter">
            <template
                v-if="$slots.filter"
                #opener="{close, open, toggle}">
                <slot
                    v-bind="{close, open, toggle}"
                    name="filter-opener">
                    <FluxButtonGroup>
                        <FluxSecondaryButton
                            icon-before="filter"
                            :label="translate('flux.filter')"
                            @click="open"/>

                        <FluxTooltip
                            v-if="isResettable"
                            :content="translate('flux.filterReset')">
                            <FluxDestructiveButton
                                icon-before="xmark"
                                @click="$emit('reset')"/>
                        </FluxTooltip>
                    </FluxButtonGroup>
                </slot>
            </template>

            <template #default="bindings">
                <slot
                    v-bind="bindings"
                    name="filter"/>
            </template>
        </FluxFlyout>

        <slot name="actions-end"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import { useTranslate } from '@/composable/private';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxDestructiveButton from './FluxDestructiveButton.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import FluxStack from './FluxStack.vue';
    import FluxTooltip from './FluxTooltip.vue';
    import styles from '@/css/component/Action.module.scss';

    export type Emits = {
        reset: [];
    };

    export type Props = {
        readonly isResettable?: boolean;
    };

    defineEmits<Emits>();
    defineProps<Props>();

    const slots = useSlots();
    const translate = useTranslate();
</script>
