<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Quantity selector"/>

        <Preview>
            <FluxQuantitySelector
                :max="1000000000"
                :min="0"
                :model-value="5"/>
        </Preview>

        <ApiSection>
            <p>
                A quantity selector can be used when users need to select a amount of something. For example: Within
                a shop, a user is able to select how many of a certain product they want to buy.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['minus', 'plus']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="QuantitySelector">
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
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="Quantity selectors have a minimum and maximum value."/>

            <ApiExample
                :code="stepCode"
                :component="step"
                title="Step"
                description="The quantity selector also has support for a step prop that controls by how much the value is increased or decreased at once."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxQuantitySelector, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/quantitySelector/basic.vue';
    import basicCode from '@/code/components/quantitySelector/basic.vue?raw';
    import step from '@/code/components/quantitySelector/step.vue';
    import stepCode from '@/code/components/quantitySelector/step.vue?raw';
</script>
