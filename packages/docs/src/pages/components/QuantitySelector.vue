<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Quantity selector"/>

        <preview>
            <flux-quantity-selector
                :max="1000000000"
                :min="0"
                :model-value="5"/>
        </preview>

        <api-section>
            <p>
                A quantity selector can be used when users need to select a amount of something. For example: Within
                a shop, a user is able to select how many of a certain product they want to buy.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="QuantitySelector">
                <template #props>
                    <tr>
                        <td><code>max</code><code>number</code></td>
                        <td>Maximum selectable value.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>number</code></td>
                        <td>Minimum selectable value.</td>
                    </tr>
                    <tr>
                        <td><code>model-value</code><code>number</code></td>
                        <td>The selected quantity.</td>
                    </tr>
                    <tr>
                        <td><code>step</code><code>number</code></td>
                        <td>The step that is used when going up or down in the quantity selector.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: number): void;</code></td>
                        <td>Triggered when a new value is selected.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Quantity selectors have a minimum and maximum value."/>

            <api-example
                :code="stepCode"
                :component="step"
                title="Step"
                description="The quantity selector also has support for a step prop that controls by how much the value is increased or decreased at once."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxQuantitySelector, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/quantitySelector/basic.vue';
    import basicCode from '@/code/components/quantitySelector/basic.vue?raw';
    import step from '@/code/components/quantitySelector/step.vue';
    import stepCode from '@/code/components/quantitySelector/step.vue?raw';
</script>
