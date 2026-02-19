<template>
    <FluxStack
        :class="$style.actionBar"
        direction="horizontal"
        :gap="9">
        <slot name="primary"/>
        <slot name="actionsStart"/>

        <FluxSpacer v-if="(slots.primary || slots.actionsStart) && (slots.actionsBeforeSearch || slots.search || slots.actionsAfterSearch || slots.filter || slots.actionsEnd)"/>

        <slot name="actionsBeforeSearch"/>
        <slot name="search"/>
        <slot name="actionsAfterSearch"/>

        <FluxFlyout v-if="slots.filter">
            <template #opener="{close, open, toggle}">
                <slot
                    v-bind="{close, open, toggle}"
                    name="filterOpener">
                    <FluxButtonGroup>
                        <FluxSecondaryButton
                            icon-leading="filter"
                            :label="translate('flux.filter')"
                            @click="open"/>

                        <FluxTooltip
                            v-if="isResettable"
                            :content="translate('flux.filterReset')">
                            <FluxDestructiveButton
                                icon-leading="xmark"
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
    import { useTranslate } from '$flux/composable/private';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxDestructiveButton from './FluxDestructiveButton.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import FluxStack from './FluxStack.vue';
    import FluxTooltip from './FluxTooltip.vue';
    import $style from '$flux/css/component/Action.module.scss';

    defineEmits<{
        reset: [];
    }>();

    defineProps<{
        readonly isResettable?: boolean;
    }>();

    const slots = defineSlots<{
        primary?(): any;
        actionsEnd?(): any;
        actionsStart?(): any;
        actionsAfterSearch?(): any;
        actionsBeforeSearch?(): any;
        search?(): any;

        filter?(props: {
            close(): void;

            readonly paneX: number;
            readonly paneY: number;
            readonly openerWidth: number;
            readonly openerHeight: number;
        }): any;

        filterOpener?(props: {
            close(): void;
            open(): void;
            toggle(): void;
        }): any;
    }>();

    const translate = useTranslate();
</script>
