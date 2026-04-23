<template>
    <div
        :class="$style.colorSelect"
        role="radiogroup">
        <button
            v-for="color of colors"
            :key="color"
            :class="modelValue === color ? $style.colorSelectColorSelected : $style.colorSelectColorDeselected"
            :style="{
                '--color': color
            }"
            type="button"
            role="radio"
            :aria-checked="modelValue === color"
            :aria-label="color"
            :disabled="disabled"
            :tabindex="disabled ? -1 : 0"
            @click="select(color)">
            <FluxIcon
                :class="$style.colorSelectCheck"
                name="check"
                :size="14"/>
        </button>

        <FluxFlyout v-if="isCustomAllowed">
            <template #opener="{open}">
                <button
                    :class="$style.colorSelectCustom"
                    type="button"
                    :disabled="disabled"
                    :tabindex="disabled ? -1 : 0"
                    :aria-label="translate('flux.customColor')"
                    @click="open()">
                    <FluxIcon
                        name="ellipsis-h"
                        :size="16"/>
                </button>
            </template>

            <template #default="{close}">
                <FluxColorPicker
                    v-model="customColor"
                    :class="$style.colorSelectCustomPicker"/>

                <FluxPaneBody :class="$style.colorSelectButtons">
                    <FluxSecondaryButton
                        :label="translate('flux.cancel')"
                        @click="close()"/>

                    <FluxPrimaryButton
                        :label="translate('flux.ok')"
                        @click="select(customColor, close)"/>
                </FluxPaneBody>
            </template>
        </FluxFlyout>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { amber500, blue500, cyan500, emerald500, fuchsia500, green500, indigo500, lime500, orange500, pink500, purple500, red500, rose500, sky500, teal500, violet500, yellow500 } from '@flux-ui/internals';
    import { ref, toRef, unref, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import { useTranslate } from '$flux/composable/private';
    import FluxColorPicker from './FluxColorPicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '$flux/css/component/Color.module.scss';

    const modelValue = defineModel<string>({
        default: '#000000'
    });

    const {
        colors = [red500, orange500, amber500, yellow500, lime500, green500, emerald500, teal500, cyan500, sky500, blue500, indigo500, violet500, purple500, fuchsia500, pink500, rose500],
        disabled: componentDisabled
    } = defineProps<{
        readonly colors?: string[];
        readonly disabled?: boolean;
        readonly isCustomAllowed?: boolean;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const customColor = ref('#000000');

    function select(color: string, close?: () => void): void {
        if (unref(disabled)) {
            return;
        }

        modelValue.value = color;
        close?.();
    }

    watch(modelValue, value => customColor.value = value, {immediate: true});
</script>
