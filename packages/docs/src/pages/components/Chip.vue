<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Chip"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-stack
                        axis="horizontal"
                        :gap="9"
                        is-centered
                        is-wrapping>
                        <flux-chip
                            icon-before="lock"
                            label="Chip"/>
                        <flux-chip
                            icon-after="gear"
                            label="Chip"/>
                        <flux-chip
                            is-selectable
                            label="Addable Chip"/>
                        <flux-chip
                            is-selectable
                            is-selected
                            label="Selected Chip"/>
                    </flux-stack>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                <em>Todo</em>
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>iconAfter</code><code>IconNames</code></td>
                        <td>The icon that is used as a prefix.</td>
                    </tr>
                    <tr>
                        <td><code>iconBefore</code><code>IconNames</code></td>
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
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the chip is clicked.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
