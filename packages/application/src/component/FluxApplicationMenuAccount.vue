<template>
    <FluxFlyout
        :label="label"
        width="max(var(--opener-width), calc(var(--application-menu-width) - 25px))">
        <template #opener="{open, isOpen}">
            <FluxMenuItem
                :class="slots.switcher ? $style.applicationMenuAccountSwitcher : $style.applicationMenuAccount"
                :icon-leading="icon"
                :icon-trailing="slots.switcher ? 'angle-down' : undefined"
                :image-alt="imageAlt"
                :image-src="imageSrc"
                :label="label"
                :aria-label="label"
                :aria-haspopup="slots.switcher ? 'dialog' : undefined"
                :aria-expanded="slots.switcher ? isOpen : undefined"
                @click="slots.switcher && open()">
                <template
                    v-if="slots.avatar"
                    #before>
                    <slot name="avatar"/>
                </template>
            </FluxMenuItem>
        </template>

        <template v-if="slots.switcher">
            <FluxPane>
                <slot name="switcher"/>
            </FluxPane>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxMenuItem, FluxPane } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import type { VNode } from 'vue';
    import $style from '~flux/application/css/component/ApplicationMenu.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly imageAlt?: string;
        readonly imageSrc?: string;
        readonly label: string;
    }>();

    const slots = defineSlots<{
        avatar?(): VNode;
        switcher?(): VNode;
    }>();
</script>
