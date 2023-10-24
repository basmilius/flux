<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Form timezone picker"/>

        <Preview>
            <FluxPane style="width: 360px">
                <FluxPaneBody>
                    <FluxFormTimeZonePicker v-model="timeZone"/>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                This is a time zone select component designed to help users easily choose their preferred
                time zone from a comprehensive list of options. Users can efficiently set their time zone,
                ensuring that date and time-related information is accurate and synchronized with their
                location, making it ideal for platforms where precise time tracking and coordination are
                essential, such as global event scheduling, travel booking, or remote team collaboration.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['angle-down']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="FormTimeZonePicker">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>string | null</code></td>
                        <td>The value of the input.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the field is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder</code><code>string</code></td>
                        <td>A placeholder is no value is entered.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: string | null): void</code></td>
                        <td>Triggered when the value changes.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormTimeZonePicker, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
    import { ref } from 'vue';

    const timeZone = ref('Europe/Amsterdam');
</script>
