<template>
    <div :class="$style.playground">
        <FluxProse
            :class="$style.intro"
            container
            tag="header">
            <h1>Flux playground</h1>
            <p>A single page that puts many Flux components next to each other. Use it to eyeball how the pieces look together, and to see how the light element defaults and the rich <a href="/components/prose">Prose</a> styling coexist on one page.</p>
        </FluxProse>

        <div :class="$style.grid">
            <FluxPane>
                <FluxPaneHeader
                    icon="circle-check"
                    subtitle="Primary, secondary and destructive"
                    title="Buttons"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="15"
                        direction="vertical">
                        <FluxButtonStack>
                            <FluxPrimaryButton
                                icon-leading="circle-check"
                                label="Save"/>
                            <FluxSecondaryButton
                                icon-leading="copy"
                                label="Copy"/>
                            <FluxDestructiveButton
                                icon-leading="xmark"
                                label="Delete"/>
                        </FluxButtonStack>

                        <FluxSplitButton>
                            <template #button>
                                <FluxSecondaryButton label="Download"/>
                            </template>

                            <template #flyout>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="rectangle-sd"
                                            label="Download in SD"/>
                                        <FluxMenuItem
                                            icon-leading="rectangle-hd"
                                            label="Download in HD"/>
                                    </FluxMenuGroup>

                                    <FluxSeparator/>

                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="rectangle-4k"
                                            label="Download in 4K"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </template>
                        </FluxSplitButton>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="pen"
                    subtitle="Fields, toggles and choices"
                    title="Form controls"/>
                <FluxForm>
                    <FluxPaneBody>
                        <FluxFormColumn>
                            <FluxFormField label="Email">
                                <FluxFormInput
                                    auto-complete="email"
                                    placeholder="email@example.com"
                                    type="email"/>
                            </FluxFormField>

                            <FluxFormField label="Newsletter">
                                <FluxFormCheckbox
                                    model-value
                                    label="Send me weekly updates."/>
                            </FluxFormField>

                            <FluxFormField label="Toggles">
                                <FluxFlex :gap="18">
                                    <FluxToggle v-model="toggle"/>
                                    <FluxToggle
                                        v-model="toggleIcon"
                                        icon-off="xmark"
                                        icon-on="check"/>
                                </FluxFlex>
                            </FluxFormField>
                        </FluxFormColumn>
                    </FluxPaneBody>
                </FluxForm>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="circle-exclamation"
                    subtitle="Badges, notices and dialogs"
                    title="Feedback"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="15"
                        direction="vertical">
                        <FluxBadgeStack>
                            <FluxBadge label="Help wanted"/>
                            <FluxBadge
                                color="success"
                                icon="circle-check"
                                label="Completed"/>
                            <FluxBadge
                                color="danger"
                                dot
                                label="Attention"/>
                        </FluxBadgeStack>

                        <FluxNotice
                            color="warning"
                            icon="circle-exclamation"
                            message="Please note that this is a warning message."/>

                        <FluxButtonStack>
                            <FluxSecondaryButton
                                icon-leading="circle-arrow-up"
                                label="Snackbar"
                                @click="onSnackbar"/>
                            <FluxSecondaryButton
                                icon-leading="circle-exclamation"
                                label="Confirm"
                                @click="onConfirm"/>
                            <FluxTooltip content="A helpful tooltip">
                                <FluxSecondaryButton
                                    icon-leading="copy"
                                    label="Tooltip"/>
                            </FluxTooltip>
                        </FluxButtonStack>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxTabs>
                    <FluxTab label="Steps">
                        <FluxPaneBody>
                            <FluxStepper v-model="step">
                                <FluxStepperStep>Cart</FluxStepperStep>
                                <FluxStepperStep>Shipping</FluxStepperStep>
                                <FluxStepperStep>Payment</FluxStepperStep>
                            </FluxStepper>
                        </FluxPaneBody>
                    </FluxTab>

                    <FluxTab label="View">
                        <FluxPaneBody>
                            <FluxSegmentedControl v-model="view">
                                <FluxSegmentedControlItem
                                    icon="grid-2"
                                    label="Grid"
                                    value="grid"/>
                                <FluxSegmentedControlItem
                                    icon="list"
                                    label="List"
                                    value="list"/>
                                <FluxSegmentedControlItem
                                    icon="rectangle-history"
                                    label="Stack"
                                    value="stack"/>
                            </FluxSegmentedControl>
                        </FluxPaneBody>
                    </FluxTab>
                </FluxTabs>
            </FluxPane>

            <FluxPane :class="$style.span2">
                <FluxPaneHeader
                    icon="clone"
                    subtitle="Avatars, chips and a table"
                    title="Data"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="18"
                        align="center"
                        wrap="wrap">
                        <FluxAvatar
                            :size="42"
                            alt="Bas"
                            src="https://avatars.githubusercontent.com/u/978257?v=4"
                            status="success"/>
                        <FluxAvatar
                            :size="42"
                            alt="Ann"
                            fallback-initials="AB"
                            status="danger"/>
                        <FluxChip
                            icon-leading="sparkles"
                            label="New user"/>
                        <FluxChip
                            icon-leading="location-dot"
                            label="Groenlo"/>
                    </FluxFlex>
                </FluxPaneBody>

                <FluxTable>
                    <template #header>
                        <FluxTableHeader
                            v-for="header in 3"
                            :key="header"
                            :is-sortable="header === 2">
                            Header {{ header }}
                        </FluxTableHeader>
                        <FluxTableHeader is-shrinking/>
                    </template>

                    <FluxTableRow
                        v-for="row in 3"
                        :key="row">
                        <FluxTableCell
                            v-for="cell in 3"
                            :key="cell">
                            Cell {{ cell }}&times;{{ row }}
                        </FluxTableCell>

                        <FluxTableCell>
                            <FluxTableActions>
                                <FluxAction icon="pen"/>
                                <FluxAction icon="ellipsis-h"/>
                            </FluxTableActions>
                        </FluxTableCell>
                    </FluxTableRow>
                </FluxTable>
            </FluxPane>

            <FluxPane :class="$style.span2">
                <FluxPaneHeader
                    icon="circle-info"
                    subtitle="Light defaults versus rich prose"
                    title="Typography &amp; Prose"/>
                <FluxPaneBody>
                    <FluxProse
                        container
                        tag="article">
                        <p>Outside of any container, Flux keeps only light element defaults: heading sizes, links and a monospace font. Everything below flows inside <code>FluxProse</code>, which adds the vertical rhythm, list markers, decorated blockquotes, code blocks and styled tables. In container mode, elements can break out of the reading measure.</p>

                        <h2>The vertical rhythm</h2>
                        <p>Each block sits on a consistent baseline, and the spacing scales with the weight of the element, so a new section gets more room above it than the next paragraph does.</p>

                        <blockquote>Typography exists to honor content. Its purpose is to serve the reader, not to draw attention to itself.</blockquote>

                        <h3>Working with lists</h3>
                        <ul>
                            <li>Keep the measure between 45 and 75 characters.
                                <ul>
                                    <li>Narrower for captions.</li>
                                    <li>Wider for long form reading.</li>
                                </ul>
                            </li>
                            <li>Set a generous line height for body copy.</li>
                        </ul>

                        <p>Wrap identifiers such as <code>--flux-prose-container</code> in inline code, and press <kbd>Cmd</kbd> + <kbd>K</kbd> to open the command palette.</p>

                        <FluxProseReset data-flux-prose-full>
                            <FluxNotice
                                color="info"
                                icon="circle-info"
                                message="This notice is wrapped in FluxProseReset and marked data-flux-prose-full, so it breaks out to the full width while keeping its own styling and flowing in the article rhythm."/>
                        </FluxProseReset>

                        <table data-flux-prose-wide>
                            <thead>
                                <tr>
                                    <th>Element</th>
                                    <th>Size</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Heading 1</td>
                                    <td>27px</td>
                                    <td>Page title</td>
                                </tr>
                                <tr>
                                    <td>Body</td>
                                    <td>15px</td>
                                    <td>Paragraphs and lists</td>
                                </tr>
                            </tbody>
                        </table>
                    </FluxProse>
                </FluxPaneBody>
            </FluxPane>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxAvatar, FluxBadge, FluxBadgeStack, FluxButtonStack, FluxChip, FluxDestructiveButton, FluxFlex, FluxForm, FluxFormCheckbox, FluxFormColumn, FluxFormField, FluxFormInput, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxProse, FluxProseReset, FluxSecondaryButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator, FluxSplitButton, FluxStepper, FluxStepperStep, FluxTab, FluxTable, FluxTableActions, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTabs, FluxToggle, FluxTooltip, showConfirm, showSnackbar } from '@flux-ui/components';
    import { ref } from 'vue';

    const step = ref(0);
    const toggle = ref(true);
    const toggleIcon = ref(false);
    const view = ref('grid');

    function onSnackbar(): void {
        showSnackbar({
            icon: 'circle-check',
            message: 'Your changes have been saved.'
        });
    }

    async function onConfirm(): Promise<void> {
        const result = await showConfirm({
            icon: 'circle-exclamation',
            title: 'Delete item',
            message: 'Are you sure you want to delete this item?'
        });

        showSnackbar({
            icon: result ? 'circle-check' : 'xmark',
            message: result ? 'Item deleted.' : 'Cancelled.'
        });
    }
</script>

<style
    lang="scss"
    module>
    .playground {
        padding: 45px 24px 90px;
    }

    .intro {
        margin-bottom: 45px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 24px;
        max-width: 1200px;
        margin-inline: auto;
    }

    .span2 {
        grid-column: 1 / -1;
    }

    @media (max-width: 767px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>
