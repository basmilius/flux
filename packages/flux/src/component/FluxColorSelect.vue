<template>
    <div :class="$style.colorSelect">
        <button
            v-for="color of colors"
            :class="modelValue === color ? $style.colorSelectColorSelected : $style.colorSelectColorDeselected"
            :style="{
                '--color': color
            }"
            @click="select(color)">
            <FluxIcon
                :class="$style.colorSelectCheck"
                :size="16"
                variant="check"/>
        </button>

        <FluxFlyout v-if="isCustomAllowed">
            <template #opener="{open}">
                <button
                    :class="$style.colorSelectCustom"
                    @click="open()">
                    <FluxIcon
                        :size="16"
                        variant="ellipsis-h"/>
                </button>
            </template>

            <template #default="{close}">
                <FluxColorPicker
                    v-model="customColor"
                    :class="$style.colorSelectCustomPicker"/>

                <FluxPaneBody :class="$style.colorSelectButtons">
                    <FluxSecondaryButton
                        :label="t('flux.cancel')"
                        @click="close()"/>

                    <FluxPrimaryButton
                        :label="t('flux.ok')"
                        @click="select(customColor, close)"/>
                </FluxPaneBody>
            </template>
        </FluxFlyout>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { amber500, blue500, cyan500, emerald500, fuchsia500, green500, indigo500, lime500, orange500, pink500, purple500, red500, rose500, sky500, teal500, violet500, yellow500 } from '@basmilius/flux-internals';
    import { ref, watch } from 'vue';
    import { useTranslate } from '@/composable/private';
    import FluxColorPicker from './FluxColorPicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '@/css/component/Color.module.scss';

    const modelValue = defineModel<string>({
        default: '#000000'
    });

    const {
        colors = [red500, orange500, amber500, yellow500, lime500, green500, emerald500, teal500, cyan500, sky500, blue500, indigo500, violet500, purple500, fuchsia500, pink500, rose500]
    } = defineProps<{
        readonly colors?: string[];
        readonly isCustomAllowed?: boolean;
    }>();

    const t = useTranslate();

    const customColor = ref('#000000');

    function select(color: string, close?: () => void): void {
        modelValue.value = color;
        close?.();
    }

    watch(modelValue, value => customColor.value = value, {immediate: true});
</script>
