<template>
    <FluxFlyout is-auto-width>
        <template #opener="{open}">
            <FluxMenuItem
                :class="slots.switcher ? $style.applicationMenuAccountSwitcher : $style.applicationMenuAccount"
                :icon-leading="icon"
                :icon-trailing="slots.switcher ? 'angle-down' : undefined"
                :image-alt="imageAlt"
                :image-src="imageSrc"
                :label="label"
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
    import $style from '../css/component/ApplicationMenu.module.scss';

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
