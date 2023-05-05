<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Chip"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxStack
                        axis="horizontal"
                        :gap="9"
                        is-centered
                        is-wrapping>
                        <FluxChip
                            icon-before="lock"
                            label="Chip"/>

                        <FluxChip
                            icon-after="gear"
                            label="Chip"/>

                        <FluxChip
                            is-selectable
                            label="Addable Chip"/>

                        <FluxChip
                            is-selectable
                            is-selected
                            label="Selected Chip"/>
                    </FluxStack>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A chip can display the status of an entity or toggle a status of an entity.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['check', 'plus']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Chip">
                <template #props>
                    <tr>
                        <td><code>icon-after</code><code>IconNames</code></td>
                        <td>The icon that is used as a prefix.</td>
                    </tr>
                    <tr>
                        <td><code>icon-before</code><code>IconNames</code></td>
                        <td>The icon that is used as a suffix.</td>
                    </tr>
                    <tr>
                        <td><code>is-selectable</code><code>boolean</code></td>
                        <td>Allows the chip to be selected.</td>
                    </tr>
                    <tr>
                        <td><code>is-selected</code><code>boolean</code></td>
                        <td>Indicates that the chip is currently selected. Requires the is-selectable prop.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the chip.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the chip is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
