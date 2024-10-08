<template>
    <FluxStack
        :class="styles.actionBar"
        axis="horizontal"
        :gap="9">
        <slot name="primary"/>
        <slot name="actionsStart"/>

        <FluxSpacer/>

        <slot name="actionsBeforeSearch"/>
        <slot name="search"/>
        <slot name="actionsAfterSearch"/>

        <FluxFlyout v-if="slots.filter">
            <template
                v-if="$slots.filter"
                #opener="{close, open, toggle}">
                <slot
                    v-bind="{close, open, toggle}"
                    name="filterOpener">
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

            <template #default="{close, paneX, paneY, openerWidth, openerHeight}">
                <slot
                    name="filter"
                    v-bind="{close, paneX, paneY, openerWidth, openerHeight}"/>
            </template>
        </FluxFlyout>

        <slot name="actionsEnd"/>
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

    defineEmits<{
        reset: [];
    }>();

    defineProps<{
        readonly isResettable?: boolean;
    }>();

    defineSlots<{
        primary(): any;
        actionsEnd(): any;
        actionsStart(): any;
        actionsAfterSearch(): any;
        actionsBeforeSearch(): any;
        search(): any;

        filter(props: {
            close(): void;

            readonly paneX: number;
            readonly paneY: number;
            readonly openerWidth: number;
            readonly openerHeight: number;
        }): any;

        filterOpener(props: {
            close(): void;
            open(): void;
            toggle(): void;
        }): any;
    }>();

    const slots = useSlots();
    const translate = useTranslate();
</script>
