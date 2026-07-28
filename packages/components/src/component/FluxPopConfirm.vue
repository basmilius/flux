<template>
    <FluxFlyout
        :direction="direction"
        :label="label ?? title ?? message ?? confirmLabel ?? translate('flux.ok')"
        :margin="margin"
        :width="width"
        @close="onFlyoutClose">
        <template #opener="bindings">
            <slot
                v-bind="bindings"
                name="opener"/>
        </template>

        <template #default="{close}">
            <FluxPaneBody :class="$style.popConfirmBody">
                <slot v-bind="{close}">
                    <div :class="$style.popConfirmContent">
                        <FluxIcon
                            v-if="icon"
                            :class="$style.popConfirmIcon"
                            :color="isDestructive ? 'danger' : 'primary'"
                            :name="icon"
                            :size="20"/>

                        <div :class="$style.popConfirmCaption">
                            <strong v-if="title">
                                {{ title }}
                            </strong>

                            <span v-if="message">
                                {{ message }}
                            </span>
                        </div>
                    </div>
                </slot>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxSecondaryButton
                    :autofocus="isDestructive || undefined"
                    :label="cancelLabel ?? translate('flux.cancel')"
                    @click="onCancelClick(close)"/>

                <FluxDestructiveButton
                    v-if="isDestructive"
                    :label="confirmLabel ?? translate('flux.ok')"
                    @click="onConfirmClick(close)"/>

                <FluxPrimaryButton
                    v-else
                    autofocus
                    icon-leading="circle-check"
                    :label="confirmLabel ?? translate('flux.ok')"
                    @click="onConfirmClick(close)"/>
            </FluxPaneFooter>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection, FluxIconName } from '@flux-ui/types';
    import type { VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxDestructiveButton from './FluxDestructiveButton.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import $style from '~flux/components/css/component/PopConfirm.module.scss';

    const emit = defineEmits<{
        cancel: [];
        confirm: [];
    }>();

    defineProps<{
        readonly cancelLabel?: string;
        readonly confirmLabel?: string;
        readonly direction?: FluxDirection;
        readonly icon?: FluxIconName;
        readonly isDestructive?: boolean;
        readonly label?: string;
        readonly margin?: number;
        readonly message?: string;
        readonly title?: string;
        readonly width?: number | string;
    }>();

    defineSlots<{
        default(props: {
            close(): void;
        }): VNode[];

        opener(props: {
            close(): void;
            open(): void;
            toggle(): void;

            readonly isOpen: boolean;
        }): VNode[];
    }>();

    const translate = useTranslate();

    let isDecided = false;

    function onCancelClick(close: () => void): void {
        isDecided = true;
        emit('cancel');
        close();
    }

    function onConfirmClick(close: () => void): void {
        isDecided = true;
        emit('confirm');
        close();
    }

    // Dismissing the popup without pressing a button counts as a cancel.
    function onFlyoutClose(): void {
        if (!isDecided) {
            emit('cancel');
        }

        isDecided = false;
    }
</script>
