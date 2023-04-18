<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Form range slider"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-form-range-slider
                        v-model="sliderValue"
                        is-ticks-visible
                        :min="0"
                        :max="100"/>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A range slider is a user interface component that allows users to select two values within a
                predefined range. It is similar to a single-value slider, but instead of selecting a single
                value, a range slider allows the user to select a range of values between two endpoints. The
                two endpoints of the slider represent the minimum and maximum values of the range, and the user
                can adjust the position of each endpoint to select the desired range.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="FormRangeSlider">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>[number, number]</code></td>
                        <td>The current selected value.</td>
                    </tr>
                    <tr>
                        <td><code>formatter</code><code>(value: number, decimals?: number): string</code></td>
                        <td>The number formatter that is used for formatting within the value tooltip.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the slider is in a disabled state.</td>
                    </tr>
                    <tr>
                        <td><code>is-ticks-visible</code><code>boolean</code></td>
                        <td>Shows slider ticks.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>number</code></td>
                        <td>The maximum value that can be selected.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>number</code></td>
                        <td>The minimum value that can be selected.</td>
                    </tr>
                    <tr>
                        <td><code>step</code><code>number</code></td>
                        <td>The step between the min and max range.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: [number, number]): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A simple slider where the user can select a value between 0 and 100."/>

            <api-example
                :code="ticksCode"
                :component="ticks"
                title="Ticks"
                description="Sliders can show their ticks, the slider chooses this automatically."/>

            <api-example
                :code="formatterCode"
                :component="formatter"
                title="Custom formatter"
                description="The value that is shown in the tooltip is formatted according to the user's browser preferences. You may override this behavior."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormRangeSlider, FluxFormSlider, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/formRangeSlider/basic.vue';
    import basicCode from '@/code/components/formRangeSlider/basic.vue?raw';
    import formatter from '@/code/components/formRangeSlider/formatter.vue';
    import formatterCode from '@/code/components/formRangeSlider/formatter.vue?raw';
    import ticks from '@/code/components/formRangeSlider/ticks.vue';
    import ticksCode from '@/code/components/formRangeSlider/ticks.vue?raw';

    const sliderValue = ref([25, 75]);
</script>
