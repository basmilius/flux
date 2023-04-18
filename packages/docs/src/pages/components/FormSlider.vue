<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Form slider"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-form-slider
                        v-model="sliderValue"
                        is-ticks-visible
                        :min="0"
                        :max="100"
                        :step="1"/>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Sliders are a type of user interface component that allow users to select a single value from a
                specific range. They are widely used in various digital applications such as mobile apps, web
                applications, and desktop software. The main advantage of using a slider component is its ability
                to allow users to easily and quickly choose a desired value within a predefined range, without
                the need for any manual input.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="FormSlider">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>number</code></td>
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
                        <td><code>update:model-value</code><code>(value: number): void</code></td>
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
    import { FluxFormSlider, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/formSlider/basic.vue';
    import basicCode from '@/code/components/formSlider/basic.vue?raw';
    import formatter from '@/code/components/formSlider/formatter.vue';
    import formatterCode from '@/code/components/formSlider/formatter.vue?raw';
    import ticks from '@/code/components/formSlider/ticks.vue';
    import ticksCode from '@/code/components/formSlider/ticks.vue?raw';

    const sliderValue = ref(50);
</script>
