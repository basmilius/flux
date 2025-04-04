<template>
    <div
        :class="$style.colorPicker"
        :style="{
            '--pickerBackground': saturationPickerColor
        }">
        <CoordinatePicker
            v-model="saturationValue"
            :class="$style.colorPickerSaturation"
            :max="1"
            :min="0"
            :step="0.0005"
            @dragging="onDragging"/>

        <FluxFormSlider
            v-model="hue"
            :class="$style.colorPickerHueSlider"
            is-tooltip-disabled
            :max="360"
            :min="0"
            :step="0.1"/>

        <FluxFormSlider
            v-if="isAlphaEnabled"
            v-model="alpha"
            :class="$style.colorPickerAlphaSlider"
            is-tooltip-disabled
            :max="1"
            :min="0"
            :step="0.001"/>

        <div :class="$style.colorPickerValue">
            <div
                :class="$style.colorPickerPreview"
                :style="{
                '--color': rgb
            }"/>

            <FluxFormField
                v-if="type === 'hex'"
                label="Hex">
                <FluxFormInput v-model.lazy="modelValue"/>
            </FluxFormField>

            <template v-else-if="type === 'rgb'">
                <FluxFormField label="R">
                    <FluxFormInput
                        v-model.lazy="rgbInputR"
                        :max="255"
                        :min="0"
                        type="number"/>
                </FluxFormField>

                <FluxFormField label="G">
                    <FluxFormInput
                        v-model.lazy="rgbInputG"
                        :max="255"
                        :min="0"
                        type="number"/>
                </FluxFormField>

                <FluxFormField label="B">
                    <FluxFormInput
                        v-model.lazy="rgbInputB"
                        :max="255"
                        :min="0"
                        type="number"/>
                </FluxFormField>
            </template>

            <template v-else-if="type === 'hsv'">
                <FluxFormField label="H">
                    <FluxFormInput
                        v-model.lazy="hsvInputH"
                        :max="1"
                        :min="0"
                        type="number"/>
                </FluxFormField>

                <FluxFormField label="S">
                    <FluxFormInput
                        v-model.lazy="hsvInputS"
                        :max="1"
                        :min="0"
                        type="number"/>
                </FluxFormField>

                <FluxFormField label="V">
                    <FluxFormInput
                        v-model.lazy="hsvInputV"
                        :max="1"
                        :min="0"
                        type="number"/>
                </FluxFormField>
            </template>

            <template v-else-if="type === 'hsl'">
                <FluxFormField label="H">
                    <FluxFormInput
                        v-model.lazy="hslInputH"
                        :max="360"
                        :min="0"
                        type="number"/>
                </FluxFormField>

                <FluxFormField label="S">
                    <FluxFormInput
                        v-model.lazy="hslInputS"
                        :max="100"
                        :min="0"
                        type="number"/>
                </FluxFormField>

                <FluxFormField label="L">
                    <FluxFormInput
                        v-model.lazy="hslInputL"
                        :max="100"
                        :min="0"
                        type="number"/>
                </FluxFormField>
            </template>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { blue500 } from '@basmilius/flux-internals';
    import { hexToRGB, hslToHSV, hslToRGB, hsvToHSL, hsvToRGB, rgbToHEX, rgbToHSL, rgbToHSV } from '@basmilius/utils';
    import { computed, ComputedRef, ref, unref, watch } from 'vue';
    import CoordinatePicker from './primitive/CoordinatePicker.vue';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormSlider from './FluxFormSlider.vue';
    import $style from '$flux/css/component/Color.module.scss';

    const modelValue = defineModel<string | [number, number, number]>({
        default: blue500
    });

    const {
        type = 'hex'
    } = defineProps<{
        readonly isAlphaEnabled?: boolean;
        readonly type?: 'hex' | 'rgb' | 'hsl' | 'hsv';
    }>();

    const alpha = ref(1);
    const hsv = ref<[number, number, number]>([0, 0, 0]);
    const isDragging = ref(false);

    const rgb = computed(() => {
        const [r, g, b] = hsvToRGB(...unref(hsv));

        return `rgb(${r} ${g} ${b} / ${unref(alpha)})`;
    });

    const hue = computed({
        get: () => unref(hsv)[0] * 360,
        set: value => hsv.value = [value / 360, hsv.value[1], hsv.value[2]]
    });

    const saturation = computed({
        get: () => unref(hsv)[1],
        set: value => hsv.value = [hsv.value[0], value, hsv.value[2]]
    });

    const value = computed({
        get: () => 1 - unref(hsv)[2],
        set: value => hsv.value = [hsv.value[0], hsv.value[1], 1 - value]
    });

    const saturationValue = computed({
        get: (): [number, number] => [unref(saturation), unref(value)],
        set: ([s, v]: [number, number]) => {
            saturation.value = s;
            value.value = v;
        }
    });

    const saturationPickerColor = computed(() => {
        const [r, g, b] = hsvToRGB(unref(hsv)[0], 1, 1);

        return `rgb(${r} ${g} ${b})`;
    });

    const hslInputH = generateComputedInput(0, hsvToHSL, hslToHSV);
    const hslInputS = generateComputedInput(1, hsvToHSL, hslToHSV);
    const hslInputL = generateComputedInput(2, hsvToHSL, hslToHSV);

    const hsvInputH = generateComputedInput(0);
    const hsvInputS = generateComputedInput(1);
    const hsvInputV = generateComputedInput(2);

    const rgbInputR = generateComputedInput(0, hsvToRGB, rgbToHSV);
    const rgbInputG = generateComputedInput(1, hsvToRGB, rgbToHSV);
    const rgbInputB = generateComputedInput(2, hsvToRGB, rgbToHSV);

    function onDragging(is: boolean): void {
        isDragging.value = is;
    }

    function generateComputedInput(index: number, fromHSV?: (a: number, b: number, c: number) => [number, number, number], toHSV?: (a: number, b: number, c: number) => [number, number, number]): ComputedRef<number> {
        return computed({
            get: () => fromHSV?.(...unref(hsv))[index] ?? unref(hsv)[index],
            set: value => {
                const values = fromHSV?.(...unref(hsv)) ?? unref(hsv);
                values[index] = value;
                hsv.value = toHSV?.(...values) ?? values;
            }
        });
    }

    watch(modelValue, (modelValue, oldModelValue) => {
        if (unref(isDragging)) {
            return;
        }

        if (JSON.stringify(modelValue) === JSON.stringify(oldModelValue)) {
            return;
        }

        const hex = type === 'hex' ? modelValue.toString() : '';
        const values: [number, number, number] = type !== 'hex' ? modelValue as [number, number, number] : [0, 0, 0];

        switch (type) {
            case 'hex':
                hsv.value = rgbToHSV(...hexToRGB(hex));
                break;

            case 'rgb':
                hsv.value = rgbToHSV(...values);
                break;

            case 'hsl':
                hsv.value = rgbToHSV(...hslToRGB(...values));
                break;

            case 'hsv':
                hsv.value = [...values];
                break;
        }
    }, {immediate: true});

    watch(hsv, hsv => {
        switch (type) {
            case 'hex':
                modelValue.value = rgbToHEX(...hsvToRGB(...hsv));
                break;

            case 'rgb':
                modelValue.value = hsvToRGB(...hsv);
                break;

            case 'hsl':
                modelValue.value = rgbToHSL(...hsvToRGB(...hsv));
                break;

            case 'hsv':
                modelValue.value = [...hsv];
                break;
        }
    });
</script>
