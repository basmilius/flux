<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="ActionPane"/>

        <Preview>
            <FluxActionPane>
                <h2>Seating</h2>
                <p>
                    We're thrilled to announce the latest enhancement to our ticketing platform – the introduction of
                    customizable seating options! Now, you have the power to meticulously plan and design the seating
                    arrangement for your events.
                </p>

                <template #buttons>
                    <FluxPrimaryButton label="Create event"/>
                    <FluxSecondaryButton label="Dismiss"/>
                </template>
            </FluxActionPane>
        </Preview>

        <ApiSection>
            <p>
                An action pane can be used to show the user an important action or a new feature. The pane
                should always have the option to be dismissed by either a dismiss button or something that
                looks like it.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="ActionPane">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The content of the action pane.</td>
                    </tr>
                    <tr>
                        <td><code>buttons</code><code>{}</code></td>
                        <td>The buttons shown in the action pane.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionPane, FluxPrimaryButton, FluxSecondaryButton, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
