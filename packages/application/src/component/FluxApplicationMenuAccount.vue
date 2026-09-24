<template>
    <FluxFlyout
        :class="$style.applicationMenuAccountFlyout"
        :margin="margin"
        :direction="direction">
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
    import { FluxFlyout, FluxMenuItem, FluxPane, useBreakpoints } from '@flux-ui/components';
    import type { FluxDirection, FluxIconName } from '@flux-ui/types';
    import { computed, type VNode } from 'vue';
    import { useApplicationInjection } from '../composable';
    import $style from '~flux/application/css/component/ApplicationMenu.module.scss';

    const {isSwitcherAside = false} = defineProps<{
        readonly icon?: FluxIconName;
        readonly imageAlt?: string;
        readonly imageSrc?: string;
        readonly isSwitcherAside?: boolean;
        readonly label: string;
    }>();

    const {isMenuCollapsed, showDesktopMenuToggle} = useApplicationInjection();
    const {lg} = useBreakpoints();

    const margin = computed(() => direction.value === 'horizontal' ? 20 : 9);

    const direction = computed<FluxDirection>(() => {
        if (!lg.value) {
            return 'vertical';
        }

        return isSwitcherAside || isMenuCollapsed.value && showDesktopMenuToggle.value
            ? 'horizontal'
            : 'vertical';
    });

    const slots = defineSlots<{
        avatar?(): VNode;
        switcher?(): VNode;
    }>();
</script>
