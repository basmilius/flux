<template>
    <div
        :class="$style.colorSelect"
        role="radiogroup">
        <button
            v-for="(color, index) of colors"
            :key="color"
            ref="swatches"
            :class="modelValue === color ? $style.colorSelectColorSelected : $style.colorSelectColorDeselected"
            :style="{
                '--color': color
            }"
            type="button"
            role="radio"
            :aria-checked="modelValue === color"
            :aria-label="color"
            :disabled="disabled"
            :tabindex="disabled || index !== focusedIndex ? -1 : 0"
            @click="select(color)"
            @keydown="onKeyDown($event, index)">
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
    import { ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxColorPicker from './FluxColorPicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '~flux/components/css/component/Color.module.scss';

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

    const swatchesRef = useTemplateRef<HTMLButtonElement[]>('swatches');
    const customColor = ref('#000000');
    const focusedIndex = ref(0);

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    watch(modelValue, value => {
        customColor.value = value;

        const selectedIndex = colors.indexOf(value);

        if (selectedIndex !== -1) {
            focusedIndex.value = selectedIndex;
        }
    }, {immediate: true});

    function select(color: string, close?: () => void): void {
        if (unref(disabled)) {
            return;
        }

        modelValue.value = color;
        close?.();
    }

    function focusSwatch(index: number): void {
        focusedIndex.value = index;
        unref(swatchesRef)?.[index]?.focus();
    }

    function onKeyDown(evt: KeyboardEvent, index: number): void {
        if (unref(disabled)) {
            return;
        }

        const last = colors.length - 1;

        switch (evt.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                focusSwatch(index >= last ? 0 : index + 1);
                break;

            case 'ArrowUp':
            case 'ArrowLeft':
                focusSwatch(index <= 0 ? last : index - 1);
                break;

            case 'Home':
                focusSwatch(0);
                break;

            case 'End':
                focusSwatch(last);
                break;

            default:
                return;
        }

        evt.preventDefault();
    }
</script>
