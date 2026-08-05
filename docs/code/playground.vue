<template>
    <FluxProse
        :class="$style.componentsPlayground"
        container
        tag="article">
        <h1>Flux playground</h1>
        <p>This whole page is a single <code>FluxProse</code> container. The headings, paragraphs, lists and tables sit at a readable measure and flow in the prose rhythm, while Flux components are dropped straight in between them. No wrappers, no resets: prose only styles its own HTML elements, so every component keeps its own look and still lines up in the vertical rhythm.</p>
        <p>Use it to eyeball how the pieces look together and how the light element defaults and the rich prose styling coexist on one page. It is also the sheet used to review the color tokens, so most components appear in every intent and in every state that changes their surface, border or text color. Switch the site between light and dark and scroll through once.</p>

        <h2>Palette</h2>
        <p>The palette is a control surface rather than a lookup table: the semantic and intent tokens refer to <code>--palette-*</code> instead of holding a color of their own. The button in the bottom right corner opens the switcher and stays there while the page scrolls, so a scale can be swapped next to whatever component is on screen. <kbd>Shift</kbd> <kbd>G</kbd> and <kbd>Shift</kbd> <kbd>P</kbd> cycle the neutral and the primary scale without opening it at all. The two combine, so a brand can be checked as it would actually ship.</p>

        <h2>Buttons and actions</h2>
        <p>Buttons come in a few variants and can be grouped in a stack, or combined with a menu in a split button.</p>
        <FluxButtonStack>
            <FluxPrimaryButton
                icon-leading="circle-check"
                label="Save"/>
            <FluxSecondaryButton
                icon-leading="copy"
                label="Duplicate"/>
            <FluxDestructiveButton
                icon-leading="xmark"
                label="Delete"/>
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
        </FluxButtonStack>
        <p>The secondary and destructive buttons carry an inner line on top of their surface. It is easiest to judge at the two largest sizes, so they sit next to each other here.</p>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="floppy-disk"
                label="Save draft"
                size="large"/>
            <FluxDestructiveButton
                icon-leading="trash"
                label="Delete project"
                size="large"/>
        </FluxButtonStack>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="floppy-disk"
                label="Save draft"
                size="xl"/>
            <FluxDestructiveButton
                icon-leading="trash"
                label="Delete project"
                size="xl"/>
        </FluxButtonStack>
        <p>Every variant in the four states that change how it is painted: resting, active, loading and disabled.</p>
        <FluxButtonStack>
            <FluxPrimaryButton label="Primary"/>
            <FluxPrimaryButton
                is-active
                label="Active"/>
            <FluxPrimaryButton
                is-loading
                label="Loading"/>
            <FluxPrimaryButton
                disabled
                label="Disabled"/>
        </FluxButtonStack>
        <FluxButtonStack>
            <FluxSecondaryButton label="Secondary"/>
            <FluxSecondaryButton
                is-active
                label="Active"/>
            <FluxSecondaryButton
                is-loading
                label="Loading"/>
            <FluxSecondaryButton
                disabled
                label="Disabled"/>
        </FluxButtonStack>
        <FluxButtonStack>
            <FluxDestructiveButton label="Destructive"/>
            <FluxDestructiveButton
                is-active
                label="Active"/>
            <FluxDestructiveButton
                is-loading
                label="Loading"/>
            <FluxDestructiveButton
                disabled
                label="Disabled"/>
        </FluxButtonStack>
        <p>Buttons also come as a connected group, as a publish button that settles into a done state, and as bare icon actions in a stack.</p>
        <FluxFlex
            :gap="18"
            align="center"
            wrap="wrap">
            <FluxButtonGroup>
                <FluxSecondaryButton
                    icon-leading="align-left"
                    is-active/>
                <FluxSecondaryButton icon-leading="align-center"/>
                <FluxSecondaryButton icon-leading="align-right"/>
                <FluxSecondaryButton icon-leading="align-justify"/>
            </FluxButtonGroup>

            <FluxPublishButton
                :is-done="isPublished"
                label="Publish"
                @click="isPublished = !isPublished"/>

            <FluxActionStack>
                <FluxAction icon="pen"/>
                <FluxAction icon="copy"/>
                <FluxAction
                    is-active
                    icon="eye"/>
                <FluxAction
                    disabled
                    icon="lock"/>
                <FluxAction
                    icon="trash"
                    is-destructive/>
            </FluxActionStack>
        </FluxFlex>
        <FluxFlex
            :gap="18"
            align="center"
            wrap="wrap">
            <FluxLink
                href="#"
                label="A plain link"
                type="link"/>
            <FluxLink
                href="#"
                icon-leading="arrow-up-right-from-square"
                is-primary
                label="A primary link"
                type="link"/>
            <FluxLink
                disabled
                label="A disabled link"
                type="link"/>
        </FluxFlex>

        <h2>Status and feedback</h2>
        <p>Badges, tags and notices carry status, while snackbars and dialogs are triggered programmatically.</p>
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
            <FluxBadge
                color="primary"
                colored
                label="Featured"/>
        </FluxBadgeStack>
        <p>The same badge in all six intents, first with a tinted dot on a neutral surface and then fully colored.</p>
        <FluxBadgeStack>
            <FluxBadge
                v-for="color of colors"
                :key="color"
                :color="color"
                dot
                :label="color"/>
        </FluxBadgeStack>
        <FluxBadgeStack>
            <FluxBadge
                v-for="color of colors"
                :key="color"
                :color="color"
                colored
                icon="circle-check"
                :label="color"/>
        </FluxBadgeStack>
        <FluxTagStack>
            <FluxTag label="Design"/>
            <FluxTag
                color="success"
                icon="circle-check"
                label="Shipped"/>
            <FluxTag
                is-deletable
                label="Draft"/>
        </FluxTagStack>
        <FluxTagStack>
            <FluxTag
                v-for="color of colors"
                :key="color"
                :color="color"
                is-deletable
                :label="color"/>
        </FluxTagStack>
        <FluxBadgeStack>
            <FluxChip
                icon-leading="sparkles"
                label="Chip"/>
            <FluxChip
                icon-leading="check"
                is-selectable
                is-selected
                label="Selected chip"/>
            <FluxChip
                icon-leading="circle-dot"
                is-selectable
                label="Selectable chip"/>
        </FluxBadgeStack>
        <FluxNotice
            color="warning"
            icon="circle-exclamation">
            <p>Heads up: mark an element with <code>data-prose-full</code> and it spans the whole container. Inside a notice, inline <code>code</code> keeps the notice's own styling rather than the prose chip.</p>
        </FluxNotice>
        <p>Notices repeat the intent contract at full width, which makes the tinted surface, the border and the icon color easy to compare.</p>
        <FluxNoticeStack>
            <FluxNotice
                v-for="notice of notices"
                :key="notice.color"
                :color="notice.color"
                :icon="notice.icon"
                is-closeable
                :message="notice.message"
                :title="notice.title"/>
        </FluxNoticeStack>
        <p>Inline information messages use the same intents at a smaller size.</p>
        <FluxPane>
            <FluxPaneBody>
                <FluxInfoStack>
                    <FluxInfo
                        v-for="notice of notices"
                        :key="notice.color"
                        :color="notice.color"
                        :icon="notice.icon">
                        {{ notice.message }}
                    </FluxInfo>
                </FluxInfoStack>
            </FluxPaneBody>
        </FluxPane>
        <p>Spinners and progress bars pick up the intent color on a neutral track.</p>
        <FluxFlex
            :gap="18"
            align="center"
            wrap="wrap">
            <FluxSpinner
                v-for="color of colors"
                :key="color"
                :color="color"
                :size="27"/>
        </FluxFlex>
        <FluxFlex
            :gap="12"
            direction="vertical">
            <FluxProgressBar
                v-for="(color, index) of colors"
                :key="color"
                :color="color"
                :status="color"
                :value="(index + 1) / 7"/>
            <FluxProgressBar
                is-indeterminate
                status="Indeterminate"/>
        </FluxFlex>
        <p>A snackbar is a raised surface with its own shadow. These are rendered in place instead of through the provider, so all six intents can be seen at once.</p>
        <FluxFlex
            :gap="12"
            direction="vertical">
            <FluxSnackbar
                v-for="notice of notices"
                :key="notice.color"
                :color="notice.color"
                :icon="notice.icon"
                is-rendered
                :message="notice.message"
                :title="notice.title"/>
        </FluxFlex>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="circle-arrow-up"
                label="Snackbar"
                @click="onSnackbar"/>
            <FluxSecondaryButton
                icon-leading="circle-info"
                label="Alert"
                @click="onAlert"/>
            <FluxSecondaryButton
                icon-leading="circle-exclamation"
                label="Confirm"
                @click="onConfirm"/>
            <FluxSecondaryButton
                icon-leading="pen"
                label="Prompt"
                @click="onPrompt"/>
        </FluxButtonStack>
        <FluxButtonStack>
            <FluxTooltip content="A tooltip above the button">
                <FluxSecondaryButton
                    icon-leading="circle-question"
                    label="Tooltip, vertical"/>
            </FluxTooltip>
            <FluxTooltip
                content="A tooltip beside the button"
                direction="horizontal">
                <FluxSecondaryButton
                    icon-leading="circle-question"
                    label="Tooltip, horizontal"/>
            </FluxTooltip>
        </FluxButtonStack>

        <h2>Forms</h2>
        <p>Form controls share one input surface, so a change to the well, the border or the focus ring shows up on every field at once. The panes below split them by kind: what is typed, what is picked, what is counted, and the states each of them can end up in.</p>
        <FluxMasonry
            :columns="{xs: 1, sm: 2, xl: 4}"
            data-prose-full
            :gap="24">
            <FluxPane>
                <FluxPaneHeader
                    icon="pen"
                    subtitle="Everything that is typed"
                    title="Text fields"/>
                <FluxForm>
                    <FluxPaneBody>
                        <FluxFormColumn>
                            <FluxFormField label="Full name">
                                <FluxFormInput
                                    v-model="form.name"
                                    auto-complete="name"
                                    placeholder="Ada Lovelace"/>
                            </FluxFormField>

                            <FluxFormField label="Email">
                                <FluxFormInput
                                    v-model="form.email"
                                    auto-complete="email"
                                    icon-leading="envelope"
                                    placeholder="email@example.com"
                                    type="email"/>
                            </FluxFormField>

                            <FluxFormField label="Search">
                                <FluxFormInput
                                    v-model="form.search"
                                    icon-leading="magnifying-glass"
                                    placeholder="Search anything..."
                                    type="search"/>
                            </FluxFormField>

                            <FluxFormField label="Notes">
                                <FluxFormTextArea
                                    v-model="form.notes"
                                    placeholder="Anything worth writing down..."
                                    :rows="3"/>
                            </FluxFormField>
                        </FluxFormColumn>
                    </FluxPaneBody>
                </FluxForm>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="list"
                    subtitle="Everything that opens a flyout"
                    title="Pickers"/>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField label="Country">
                            <FluxFormSelect
                                v-model="form.country"
                                is-searchable
                                :options="countries"
                                placeholder="Select a country..."/>
                        </FluxFormField>

                        <FluxFormField label="Teams">
                            <FluxFormSelect
                                v-model="form.teams"
                                is-multiple
                                :options="teams"
                                placeholder="Select one or more teams..."/>
                        </FluxFormField>

                        <FluxFormField label="City">
                            <FluxFormCombobox
                                v-model="form.city"
                                is-creatable
                                :options="cities"
                                placeholder="Pick or create a city..."/>
                        </FluxFormField>

                        <FluxFormField label="Category">
                            <FluxFormTreeViewSelect
                                v-model="form.category"
                                :level-colors="['primary', 'info', 'success']"
                                :options="treeOptions"
                                placeholder="Select a category..."/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="hashtag"
                    subtitle="Numbers, dates, codes and labels"
                    title="Structured input"/>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField label="Budget">
                            <FluxFormNumberInput
                                v-model="form.budget"
                                :min="0"
                                :step="50"/>
                        </FluxFormField>

                        <FluxFormField label="Start date">
                            <FluxFormDateInput v-model="startDate"/>
                        </FluxFormField>

                        <FluxFormField label="Verification code">
                            <FluxFormPinInput
                                v-model="form.pin"
                                :max-length="6"/>
                        </FluxFormField>

                        <FluxFormField label="Labels">
                            <FluxFormTagsInput
                                v-model="form.tags"
                                placeholder="Add a label..."
                                tag-color="primary"/>
                        </FluxFormField>

                        <FluxFormField label="Quantity">
                            <FluxQuantitySelector
                                v-model="form.quantity"
                                :max="10"
                                :min="1"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="grip"
                    subtitle="Additions attached to a field"
                    title="Input groups"/>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField label="Website">
                            <FluxFormInputGroup>
                                <FluxFormInputAddition label="https://"/>
                                <FluxFormInput
                                    v-model="form.website"
                                    placeholder="example.com"/>
                            </FluxFormInputGroup>
                        </FluxFormField>

                        <FluxFormField label="Amount">
                            <FluxFormInputGroup>
                                <FluxFormInputAddition icon="coin"/>
                                <FluxFormNumberInput
                                    v-model="form.budget"
                                    :min="0"/>
                                <FluxFormInputAddition label="EUR"/>
                            </FluxFormInputGroup>
                        </FluxFormField>

                        <FluxFormField label="Secondary group">
                            <FluxFormInputGroup is-secondary>
                                <FluxFormInputAddition icon="magnifying-glass"/>
                                <FluxFormInput
                                    v-model="form.search"
                                    placeholder="Search..."/>
                            </FluxFormInputGroup>
                        </FluxFormField>

                        <FluxFormField label="Condensed group">
                            <FluxFormInputGroup is-condensed>
                                <FluxFormInputAddition icon="envelope"/>
                                <FluxFormInput
                                    v-model="form.email"
                                    placeholder="email@example.com"/>
                            </FluxFormInputGroup>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="circle-exclamation"
                    subtitle="Error, hint, disabled, readonly and loading"
                    title="Field states"/>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField
                            error="This email address is already in use."
                            label="Invalid">
                            <FluxFormInput
                                error="This email address is already in use."
                                model-value="ada@example.com"/>
                        </FluxFormField>

                        <FluxFormField
                            hint="We only use this to send the receipt."
                            is-optional
                            label="With a hint">
                            <FluxFormInput placeholder="Optional"/>
                        </FluxFormField>

                        <FluxFormField
                            :current-length="form.notes.length"
                            label="With a counter"
                            :max-length="120">
                            <FluxFormTextArea
                                v-model="form.notes"
                                :max-length="120"
                                :rows="2"/>
                        </FluxFormField>

                        <FluxFormField label="Disabled">
                            <FluxFormInput
                                disabled
                                model-value="Cannot be changed"/>
                        </FluxFormField>

                        <FluxFormField label="Readonly">
                            <FluxFormInput
                                is-readonly
                                model-value="Reads as plain text"/>
                        </FluxFormField>

                        <FluxFormField label="Loading">
                            <FluxFormInput
                                is-loading
                                model-value="Checking availability..."/>
                        </FluxFormField>

                        <FluxFormField label="Secondary">
                            <FluxFormInput
                                is-secondary
                                placeholder="On a secondary surface"/>
                        </FluxFormField>

                        <FluxFormField label="Condensed">
                            <FluxFormInput
                                is-condensed
                                placeholder="A smaller field"/>
                        </FluxFormField>

                        <FluxFormField label="Invalid select">
                            <FluxFormSelect
                                v-model="form.country"
                                error="Pick a country."
                                :options="countries"
                                placeholder="Select a country..."/>
                        </FluxFormField>

                        <FluxDisabled disabled>
                            <FluxFormField label="Inside FluxDisabled">
                                <FluxFormInput placeholder="Everything below is disabled"/>
                            </FluxFormField>
                        </FluxDisabled>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="circle-dot"
                    subtitle="Radios, checkboxes and toggles"
                    title="Choices"/>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField
                            as="group"
                            label="Plan">
                            <FluxFormRadioGroup v-model="form.plan">
                                <FluxFormRadio
                                    label="Starter"
                                    sub-label="For a single project"
                                    value="starter"/>
                                <FluxFormRadio
                                    label="Team"
                                    sub-label="Up to ten seats"
                                    value="team"/>
                                <FluxFormRadio
                                    disabled
                                    label="Enterprise"
                                    sub-label="Contact sales"
                                    value="enterprise"/>
                            </FluxFormRadioGroup>
                        </FluxFormField>

                        <FluxFormField
                            as="group"
                            label="Connected radios">
                            <FluxFormRadioGroup
                                v-model="form.plan"
                                is-connected
                                is-inline>
                                <FluxFormRadio
                                    label="Starter"
                                    value="starter"/>
                                <FluxFormRadio
                                    label="Team"
                                    value="team"/>
                                <FluxFormRadio
                                    label="Enterprise"
                                    value="enterprise"/>
                            </FluxFormRadioGroup>
                        </FluxFormField>

                        <FluxFormField
                            as="group"
                            label="Radio tiles">
                            <FluxFormRadioGroup v-model="form.device">
                                <FluxFormRadioTile
                                    icon="laptop"
                                    label="Laptop"
                                    sub-label="Sync on the go"
                                    value="laptop"/>
                                <FluxFormRadioTile
                                    icon="desktop"
                                    label="Desktop"
                                    sub-label="Stays at the office"
                                    value="desktop"/>
                            </FluxFormRadioGroup>
                        </FluxFormField>

                        <FluxFormField
                            as="group"
                            label="Notifications">
                            <FluxFormCheckboxGroup v-model="form.notifications">
                                <FluxFormCheckbox
                                    label="Email"
                                    value="email"/>
                                <FluxFormCheckbox
                                    label="Push"
                                    value="push"/>
                                <FluxFormCheckbox
                                    disabled
                                    label="SMS"
                                    value="sms"/>
                            </FluxFormCheckboxGroup>
                        </FluxFormField>

                        <FluxFormField
                            as="group"
                            label="Checkbox tiles">
                            <FluxFormCheckboxGroup v-model="form.addons">
                                <FluxFormCheckboxTile
                                    icon="database"
                                    label="Backups"
                                    sub-label="Every night"
                                    value="backups"/>
                                <FluxFormCheckboxTile
                                    icon="gauge"
                                    label="Monitoring"
                                    sub-label="With alerting"
                                    value="monitoring"/>
                            </FluxFormCheckboxGroup>
                        </FluxFormField>

                        <FluxFormField label="Indeterminate checkbox">
                            <FluxFormCheckbox
                                v-model="form.indeterminate"
                                label="Some of the items are selected."/>
                        </FluxFormField>

                        <FluxFormField label="Toggles">
                            <FluxFlex :gap="18">
                                <FluxToggle v-model="toggle"/>
                                <FluxToggle
                                    v-model="toggleIcon"
                                    icon-off="xmark"
                                    icon-on="check"/>
                                <FluxToggle
                                    disabled
                                    :model-value="true"/>
                                <FluxToggle
                                    disabled
                                    :model-value="false"/>
                            </FluxFlex>
                        </FluxFormField>

                        <FluxFormField label="Rating">
                            <FluxFormRating
                                v-model="form.rating"
                                allow-half
                                clearable/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="sliders-simple"
                    subtitle="Sliders, faders and colors"
                    title="Ranges"/>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField label="Volume">
                            <FluxFormSlider
                                v-model="form.volume"
                                is-ticks-visible/>
                        </FluxFormField>

                        <FluxFormField label="Price range">
                            <FluxFormRangeSlider v-model="form.priceRange"/>
                        </FluxFormField>

                        <FluxFormField label="Brightness">
                            <FluxFormFader
                                v-model="form.brightness"
                                color="warning"
                                icon-leading="sun"
                                label="Brightness"/>
                        </FluxFormField>

                        <FluxFormField label="Accent">
                            <FluxColorSelect
                                v-model="form.accent"
                                is-custom-allowed/>
                        </FluxFormField>

                        <FluxFormField label="Color picker">
                            <FluxColorPicker
                                v-model="form.color"
                                is-alpha-enabled
                                type="hex"/>
                        </FluxFormField>

                        <FluxFormField label="Ticks">
                            <FluxTicks
                                :lower="0"
                                :upper="100"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="calendar"
                    subtitle="A month at a glance"
                    title="Date picker"/>
                <FluxPaneBody>
                    <FluxDatePicker v-model="pickedDate"/>
                </FluxPaneBody>
            </FluxPane>
        </FluxMasonry>

        <h2>A masonry of panes</h2>
        <p>The masonry below is marked <code>data-prose-full</code>, so it breaks out of the reading measure to span the whole container, while the text keeps its width. Where a grid would leave a gap under every pane that is shorter than its row, the masonry pulls the next pane straight up into it. The price is the reading order: a masonry fills one column top to bottom before it starts the next, so it only suits cards that can be read in any order.</p>
        <FluxMasonry
            :columns="{xs: 1, sm: 2, xl: 4}"
            data-prose-full
            :gap="24">
            <FluxPane>
                <FluxPaneHeader
                    icon="pen"
                    subtitle="Fields, toggles and choices"
                    title="Form"/>
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

            <FluxPane>
                <FluxPaneHeader
                    icon="user"
                    subtitle="People and avatars"
                    title="Persona"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="15"
                        direction="vertical">
                        <FluxPersona
                            :avatar-size="42"
                            avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
                            name="Bas Milius"
                            title="Flux engineer"/>
                        <FluxAvatarGroup :max="4">
                            <FluxAvatar src="https://i.pravatar.cc/64?img=1"/>
                            <FluxAvatar src="https://i.pravatar.cc/64?img=2"/>
                            <FluxAvatar src="https://i.pravatar.cc/64?img=3"/>
                            <FluxAvatar fallback-initials="BM"/>
                            <FluxAvatar fallback-initials="JD"/>
                        </FluxAvatarGroup>
                        <FluxBadgeStack>
                            <FluxChip
                                icon-leading="sparkles"
                                label="New user"/>
                            <FluxChip
                                icon-leading="location-dot"
                                label="Groenlo"/>
                        </FluxBadgeStack>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="cubes"
                    subtitle="A sequence of events"
                    title="Timeline"/>
                <FluxPaneBody>
                    <FluxTimeline>
                        <FluxTimelineItem
                            icon="cubes"
                            title="Project created"
                            when="13 March, 1 PM">
                            A new project was created and the first components were added.
                        </FluxTimelineItem>

                        <FluxTimelineItem
                            photo="https://avatars.githubusercontent.com/u/978257?v=4"
                            title="Bas Milius commented"
                            when="13 March, 1:30 PM">
                            Looks great, let us ship it.
                        </FluxTimelineItem>
                    </FluxTimeline>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="file-lines"
                    subtitle="Key and value pairs"
                    title="Details"/>
                <FluxPaneBody>
                    <FluxDescriptionList title="Invoice detail">
                        <FluxDescriptionItem
                            icon="file-lines"
                            label="Invoice number">
                            9087XY4521
                        </FluxDescriptionItem>

                        <FluxDescriptionItem
                            icon="circle-check"
                            label="Status">
                            <FluxBadge
                                color="success"
                                label="Paid"/>
                        </FluxDescriptionItem>

                        <FluxDescriptionItem
                            icon="arrow-up-right-from-square"
                            label="Portal">
                            <FluxLink
                                href="#"
                                label="View in portal"
                                type="link"/>
                        </FluxDescriptionItem>
                    </FluxDescriptionList>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="folder"
                    subtitle="Nested, expandable options"
                    title="Tree view"/>
                <FluxPaneBody>
                    <FluxTreeView
                        :level-colors="['primary', 'info', 'success']"
                        :options="treeOptions"/>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="pen"
                    subtitle="Progress and inline editing"
                    title="Controls"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="18"
                        direction="vertical">
                        <FluxFormField label="Downloading">
                            <FluxProgressBar
                                status="Flux UI - components"
                                :value="0.75"/>
                        </FluxFormField>

                        <FluxFormField label="Project name">
                            <FluxInlineEdit
                                v-model="inlineValue"
                                placeholder="Click to edit"/>
                        </FluxFormField>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxItemStack>
                    <FluxItem
                        v-for="person in people"
                        :key="person.name">
                        <FluxItemMedia
                            is-center
                            :size="40">
                            <FluxAvatar
                                :alt="person.name"
                                :fallback-icon="person.avatar ? undefined : 'user'"
                                :size="40"
                                :src="person.avatar ?? undefined"/>
                        </FluxItemMedia>

                        <FluxItemContent is-center>
                            <strong>{{ person.name }}</strong>
                            <FluxText
                                color="muted"
                                size="small">{{ person.role }}</FluxText>
                        </FluxItemContent>

                        <FluxItemActions is-center>
                            <FluxAction icon="ellipsis-h"/>
                        </FluxItemActions>
                    </FluxItem>
                </FluxItemStack>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="list"
                    subtitle="Paging through results"
                    title="Pagination"/>
                <FluxPaneBody>
                    <FluxPagination
                        arrows
                        :page="13"
                        :per-page="10"
                        :total="200"/>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSecondaryButton label="Export"/>
                    <FluxSpacer/>
                    <FluxPrimaryButton label="Save"/>
                </FluxPaneFooter>
            </FluxPane>

            <FluxClickablePane type="button">
                <FluxPaneHeader
                    icon="rocket"
                    subtitle="The whole pane reacts to the pointer"
                    title="Clickable pane"/>
                <FluxPaneBody>A clickable pane keeps the pane surface but adds the hover and active states of a button to it.</FluxPaneBody>
            </FluxClickablePane>

            <FluxPane>
                <FluxPaneMedia
                    :aspect-ratio="16 / 9"
                    image-alt=""
                    image-url="/assets/demo/image-2.jpg"/>
                <FluxClickablePaneHeader
                    href="#"
                    icon="image"
                    subtitle="Media above a clickable header"
                    title="Pane media"
                    type="link"/>
                <FluxPaneBody>Media sits flush against the top of the pane and picks up its corner radius.</FluxPaneBody>
            </FluxPane>

            <FluxActionPane>
                <FluxPaneHeader
                    icon="floppy-disk"
                    subtitle="Buttons pinned to the bottom"
                    title="Action pane"/>
                <FluxPaneBody>An action pane keeps its buttons on their own band, separated from the content above them.</FluxPaneBody>

                <template #buttons>
                    <FluxSecondaryButton label="Cancel"/>
                    <FluxPrimaryButton label="Confirm"/>
                </template>
            </FluxActionPane>
        </FluxMasonry>

        <h2>Tables</h2>
        <p>The table below carries everything at once: a sticky header, a sticky footer, a pinned column on both edges, colored rows, a selected row and hover feedback. The border under the header and the seam above the footer are the lines to watch.</p>
        <FluxPane data-prose-full>
            <FluxPaneHeader
                icon="server"
                subtitle="Scroll sideways and down"
                title="Deployments"/>
            <FluxTable
                is-hoverable
                is-sticky
                style="max-height: 402px">
                <template #header>
                    <FluxTableRow>
                        <FluxTableHeader
                            is-sortable
                            :min-width="210"
                            pinned
                            :sort="sort ?? undefined"
                            @sort="sort = $event">
                            Service
                        </FluxTableHeader>

                        <FluxTableHeader :min-width="150">Environment</FluxTableHeader>
                        <FluxTableHeader :min-width="165">Status</FluxTableHeader>

                        <FluxTableHeader
                            data-type="date"
                            is-sortable
                            :min-width="165">
                            Deployed
                        </FluxTableHeader>

                        <FluxTableHeader :min-width="165">Owner</FluxTableHeader>

                        <FluxTableHeader
                            align="end"
                            data-type="numeric"
                            is-numeric
                            :min-width="135">
                            Duration
                        </FluxTableHeader>

                        <FluxTableHeader
                            align="end"
                            is-numeric
                            :min-width="135"
                            pinned="end">
                            Cost
                        </FluxTableHeader>
                    </FluxTableRow>
                </template>

                <FluxTableRow
                    v-for="deployment of deployments"
                    :key="deployment.id"
                    :color="deployment.color"
                    is-clickable
                    :is-selected="deployment.id === selectedDeployment">
                    <FluxTableCell>
                        <strong>{{ deployment.service }}</strong>
                    </FluxTableCell>

                    <FluxTableCell>{{ deployment.environment }}</FluxTableCell>

                    <FluxTableCell>
                        <FluxBadge
                            :color="deployment.color ?? 'gray'"
                            dot
                            :label="deployment.status"/>
                    </FluxTableCell>

                    <FluxTableCell>{{ deployment.deployed }}</FluxTableCell>
                    <FluxTableCell>{{ deployment.owner }}</FluxTableCell>
                    <FluxTableCell>{{ deployment.duration }}</FluxTableCell>
                    <FluxTableCell>{{ formatCurrency(deployment.cost) }}</FluxTableCell>
                </FluxTableRow>

                <template #footer>
                    <FluxTableRow>
                        <FluxTableCell>
                            <strong>Total</strong>
                        </FluxTableCell>

                        <FluxTableCell>{{ deployments.length }} deployments</FluxTableCell>
                        <FluxTableCell>{{ failedCount }} failed</FluxTableCell>
                        <FluxTableCell>Last 24 hours</FluxTableCell>
                        <FluxTableCell>5 owners</FluxTableCell>
                        <FluxTableCell>{{ totalDuration }}</FluxTableCell>

                        <FluxTableCell>
                            <strong>{{ formatCurrency(totalCost) }}</strong>
                        </FluxTableCell>
                    </FluxTableRow>
                </template>
            </FluxTable>
        </FluxPane>
        <p>Rows can also be grouped. The group header is its own band above the rows, and a table bar can sit above the column headers.</p>
        <FluxPane data-prose-full>
            <FluxTable is-hoverable>
                <template #header>
                    <FluxTableBar>
                        <FluxFlex
                            :gap="9"
                            align="center">
                            <FluxIcon name="circle-info"/>
                            <span>The bar sticks to the header while scrolling.</span>
                            <FluxSpacer/>
                            <FluxTableActions>
                                <FluxAction icon="filter"/>
                                <FluxAction icon="arrow-down-to-line"/>
                            </FluxTableActions>
                        </FluxFlex>
                    </FluxTableBar>

                    <FluxTableRow>
                        <FluxTableHeader :min-width="240">Name</FluxTableHeader>
                        <FluxTableHeader :min-width="180">Role</FluxTableHeader>
                        <FluxTableHeader is-shrinking>Access</FluxTableHeader>
                    </FluxTableRow>
                </template>

                <FluxTableGroup
                    v-for="group of teamGroups"
                    :key="group.name"
                    v-model:is-expanded="expandedGroups[group.name]"
                    :icon="group.icon"
                    is-expandable
                    :label="group.name">
                    <template #after>
                        <FluxBadge :label="`${group.members.length}`"/>
                    </template>

                    <FluxTableRow
                        v-for="member of group.members"
                        :key="member.name">
                        <FluxTableCell>{{ member.name }}</FluxTableCell>
                        <FluxTableCell>{{ member.role }}</FluxTableCell>

                        <FluxTableCell>
                            <FluxBadge
                                :color="member.access === 'Owner' ? 'primary' : 'gray'"
                                :label="member.access"/>
                        </FluxTableCell>
                    </FluxTableRow>
                </FluxTableGroup>
            </FluxTable>
        </FluxPane>
        <p>The data table wires the same parts to a data set: selection, colored rows, a pagination bar and an empty state.</p>
        <FluxPane data-prose-full>
            <FluxDataTable
                v-model:selected="selectedInvoices"
                is-hoverable
                :items="invoices"
                :limits="[5, 10, 25]"
                :page="invoicePage"
                :per-page="5"
                :row-color="invoiceColor"
                selection-mode="multiple"
                :total="invoices.length"
                unique-key="id"
                @navigate="invoicePage = $event">
                <template #header>
                    <FluxTableHeader :min-width="150">Number</FluxTableHeader>
                    <FluxTableHeader :min-width="210">Customer</FluxTableHeader>
                    <FluxTableHeader :min-width="150">Status</FluxTableHeader>

                    <FluxTableHeader
                        align="end"
                        is-numeric
                        :min-width="135">
                        Amount
                    </FluxTableHeader>
                </template>

                <template #number="{item}">
                    <FluxTableCell>
                        <strong>{{ item.number }}</strong>
                    </FluxTableCell>
                </template>

                <template #customer="{item}">
                    <FluxTableCell>{{ item.customer }}</FluxTableCell>
                </template>

                <template #status="{item}">
                    <FluxTableCell>
                        <FluxBadge
                            :color="invoiceColor(item) ?? 'gray'"
                            :label="item.status"/>
                    </FluxTableCell>
                </template>

                <template #amount="{item}">
                    <FluxTableCell>{{ formatCurrency(item.amount) }}</FluxTableCell>
                </template>
            </FluxDataTable>
        </FluxPane>

        <h2>Tab bars and segmented controls</h2>
        <p>A tab bar inside a pane sits on a recessed track, so the active tab reads as a raised chip on top of it. The pill variant drops the track and keeps only the chip.</p>
        <div
            :class="$style.cardGrid"
            data-prose-full>
            <FluxPane>
                <FluxTabs v-model="tab">
                    <FluxTab
                        icon="gauge"
                        label="Overview">
                        <FluxPaneBody>The default tab bar in a pane.</FluxPaneBody>
                    </FluxTab>

                    <FluxTab
                        icon="chart-line"
                        label="Activity">
                        <FluxPaneBody>Recent activity for this project.</FluxPaneBody>
                    </FluxTab>

                    <FluxTab
                        icon="gear"
                        label="Settings">
                        <FluxPaneBody>Everything that can be configured.</FluxPaneBody>
                    </FluxTab>
                </FluxTabs>
            </FluxPane>

            <FluxPane>
                <FluxTabs
                    v-model="pillTab"
                    is-pills>
                    <FluxTab label="Day">
                        <FluxPaneBody>The pill variant of the same tab bar.</FluxPaneBody>
                    </FluxTab>

                    <FluxTab label="Week">
                        <FluxPaneBody>One week of data.</FluxPaneBody>
                    </FluxTab>

                    <FluxTab label="Month">
                        <FluxPaneBody>One month of data.</FluxPaneBody>
                    </FluxTab>
                </FluxTabs>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="bars"
                    subtitle="Standalone, outside a pane body"
                    title="Tab bar"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="18"
                        direction="vertical">
                        <FluxTabBar>
                            <FluxTabBarItem
                                icon="house"
                                is-active
                                label="Home"/>
                            <FluxTabBarItem
                                icon="folder"
                                label="Files"/>
                            <FluxTabBarItem
                                disabled
                                icon="lock"
                                label="Locked"/>
                        </FluxTabBar>

                        <FluxTabBar is-pills>
                            <FluxTabBarItem
                                is-active
                                label="All"/>
                            <FluxTabBarItem label="Open"/>
                            <FluxTabBarItem label="Closed"/>
                        </FluxTabBar>

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
                                disabled
                                icon="rectangle-history"
                                label="Stack"
                                value="stack"/>
                        </FluxSegmentedControl>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane variant="well">
                <FluxTabs v-model="wellTab">
                    <FluxTab
                        icon="sun"
                        label="Light">
                        <FluxPaneBody>The same tab bar on a well pane, where its own recessed track has to stay readable against an already recessed surface.</FluxPaneBody>
                    </FluxTab>

                    <FluxTab
                        icon="moon"
                        label="Dark">
                        <FluxPaneBody>Switch the site theme and compare the two tracks again.</FluxPaneBody>
                    </FluxTab>

                    <FluxTab
                        icon="palette"
                        label="Auto">
                        <FluxPaneBody>Follows the operating system.</FluxPaneBody>
                    </FluxTab>
                </FluxTabs>
            </FluxPane>
        </div>

        <h2>Menus and floating surfaces</h2>
        <p>A menu is normally painted on a raised surface inside a flyout. Putting one straight in a pane shows the same thing without having to hold it open, so the item hover, the selected marker and the destructive item can all be read at once. The filter menu carries its search field in a menu pane, which is the one place the arrow keys drive the control instead of the menu's own roving focus.</p>
        <FluxMasonry
            :columns="{xs: 1, sm: 2, xl: 4}"
            data-prose-full
            :gap="24">
            <FluxPane>
                <FluxMenu>
                    <FluxMenuTitle title="Workspace"/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            command="⌘N"
                            icon-leading="file-plus"
                            label="New file"/>
                        <FluxMenuItem
                            command="⌘O"
                            icon-leading="folder"
                            label="Open..."/>
                        <FluxMenuItem
                            icon-leading="clone"
                            is-active
                            label="Active item"/>
                        <FluxMenuItem
                            disabled
                            icon-leading="lock"
                            label="Disabled item"/>
                        <FluxMenuItem
                            icon-leading="rotate"
                            is-loading
                            label="Loading item"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuSubHeader
                        icon-leading="grid-2"
                        label="Layout"/>

                    <FluxMenuOptions
                        v-model="menuView"
                        mode="select">
                        <FluxMenuItem
                            key="list"
                            icon-leading="list"
                            label="List"/>
                        <FluxMenuItem
                            key="grid"
                            icon-leading="grid-2"
                            label="Grid"/>
                    </FluxMenuOptions>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuFlyout
                            icon="arrow-up-from-square"
                            label="Export as">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem label="PDF"/>
                                    <FluxMenuItem label="PNG"/>
                                    <FluxMenuItem label="SVG"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>

                        <FluxMenuFlyout
                            icon="sun"
                            label="Brightness">
                            <FluxMenu>
                                <FluxMenuPane>
                                    <FluxFormSlider
                                        v-model="brightness"
                                        aria-label="Brightness"
                                        is-ticks-visible/>
                                </FluxMenuPane>
                            </FluxMenu>
                        </FluxMenuFlyout>

                        <FluxMenuCollapsible
                            icon-leading="users"
                            label="Members">
                            <FluxMenuItem
                                icon-leading="user"
                                is-indented
                                label="Ada Lovelace"/>
                            <FluxMenuItem
                                icon-leading="user"
                                is-indented
                                label="Grace Hopper"/>
                        </FluxMenuCollapsible>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete workspace"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>

            <FluxPane>
                <FluxMenu>
                    <FluxMenuTitle title="Selectable items"/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            v-for="option of menuOptions"
                            :key="option"
                            is-selectable
                            :is-selected="menuOption === option"
                            :label="option"
                            @click="menuOption = option"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup is-horizontal>
                        <FluxMenuItem icon-leading="scissors"/>
                        <FluxMenuItem icon-leading="copy"/>
                        <FluxMenuItem icon-leading="paste"/>
                        <FluxMenuItem icon-leading="trash"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>

            <FluxPane>
                <FluxMenu>
                    <FluxMenuTitle title="Filter"/>

                    <FluxMenuPane>
                        <FluxFormInput
                            v-model="menuFilter"
                            aria-label="Filter commands"
                            icon-leading="magnifying-glass"
                            placeholder="Filter commands..."
                            type="search"/>
                    </FluxMenuPane>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            v-for="command of filteredMenuCommands"
                            :key="command.label"
                            :icon-leading="command.icon"
                            :label="command.label"/>

                        <FluxMenuSubHeader
                            v-if="filteredMenuCommands.length === 0"
                            label="No matches"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>

            <FluxContextMenu debug-cone>
                <FluxPane>
                    <FluxPaneHeader
                        icon="grip"
                        subtitle="Right click anywhere in this pane"
                        title="Context menu"/>
                    <FluxPaneBody>The menu opens at the cursor on its own raised surface, which is where the hover state has to hold up against the shadow behind it. Submenus draw their prediction cone, so the safe triangle and the pointer are visible while you move.</FluxPaneBody>
                </FluxPane>

                <template #menu="{close}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="arrow-up-right-from-square"
                                label="Open"
                                type="button"
                                @click="close"/>

                            <FluxMenuFlyout
                                icon="image"
                                label="Open With">
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="eye"
                                            label="Preview"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            icon-leading="image"
                                            label="Photos"
                                            type="button"
                                            @click="close"/>
                                    </FluxMenuGroup>

                                    <FluxSeparator/>

                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            label="App Store…"
                                            type="button"
                                            @click="close"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>

                            <FluxMenuItem
                                icon-leading="trash"
                                is-destructive
                                label="Move to Trash"
                                type="button"
                                @click="close"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="circle-info"
                                label="Get Info"
                                type="button"
                                @click="close"/>

                            <FluxMenuItem
                                icon-leading="pen"
                                label="Rename"
                                type="button"
                                @click="close"/>

                            <FluxMenuItem
                                icon-leading="clone"
                                label="Duplicate"
                                type="button"
                                @click="close"/>

                            <FluxMenuItem
                                icon-leading="eye"
                                label="Quick Look"
                                type="button"
                                @click="close"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="copy"
                                label="Copy"
                                type="button"
                                @click="close"/>

                            <FluxMenuFlyout
                                icon="arrow-up-from-square"
                                label="Share">
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="paper-plane"
                                            label="Mail"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            icon-leading="copy"
                                            label="Copy Link"
                                            type="button"
                                            @click="close"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>

                            <FluxMenuFlyout
                                icon="bolt"
                                label="Quick Actions">
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="rotate-left"
                                            label="Rotate Left"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            icon-leading="pen"
                                            label="Markup"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            icon-leading="image"
                                            label="Convert Image"
                                            type="button"
                                            @click="close"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuFlyout
                                icon="palette"
                                label="Tags">
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="circle"
                                            label="Red"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            icon-leading="circle"
                                            label="Orange"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            icon-leading="circle"
                                            label="Green"
                                            type="button"
                                            @click="close"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>

                            <FluxMenuFlyout
                                icon="gear"
                                label="Services">
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            label="Show in Enclosing Folder"
                                            type="button"
                                            @click="close"/>

                                        <FluxMenuItem
                                            label="New Terminal at Folder"
                                            type="button"
                                            @click="close"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxMenuFlyout>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>
            </FluxContextMenu>

            <FluxPane>
                <FluxPaneHeader
                    icon="angles-up-down"
                    subtitle="Open them to see the raised surface"
                    title="Flyouts"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="18"
                        direction="vertical">
                        <FluxFlyout>
                            <template #opener="{toggle}">
                                <FluxSecondaryButton
                                    icon-trailing="angle-down"
                                    label="Open a flyout"
                                    @click="toggle()"/>
                            </template>

                            <template #default>
                                <FluxPaneBody>A flyout renders its own pane above the page.</FluxPaneBody>
                            </template>
                        </FluxFlyout>

                        <FluxFormSelect
                            v-model="form.country"
                            is-searchable
                            :options="countries"
                            placeholder="A select with a flyout..."/>

                        <FluxFormSelect
                            v-model="form.teams"
                            is-multiple
                            :options="teams"
                            placeholder="A multiple select..."/>

                        <FluxBreadcrumb>
                            <FluxBreadcrumbItem
                                href="#"
                                icon="house"
                                label="Home"/>
                            <FluxBreadcrumbFlyout label="Components">
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem label="Buttons"/>
                                        <FluxMenuItem label="Tables"/>
                                        <FluxMenuItem label="Menus"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxBreadcrumbFlyout>
                            <FluxBreadcrumbItem label="Playground"/>
                        </FluxBreadcrumb>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxMasonry>

        <h2>Elevation and shadows</h2>
        <p>Elevation is a level rather than a set of declarations. Sunken is a recessed area inside a surface, surface is a card on the page, and raised is anything floating above it. In light the shadow does the work, in dark the surface lightness does.</p>
        <div
            :class="$style.cardGrid"
            data-prose-full>
            <FluxPane>
                <FluxPaneHeader
                    icon="box"
                    subtitle="The default pane"
                    title="Surface"/>
                <FluxPaneBody>A card sitting on the page background, with a border, a light edge and a small shadow.</FluxPaneBody>
            </FluxPane>

            <FluxPane variant="flat">
                <FluxPaneHeader
                    icon="box"
                    subtitle="Border only, no shadow"
                    title="Flat"/>
                <FluxPaneBody>The flat variant keeps the border but drops the shadow, which is what nested panes use.</FluxPaneBody>
            </FluxPane>

            <FluxPane variant="well">
                <FluxPaneHeader
                    icon="box"
                    subtitle="Recessed into the page"
                    title="Well"/>
                <FluxPaneBody>The well variant reads as a hole in the page rather than a card on top of it.</FluxPaneBody>
            </FluxPane>

            <FluxPaneGroup>
                <FluxPane>
                    <FluxPaneHeader
                        icon="box"
                        subtitle="Panes stacked in a group"
                        title="Pane group"/>
                    <FluxPaneBody>A pane group joins panes into one block, so only the outer edge keeps a border and the seams between them stay hairlines.</FluxPaneBody>
                </FluxPane>

                <FluxPane>
                    <FluxPaneBody>The second pane in the same group.</FluxPaneBody>
                </FluxPane>
            </FluxPaneGroup>
        </div>
        <p>Layer panes wrap a pane in a colored band, which is the widest colored surface in the library and the fastest way to spot a tint that drifted.</p>
        <div
            :class="$style.gridIntents"
            data-prose-full>
            <FluxLayerPane
                v-for="notice of notices"
                :key="notice.color"
                :color="notice.color">
                <FluxPaneHeader
                    :icon="notice.icon"
                    :title="notice.title"/>

                <FluxPane>
                    <FluxPaneBody>{{ notice.message }}</FluxPaneBody>
                </FluxPane>
            </FluxLayerPane>
        </div>
        <p>The raw shadow scale, painted on a raised surface. Every step shares one geometry across both themes and differs only in color.</p>
        <div
            :class="$style.shadows"
            data-prose-full>
            <div
                v-for="shadow of shadows"
                :key="shadow"
                :class="$style.shadow"
                :style="{boxShadow: `var(--shadow-${shadow})`}">
                {{ shadow }}
            </div>
        </div>
        <p>Overlays, slide overs and sheets put the same raised surface above a dimmed page.</p>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="expand"
                label="Open overlay"
                @click="isOverlayOpen = true"/>
            <FluxSecondaryButton
                icon-leading="sidebar-flip"
                label="Open slide over"
                @click="isSlideOverOpen = true"/>
        </FluxButtonStack>
        <FluxOverlay size="medium">
            <FluxPane v-if="isOverlayOpen">
                <FluxPaneHeader
                    icon="expand"
                    subtitle="A pane on a raised surface"
                    title="Overlay"/>
                <FluxPaneBody>
                    <p>An overlay dims the page and lifts a pane above it. The shadow and the dim layer are both theme aware, so this is the place to check that the pane still separates from the backdrop in dark mode.</p>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSpacer/>
                    <FluxSecondaryButton
                        label="Close"
                        @click="isOverlayOpen = false"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxOverlay>
        <FluxSlideOver>
            <FluxPane v-if="isSlideOverOpen">
                <FluxPaneHeader
                    icon="sidebar-flip"
                    subtitle="Anchored to the edge"
                    title="Slide over"/>
                <FluxPaneBody>
                    <p>A slide over uses the same surface, anchored to the edge of the viewport instead of centered.</p>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSpacer/>
                    <FluxSecondaryButton
                        label="Close"
                        @click="isSlideOverOpen = false"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSlideOver>
        <p>A sheet is the same surface with a gesture attached: it hangs off one edge, follows the pointer on a spring, and rests at the sizes it is given. The four buttons below open it from each edge, so the corner radii, the safe area padding and the grabber can be checked on every side. Drag it, flick it away, or use the wheel and the arrow keys to move between its two snap points.</p>
        <FluxButtonStack>
            <FluxSecondaryButton
                v-for="position of sheetPositions"
                :key="position"
                :icon-leading="position === 'bottom' ? 'arrow-up' : position === 'top' ? 'arrow-down' : position === 'left' ? 'arrow-right' : 'arrow-left'"
                :label="`Sheet from the ${position}`"
                @click="openSheet(position)"/>
        </FluxButtonStack>
        <FluxSheet
            is-closeable
            :position="sheetPosition"
            :snap-points="[.45, .9]"
            @close="openedSheet = null">
            <FluxPane v-if="openedSheet === 'snap'">
                <FluxPaneHeader
                    icon="grip"
                    :subtitle="`Anchored to the ${sheetPosition}, resting at 45% and 90%`"
                    title="Sheet"/>
                <FluxPaneBody>
                    <p>The shade behind this sheet is tied to its position: pull it past its smallest snap point and the page shows through, let go and both spring back together. Past the largest snap point the surface stretches against a resistance instead of tearing loose from the edge.</p>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSpacer/>
                    <FluxSecondaryButton
                        label="Close"
                        @click="openedSheet = null"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSheet>
        <p>Without snap points the sheet fits its own content, and a scrolling body hands the gesture back and forth: the list scrolls until it runs out, and from there the same drag moves the sheet.</p>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="rectangle-history"
                label="Fitted sheet"
                @click="openedSheet = 'fitted'"/>
            <FluxSecondaryButton
                icon-leading="list-ul"
                label="Scrolling sheet"
                @click="openedSheet = 'scrolling'"/>
            <FluxSecondaryButton
                icon-leading="lock"
                label="Sheet without a grabber"
                @click="openedSheet = 'static'"/>
        </FluxButtonStack>
        <FluxSheet
            is-closeable
            @close="openedSheet = null">
            <FluxPane v-if="openedSheet === 'fitted'">
                <FluxPaneHeader
                    icon="rectangle-history"
                    subtitle="Sized to its content"
                    title="Fitted sheet"/>
                <FluxItemStack>
                    <FluxItem
                        v-for="target of shareTargets"
                        :key="target.label">
                        <FluxItemMedia is-center>
                            <FluxIcon :name="target.icon"/>
                        </FluxItemMedia>

                        <FluxItemContent is-center>
                            <strong>{{ target.label }}</strong>
                        </FluxItemContent>
                    </FluxItem>
                </FluxItemStack>
                <FluxPaneFooter>
                    <FluxSpacer/>
                    <FluxSecondaryButton
                        label="Cancel"
                        @click="openedSheet = null"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSheet>
        <FluxSheet
            is-closeable
            :snap-points="[.5, .95]"
            @close="openedSheet = null">
            <FluxPane v-if="openedSheet === 'scrolling'">
                <FluxPaneHeader
                    icon="list-ul"
                    subtitle="Drag the list, not just the grabber"
                    title="Scrolling sheet"/>
                <FluxItemStack>
                    <FluxItem
                        v-for="entry of sheetActivity"
                        :key="entry.id">
                        <FluxItemContent>
                            <strong>{{ entry.service }}</strong>
                            <FluxText
                                color="muted"
                                size="small">{{ entry.when }}</FluxText>
                        </FluxItemContent>

                        <FluxItemActions is-center>
                            <FluxBadge
                                :color="entry.color ?? 'gray'"
                                dot
                                :label="entry.status"/>
                        </FluxItemActions>
                    </FluxItem>
                </FluxItemStack>
            </FluxPane>
        </FluxSheet>
        <FluxSheet
            :is-draggable="false"
            @close="openedSheet = null">
            <FluxPane v-if="openedSheet === 'static'">
                <FluxPaneHeader
                    icon="lock"
                    subtitle="No grabber, no gesture"
                    title="Sheet without a grabber"/>
                <FluxPaneBody>
                    <p>With <code>is-draggable</code> off the sheet keeps its position but loses the grabber, the drag and the wheel. It also drops <code>is-closeable</code> here, so neither the escape key nor a click beside it dismisses this one: only the button below does.</p>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSpacer/>
                    <FluxPrimaryButton
                        label="Understood"
                        @click="openedSheet = null"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSheet>

        <h2>Navigation and disclosure</h2>
        <p>Breadcrumbs and expandables help the reader move around and reveal detail on demand.</p>
        <FluxBreadcrumb>
            <FluxBreadcrumbItem
                href="#"
                label="Home"/>
            <FluxBreadcrumbItem
                href="#"
                label="Components"/>
            <FluxBreadcrumbItem label="Playground"/>
        </FluxBreadcrumb>
        <FluxPane>
            <FluxExpandable
                icon="circle-ellipsis"
                label="More options...">
                Everything inside an expandable stays hidden until the reader opens it, which keeps a long page scannable.
            </FluxExpandable>
        </FluxPane>
        <p>An expandable group keeps one item open at a time and draws a divider between them.</p>
        <FluxPane>
            <FluxExpandableGroup>
                <FluxExpandable
                    icon="circle-info"
                    label="What is a design token?">
                    A named value that stands in for a raw color, size or duration, so the same decision can be changed in one place.
                </FluxExpandable>

                <FluxExpandable
                    icon="palette"
                    label="Why two themes?">
                    Light and dark signal elevation differently. Light keeps every level the same color and lets the shadow do the work, dark cannot.
                </FluxExpandable>

                <FluxExpandable
                    icon="circle-question"
                    label="Where do intents come from?">
                    Every component with a color prop resolves it to the same set of intent tokens, which is why they can all be compared side by side.
                </FluxExpandable>
            </FluxExpandableGroup>
        </FluxPane>
        <p>A toolbar sits between the pane header and the pane body on its own band.</p>
        <FluxPane>
            <FluxPaneHeader
                icon="file-lines"
                title="Document"/>
            <FluxToolbar aria-label="Text formatting">
                <FluxToolbarGroup>
                    <FluxAction
                        aria-label="Bold"
                        icon="bold"
                        is-active/>
                    <FluxAction
                        aria-label="Italic"
                        icon="italic"/>
                    <FluxAction
                        aria-label="Underline"
                        icon="underline"/>
                </FluxToolbarGroup>

                <FluxSeparator direction="vertical"/>

                <FluxToolbarGroup>
                    <FluxAction
                        aria-label="Bulleted list"
                        icon="list-ul"/>
                    <FluxAction
                        aria-label="Numbered list"
                        icon="list-ol"/>
                </FluxToolbarGroup>

                <FluxSeparator direction="vertical"/>

                <FluxToolbarGroup>
                    <FluxAction
                        aria-label="Undo"
                        disabled
                        icon="rotate-left"/>
                    <FluxAction
                        aria-label="Redo"
                        icon="rotate"/>
                </FluxToolbarGroup>
            </FluxToolbar>
            <FluxPaneBody>The toolbar band, the header above it and the body below it are three different surfaces stacked on each other.</FluxPaneBody>
        </FluxPane>
        <p>An action bar combines a primary action, a search field and a filter flyout in one row.</p>
        <FluxActionBar>
            <template #primary>
                <FluxPrimaryButton
                    icon-leading="circle-plus"
                    label="New invoice"/>
            </template>

            <template #search>
                <FluxFormInput
                    v-model="search"
                    icon-leading="magnifying-glass"
                    placeholder="Search invoices..."
                    type="search"/>
            </template>

            <template #filterOpener="{open}">
                <FluxSecondaryButton
                    icon-leading="filter"
                    label="Filter"
                    @click="open()"/>
            </template>

            <template #filter>
                <FluxPaneBody>Filter contents live here, on the flyout surface.</FluxPaneBody>
            </template>

            <template #actionsEnd>
                <FluxSecondaryButton
                    icon-leading="arrow-down-to-line"
                    label="Export"/>
            </template>
        </FluxActionBar>
        <p>A filter bar keeps its state in a single object and renders one flyout per filter.</p>
        <FluxFilterBar
            v-model="filterState"
            v-model:search="search"
            is-searchable
            search-placeholder="Search invoices...">
            <FluxFilterOption
                icon="circle-check"
                label="Status"
                name="status"
                :options="[
                    {label: 'Paid', value: 'paid'},
                    {label: 'Open', value: 'open'},
                    {label: 'Overdue', value: 'overdue'}
                ]"/>

            <FluxFilterOptions
                icon="users"
                label="Owner"
                name="owner"
                :options="[
                    {label: 'Ada Lovelace', value: 'ada'},
                    {label: 'Grace Hopper', value: 'grace'},
                    {label: 'Alan Turing', value: 'alan'}
                ]"/>

            <FluxFilterRange
                icon="coin"
                label="Amount"
                :max="10000"
                :min="0"
                name="amount"
                :step="100"/>

            <FluxFilterDate
                icon="calendar"
                label="Issued"
                name="issued"/>
        </FluxFilterBar>
        <p>A pagination bar closes off a list with a page size selector and a page navigator.</p>
        <FluxPane>
            <FluxPaneBody>
                <FluxPaginationBar
                    :limits="[10, 25, 50]"
                    :page="invoicePage"
                    :per-page="10"
                    :total="240"
                    @navigate="invoicePage = $event"/>
            </FluxPaneBody>
        </FluxPane>

        <h2>Data and collections</h2>
        <p>A kanban board stacks cards on a recessed column, which is a second place where the sunken surface has to hold up.</p>
        <FluxKanban data-prose-full>
            <FluxKanbanColumn
                v-for="column of kanbanColumns"
                :key="column.id"
                :column-id="column.id"
                :count="kanbanCards.filter(card => card.columnId === column.id).length"
                :icon="column.icon"
                :label="column.label">
                <FluxKanbanItem
                    v-for="card of kanbanCards.filter(card => card.columnId === column.id)"
                    :key="card.id"
                    :column-id="column.id"
                    :item-id="card.id">
                    <FluxPane variant="flat">
                        <FluxPaneBody>
                            <FluxFlex
                                :gap="9"
                                direction="vertical">
                                <strong>{{ card.title }}</strong>
                                <FluxBadgeStack>
                                    <FluxBadge
                                        :color="card.color"
                                        dot
                                        :label="card.label"/>
                                </FluxBadgeStack>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxKanbanItem>
            </FluxKanbanColumn>
        </FluxKanban>
        <p>The calendar draws a grid of day cells with today highlighted, plus items that carry their own color.</p>
        <div data-prose-full>
            <FluxCalendar :initial-date="anchorDate">
                <template
                    v-for="event of events"
                    :key="event.id">
                    <FluxCalendarItem
                        :date="event.date"
                        :id="event.id">
                        {{ event.label }}
                    </FluxCalendarItem>
                </template>
            </FluxCalendar>
        </div>
        <p>Galleries, comments, drop zones and placeholders round out the collection components.</p>
        <FluxMasonry
            :columns="{xs: 1, sm: 2, xl: 4}"
            data-prose-full
            :gap="24">
            <FluxPane>
                <FluxPaneHeader
                    icon="image"
                    subtitle="Thumbnails on a recessed track"
                    title="Gallery"/>
                <FluxPaneBody>
                    <FluxGallery :items="galleryItems"/>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="message"
                    subtitle="Sent and received bubbles"
                    title="Comments"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="15"
                        direction="vertical">
                        <FluxComment
                            avatar-fallback="neutral"
                            avatar-fallback-icon="robot"
                            is-received
                            posted-by="Assistant"
                            :posted-on="commentTime">
                            The color tokens have been regenerated for both themes.
                        </FluxComment>

                        <FluxComment
                            avatar-fallback-initials="AL"
                            posted-by="Ada Lovelace"
                            :posted-on="commentTime">
                            Looks good. The header border still reads a little weak to me.
                        </FluxComment>

                        <FluxComment
                            avatar-fallback="neutral"
                            avatar-fallback-icon="robot"
                            is-received
                            is-typing
                            posted-by="Assistant"/>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="upload"
                    subtitle="Dashed border and an empty state"
                    title="Drop zone"/>
                <FluxPaneBody>
                    <FluxDropZone>
                        <FluxPlaceholder
                            icon="square-dashed"
                            message="Drop your files here to upload them..."
                            style="width: 100%">
                            <FluxSecondaryButton
                                icon-leading="upload"
                                label="Upload"/>
                        </FluxPlaceholder>
                    </FluxDropZone>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="files"
                    subtitle="Three variants of the same empty state"
                    title="Placeholder"/>
                <FluxPaneBody>
                    <FluxFlex
                        :gap="18"
                        direction="vertical">
                        <FluxPlaceholder
                            icon="files"
                            message="Add your first invoice to get started."
                            title="No invoices"
                            variant="extended">
                            <FluxSecondaryButton label="Add invoice"/>
                        </FluxPlaceholder>

                        <FluxSeparator/>

                        <FluxPlaceholder
                            icon="box-archive"
                            message="Nothing has been archived yet."
                            variant="simple"/>

                        <FluxSeparator/>

                        <FluxPlaceholder
                            icon="magnifying-glass"
                            message="No results."
                            variant="small"/>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxMasonry>
        <p>The command palette lives on the same raised surface as a menu. Press <kbd>Cmd</kbd> + <kbd>K</kbd> or use the button.</p>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="magnifying-glass"
                label="Open command palette"
                @click="commandPalette?.open()"/>
        </FluxButtonStack>
        <FluxCommandPalette
            ref="commandPalette"
            has-keyboard-shortcut
            placeholder="Type a command or search..."
            :sources="commandSources"/>

        <h2>Primitives</h2>
        <p>The smallest building blocks: boxed icons, dividers and loading skeletons.</p>
        <FluxFlex :gap="15">
            <FluxBoxedIcon
                name="circle-check"
                :size="60"/>
            <FluxBoxedIcon
                name="lock"
                :size="60"/>
            <FluxBoxedIcon
                name="rocket"
                :size="60"/>
            <FluxBoxedIcon
                name="bolt"
                :size="60"/>
        </FluxFlex>
        <p>The boxed icon takes an intent, and so does the icon itself.</p>
        <FluxFlex
            :gap="15"
            wrap="wrap">
            <FluxBoxedIcon
                v-for="color of colors"
                :key="color"
                :color="color"
                name="bolt"
                :size="48"/>
        </FluxFlex>
        <FluxFlex
            :gap="15"
            wrap="wrap">
            <FluxBoxedIcon
                v-for="color of colors"
                :key="color"
                :color="color"
                name="heart"
                rounded
                :size="48"/>
        </FluxFlex>
        <FluxFlex
            :gap="18"
            align="center"
            wrap="wrap">
            <FluxIcon
                v-for="color of colors"
                :key="color"
                :color="color"
                name="star"
                :size="24"/>
        </FluxFlex>
        <p>Avatars fall back to initials or an icon, and can carry a status dot in any intent.</p>
        <FluxFlex
            :gap="15"
            align="center"
            wrap="wrap">
            <FluxAvatar
                :size="42"
                src="https://avatars.githubusercontent.com/u/978257?v=4"/>
            <FluxAvatar
                fallback-initials="AL"
                :size="42"/>
            <FluxAvatar
                fallback="neutral"
                fallback-icon="user"
                :size="42"/>
            <FluxAvatar
                is-loading
                :size="42"/>
            <FluxAvatar
                v-for="color of colors"
                :key="color"
                fallback-initials="BM"
                :size="42"
                :status="color"
                status-icon="check"/>
        </FluxFlex>
        <p>Dividers and separators split content, with or without something in the middle.</p>
        <FluxPane>
            <FluxPaneBody>
                <FluxDivider>Centered</FluxDivider>
                <FluxDivider content-placement="start">
                    <FluxIcon name="bolt"/>
                </FluxDivider>
                <FluxDivider content-placement="end">
                    <FluxSecondaryButton
                        icon-leading="plus"
                        label="Add"/>
                </FluxDivider>
                <FluxSeparator/>
            </FluxPaneBody>
        </FluxPane>
        <p>Skeletons stand in for content that has not arrived yet.</p>
        <FluxFlex
            :gap="15"
            style="width: 100%">
            <FluxSkeleton
                :height="48"
                :width="48"
                variant="circle"/>
            <FluxFlex
                :gap="6"
                direction="vertical"
                style="flex: 1">
                <FluxSkeleton width="55%"/>
                <FluxSkeleton/>
                <FluxSkeleton width="80%"/>
            </FluxFlex>
        </FluxFlex>
        <FluxFlex
            :gap="15"
            wrap="wrap">
            <FluxSkeleton
                :height="60"
                variant="rectangle"
                :width="120"/>
            <FluxSkeleton
                :height="60"
                variant="rounded"
                :width="120"/>
            <FluxSkeleton
                :height="60"
                variant="circle"
                :width="60"/>
        </FluxFlex>
        <p>A pane can show its own loader on top of whatever it holds.</p>
        <FluxPane is-loading>
            <FluxPaneHeader
                icon="hourglass-clock"
                subtitle="The loader covers the pane"
                title="Loading"/>
            <FluxPaneBody>This text sits behind the loading layer, which is a translucent copy of the pane surface.</FluxPaneBody>
        </FluxPane>

        <h2>Application shell</h2>
        <p>The shell from <code>@flux-ui/application</code>, embedded in a 600px frame rather than the viewport it normally fills. The rail sits on <code>--surface-canvas</code> and the top bar on the page, so this is where the two page level neutrals have to hold apart. Use the toggle in the top bar to switch the rail between collapsed and expanded.</p>
        <ApplicationDemo/>

        <Patterns/>

        <h2>Typography</h2>
        <p>Back in the prose flow, the text scale, lists, quotes, code and tables all come from <code>FluxProse</code>.</p>
        <p>Text itself has a scale and a set of colors of its own.</p>
        <FluxFlex
            :gap="6"
            direction="vertical">
            <FluxText size="display">Display text</FluxText>
            <FluxText size="large">Large text</FluxText>
            <FluxText>Medium text</FluxText>
            <FluxText size="small">Small text</FluxText>
            <FluxText color="prominent">Prominent</FluxText>
            <FluxText color="muted">Muted</FluxText>
            <FluxText
                v-for="color of colors"
                :key="color"
                :color="color">{{ color }}</FluxText>
        </FluxFlex>

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

        <pre><code>import { FluxProse } from '@flux-ui/components';

const article = FluxProse;</code></pre>

        <p>A table can break out to a wider track when the data needs the room:</p>
        <table data-prose-wide>
            <thead>
                <tr>
                    <th>Element</th>
                    <th>Size</th>
                    <th>Line height</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Heading 1</td>
                    <td>27px</td>
                    <td>42px</td>
                    <td>Page title</td>
                </tr>
                <tr>
                    <td>Heading 2</td>
                    <td>21px</td>
                    <td>33px</td>
                    <td>Section heading</td>
                </tr>
                <tr>
                    <td>Body</td>
                    <td>15px</td>
                    <td>24px</td>
                    <td>Paragraphs and lists</td>
                </tr>
            </tbody>
        </table>

        <p>And imagery breaks out just the same, giving the eye a place to rest.</p>
        <img
            alt=""
            data-prose-wide
            src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
    </FluxProse>

    <!-- Outside the prose container on purpose: its `container-type` would become
         the containing block and the fixed launcher would scroll away. -->
    <PaletteSwitcher/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxActionBar, FluxActionPane, FluxActionStack, FluxAvatar, FluxAvatarGroup, FluxBadge, FluxBadgeStack, FluxBoxedIcon, FluxBreadcrumb, FluxBreadcrumbFlyout, FluxBreadcrumbItem, FluxButtonGroup, FluxButtonStack, FluxCalendar, FluxCalendarItem, FluxChip, FluxClickablePane, FluxClickablePaneHeader, FluxColorPicker, FluxColorSelect, FluxCommandPalette, FluxComment, FluxContextMenu, FluxDataTable, FluxDatePicker, FluxDescriptionItem, FluxDescriptionList, FluxDestructiveButton, FluxDisabled, FluxDivider, FluxDropZone, FluxExpandable, FluxExpandableGroup, FluxFilterBar, FluxFilterDate, FluxFilterOption, FluxFilterOptions, FluxFilterRange, FluxFlex, FluxFlyout, FluxForm, FluxFormCheckbox, FluxFormCheckboxGroup, FluxFormCheckboxTile, FluxFormColumn, FluxFormCombobox, FluxFormDateInput, FluxFormFader, FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxFormNumberInput, FluxFormPinInput, FluxFormRadio, FluxFormRadioGroup, FluxFormRadioTile, FluxFormRangeSlider, FluxFormRating, FluxFormSelect, FluxFormSlider, FluxFormTagsInput, FluxFormTextArea, FluxFormTreeViewSelect, FluxGallery, FluxIcon, FluxInfo, FluxInfoStack, FluxInlineEdit, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxKanban, FluxKanbanColumn, FluxKanbanItem, FluxLayerPane, FluxLink, FluxMasonry, FluxMenu, FluxMenuCollapsible, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuOptions, FluxMenuPane, FluxMenuSubHeader, FluxMenuTitle, FluxNotice, FluxNoticeStack, FluxOverlay, FluxPagination, FluxPaginationBar, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneGroup, FluxPaneHeader, FluxPaneMedia, FluxPersona, FluxPlaceholder, FluxPrimaryButton, FluxProgressBar, FluxProse, FluxPublishButton, FluxQuantitySelector, FluxSecondaryButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator, FluxSheet, FluxSkeleton, FluxSlideOver, FluxSnackbar, FluxSpacer, FluxSpinner, FluxSplitButton, FluxStepper, FluxStepperStep, FluxTab, FluxTabBar, FluxTabBarItem, FluxTable, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableGroup, FluxTableHeader, FluxTableRow, FluxTabs, FluxTag, FluxTagStack, FluxText, FluxTicks, FluxTimeline, FluxTimelineItem, FluxToggle, FluxToolbar, FluxToolbarGroup, FluxTooltip, FluxTreeView, showAlert, showConfirm, showPrompt, showSnackbar } from '@flux-ui/components';
    import type { FluxColor, FluxCommandSource, FluxFilterState, FluxFormSelectOption, FluxIconName, FluxTreeViewOption } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, reactive, ref, useTemplateRef } from 'vue';
    import ApplicationDemo from './playground/ApplicationDemo.vue';
    import PaletteSwitcher from './playground/PaletteSwitcher.vue';
    import Patterns from './playground/Patterns.vue';

    type OpenedSheet = 'fitted' | 'scrolling' | 'snap' | 'static' | null;
    type SheetPosition = 'bottom' | 'left' | 'right' | 'top';

    type Deployment = {
        readonly id: number;
        readonly service: string;
        readonly environment: string;
        readonly status: string;
        readonly color?: FluxColor;
        readonly deployed: string;
        readonly owner: string;
        readonly duration: string;
        readonly cost: number;
    };

    type Invoice = {
        readonly id: number;
        readonly number: string;
        readonly customer: string;
        readonly status: string;
        readonly amount: number;
    };

    const colors: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
    const shadows = ['px', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const sheetPositions: SheetPosition[] = ['bottom', 'left', 'right', 'top'];

    const shareTargets: { icon: FluxIconName; label: string }[] = [
        {icon: 'copy', label: 'Copy link'},
        {icon: 'envelope', label: 'Send as email'},
        {icon: 'message', label: 'Share in chat'}
    ];

    const notices: { color: FluxColor; icon: FluxIconName; title: string; message: string }[] = [
        {color: 'gray', icon: 'circle-info', title: 'Neutral', message: 'A neutral message without any urgency attached to it.'},
        {color: 'primary', icon: 'sparkles', title: 'Primary', message: 'The brand intent, used for anything the product wants to promote.'},
        {color: 'danger', icon: 'circle-exclamation', title: 'Danger', message: 'Something failed and needs attention before it can continue.'},
        {color: 'info', icon: 'circle-info', title: 'Info', message: 'Background information that helps but never blocks.'},
        {color: 'success', icon: 'circle-check', title: 'Success', message: 'The operation finished and everything is in order.'},
        {color: 'warning', icon: 'hourglass-clock', title: 'Warning', message: 'This will keep working for now, but it will not forever.'}
    ];

    const menuOptions = ['First option', 'Second option', 'Third option'];

    const menuCommands: { readonly icon: FluxIconName; readonly label: string; }[] = [
        {icon: 'file-plus', label: 'New file'},
        {icon: 'folder', label: 'Open folder'},
        {icon: 'clone', label: 'Duplicate'},
        {icon: 'pen', label: 'Rename'},
        {icon: 'users', label: 'Invite members'},
        {icon: 'gear', label: 'Settings'}
    ];

    const countries: FluxFormSelectOption[] = [
        {label: 'Belgium', value: 'be'},
        {label: 'Germany', value: 'de'},
        {label: 'Netherlands', value: 'nl'},
        {label: 'Sweden', value: 'se'},
        {label: 'United Kingdom', value: 'uk'}
    ];

    const cities: FluxFormSelectOption[] = [
        {label: 'Amsterdam', value: 'ams'},
        {label: 'Berlin', value: 'ber'},
        {label: 'Ghent', value: 'gnt'},
        {label: 'Stockholm', value: 'sto'}
    ];

    const teams: FluxFormSelectOption[] = [
        {icon: 'palette', label: 'Design', value: 'design'},
        {icon: 'code-branch', label: 'Engineering', value: 'engineering'},
        {icon: 'message', label: 'Support', value: 'support'}
    ];

    const people = [
        {name: 'Bas Milius', role: 'Engineer', avatar: 'https://avatars.githubusercontent.com/u/978257?v=4'},
        {name: 'Jane Doe', role: 'Designer', avatar: null},
        {name: 'John Doe', role: 'Product manager', avatar: null}
    ];

    const treeOptions: FluxTreeViewOption[] = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                {
                    id: 2,
                    label: 'Computers',
                    children: [
                        {id: 3, label: 'Laptops'},
                        {id: 4, label: 'Desktops'}
                    ]
                },
                {id: 5, label: 'Phones'}
            ]
        },
        {
            id: 6,
            label: 'Clothing',
            children: [
                {id: 7, label: 'Men'},
                {id: 8, label: 'Women'}
            ]
        }
    ];

    const deployments: Deployment[] = [
        {id: 1, service: 'api-gateway', environment: 'production', status: 'Live', color: 'success', deployed: '12 Mar, 09:14', owner: 'Ada Lovelace', duration: '2m 41s', cost: 128},
        {id: 2, service: 'billing-worker', environment: 'production', status: 'Degraded', color: 'warning', deployed: '12 Mar, 08:52', owner: 'Alan Turing', duration: '4m 03s', cost: 96},
        {id: 3, service: 'web-frontend', environment: 'production', status: 'Live', deployed: '12 Mar, 08:40', owner: 'Grace Hopper', duration: '1m 55s', cost: 212},
        {id: 4, service: 'search-index', environment: 'staging', status: 'Failed', color: 'danger', deployed: '12 Mar, 08:12', owner: 'Katherine Blake', duration: '0m 38s', cost: 34},
        {id: 5, service: 'image-resizer', environment: 'staging', status: 'Building', color: 'info', deployed: '12 Mar, 07:59', owner: 'Ada Lovelace', duration: '3m 12s', cost: 47},
        {id: 6, service: 'mail-relay', environment: 'production', status: 'Live', color: 'success', deployed: '11 Mar, 22:31', owner: 'Alan Turing', duration: '1m 09s', cost: 18},
        {id: 7, service: 'auth-service', environment: 'production', status: 'Queued', color: 'primary', deployed: '11 Mar, 21:44', owner: 'Grace Hopper', duration: '0m 00s', cost: 0},
        {id: 8, service: 'report-runner', environment: 'sandbox', status: 'Live', deployed: '11 Mar, 20:05', owner: 'Katherine Blake', duration: '6m 27s', cost: 73},
        {id: 9, service: 'event-bus', environment: 'production', status: 'Live', deployed: '11 Mar, 19:18', owner: 'Ada Lovelace', duration: '2m 02s', cost: 154},
        {id: 10, service: 'cdn-purge', environment: 'production', status: 'Live', deployed: '11 Mar, 18:47', owner: 'Milan Rooij', duration: '0m 44s', cost: 12}
    ];

    // Long enough that the sheet's body scrolls at both of its snap points, which is what
    // makes the handoff between scrolling and dragging visible.
    const sheetActivity = Array.from({length: 24}, (_, index) => {
        const deployment = deployments[index % deployments.length];

        return {
            id: index,
            color: deployment.color,
            service: deployment.service,
            status: deployment.status,
            when: `${28 - index} Feb, ${String(9 + index % 9).padStart(2, '0')}:${String(index * 7 % 60).padStart(2, '0')}`
        };
    });

    const invoices: Invoice[] = [
        {id: 1, number: 'INV-2024-001', customer: 'Northwind Studio', status: 'Paid', amount: 1240},
        {id: 2, number: 'INV-2024-002', customer: 'Harbour Collective', status: 'Open', amount: 3180},
        {id: 3, number: 'INV-2024-003', customer: 'Meridian Labs', status: 'Overdue', amount: 940},
        {id: 4, number: 'INV-2024-004', customer: 'Alder & Finch', status: 'Paid', amount: 2260},
        {id: 5, number: 'INV-2024-005', customer: 'Sable Works', status: 'Draft', amount: 610}
    ];

    const teamGroups: { name: string; icon: FluxIconName; members: { name: string; role: string; access: string }[] }[] = [
        {
            name: 'Engineering',
            icon: 'code-branch',
            members: [
                {name: 'Ada Lovelace', role: 'Lead engineer', access: 'Owner'},
                {name: 'Alan Turing', role: 'Engineer', access: 'Member'},
                {name: 'Milan Rooij', role: 'Engineer', access: 'Member'}
            ]
        },
        {
            name: 'Design',
            icon: 'palette',
            members: [
                {name: 'Grace Hopper', role: 'Product designer', access: 'Owner'},
                {name: 'Ines Faber', role: 'Designer', access: 'Member'}
            ]
        },
        {
            name: 'Support',
            icon: 'message',
            members: [
                {name: 'Katherine Blake', role: 'Support lead', access: 'Member'}
            ]
        }
    ];

    const kanbanColumns: { id: string; icon: FluxIconName; label: string }[] = [
        {id: 'todo', icon: 'list', label: 'To do'},
        {id: 'doing', icon: 'bolt', label: 'In progress'},
        {id: 'done', icon: 'circle-check', label: 'Done'}
    ];

    const kanbanCards: { id: number; columnId: string; title: string; color: FluxColor; label: string }[] = [
        {id: 1, columnId: 'todo', title: 'Audit the palette scales', color: 'danger', label: 'High'},
        {id: 2, columnId: 'todo', title: 'Write the token reference', color: 'warning', label: 'Medium'},
        {id: 3, columnId: 'todo', title: 'Check the focus ring', color: 'gray', label: 'Low'},
        {id: 4, columnId: 'doing', title: 'Rework the table header border', color: 'danger', label: 'High'},
        {id: 5, columnId: 'doing', title: 'Soften the button inner line', color: 'info', label: 'In review'},
        {id: 6, columnId: 'done', title: 'Split the token files', color: 'success', label: 'Done'},
        {id: 7, columnId: 'done', title: 'Add the elevation mixin', color: 'success', label: 'Done'}
    ];

    const galleryItems = [
        '/assets/demo/image-1.jpg',
        '/assets/demo/image-2.jpg',
        '/assets/demo/image-3.jpg',
        '/assets/demo/image-4.jpg',
        '/assets/demo/image-5.jpg'
    ];

    const anchorDate = DateTime.now().startOf('month').plus({days: 9});
    const commentTime = DateTime.now().minus({minutes: 12});

    const events = [
        {id: 1, date: anchorDate, label: 'Stand-up'},
        {id: 2, date: anchorDate, label: 'Token review'},
        {id: 3, date: anchorDate.plus({days: 1}), label: 'Pair programming'},
        {id: 4, date: anchorDate.plus({days: 2}), label: 'Design critique'},
        {id: 5, date: anchorDate.plus({days: 4}), label: 'Demo'},
        {id: 6, date: anchorDate.plus({days: 4}), label: 'Retrospective'},
        {id: 7, date: anchorDate.plus({days: 7}), label: 'Release'}
    ];

    const commandSources: FluxCommandSource[] = [
        {
            key: 'navigation',
            label: '',
            items: [
                {id: 'dashboard', label: 'Dashboard', icon: 'grid-2', onActivate: () => onCommand('Dashboard')},
                {id: 'invoices', label: 'Invoices', icon: 'file-lines', onActivate: () => onCommand('Invoices')},
                {id: 'members', label: 'Members', icon: 'users', onActivate: () => onCommand('Members')}
            ]
        },
        {
            key: 'actions',
            label: 'Actions',
            tab: true,
            items: [
                {id: 'theme', label: 'Toggle dark mode', icon: 'moon', command: '⌘D', onActivate: () => onCommand('Toggle dark mode')},
                {id: 'logout', label: 'Log out', icon: 'arrow-right-from-bracket', onActivate: () => onCommand('Log out')}
            ]
        }
    ];

    const step = ref(0);
    const tab = ref(0);
    const pillTab = ref(0);
    const wellTab = ref(0);
    const toggle = ref(true);
    const toggleIcon = ref(false);
    const view = ref('grid');
    const inlineValue = ref('Project Apollo');
    const isPublished = ref(false);
    const isOverlayOpen = ref(false);
    const isSlideOverOpen = ref(false);
    const openedSheet = ref<OpenedSheet>(null);
    const sheetPosition = ref<SheetPosition>('bottom');
    const brightness = ref(60);
    const menuFilter = ref('');
    const menuOption = ref('Second option');
    const menuView = ref('grid');
    const search = ref('');
    const sort = ref<'ascending' | 'descending' | null>('ascending');
    const selectedDeployment = ref(3);
    const selectedInvoices = ref<number[]>([2]);
    const invoicePage = ref(1);
    const commandPalette = useTemplateRef<InstanceType<typeof FluxCommandPalette>>('commandPalette');
    const startDate = ref<DateTime | null>(DateTime.now());
    const pickedDate = ref<DateTime | DateTime[] | null>(DateTime.now());

    const form = reactive({
        accent: '#4f46e5',
        addons: ['backups'] as string[],
        brightness: 65,
        budget: 1250 as number | null,
        category: 3 as number | null,
        city: 'ams' as string | number | null,
        color: '#4f46e5',
        country: 'nl' as string | number | null,
        device: 'laptop',
        email: 'ada@example.com',
        indeterminate: null as boolean | null,
        name: 'Ada Lovelace',
        notes: 'A short note that stays well under the counter limit.',
        notifications: ['email'] as string[],
        pin: '1234',
        plan: 'team',
        priceRange: [20, 80] as [number, number],
        quantity: 3,
        rating: 3.5 as number | null,
        search: '',
        tags: ['design', 'tokens'] as string[],
        teams: ['design'] as (string | number | null)[],
        volume: 40,
        website: 'flux-ui.dev'
    });

    const filterState = ref<FluxFilterState>({
        amount: null,
        issued: null,
        owner: null,
        status: null
    });

    const expandedGroups = reactive<Record<string, boolean>>({
        Design: true,
        Engineering: true,
        Support: false
    });

    const filteredMenuCommands = computed(() => menuCommands.filter(command => command.label.toLowerCase().includes(menuFilter.value.toLowerCase())));
    const failedCount = computed(() => deployments.filter(deployment => deployment.status === 'Failed').length);
    const totalCost = computed(() => deployments.reduce((total, deployment) => total + deployment.cost, 0));

    const totalDuration = computed(() => {
        const seconds = deployments.reduce((total, deployment) => {
            const [minutes, remainder] = deployment.duration.split(' ');

            return total + Number.parseInt(minutes, 10) * 60 + Number.parseInt(remainder, 10);
        }, 0);

        return `${Math.floor(seconds / 60)}m ${`${seconds % 60}`.padStart(2, '0')}s`;
    });

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            style: 'currency'
        }).format(value);
    }

    function invoiceColor(invoice: Invoice): FluxColor | undefined {
        switch (invoice.status) {
            case 'Paid':
                return 'success';

            case 'Overdue':
                return 'danger';

            case 'Open':
                return 'info';

            default:
                return undefined;
        }
    }

    function onCommand(label: string): void {
        showSnackbar({
            icon: 'circle-check',
            message: `Activated: ${label}`
        });
    }

    function openSheet(position: SheetPosition): void {
        sheetPosition.value = position;
        openedSheet.value = 'snap';
    }

    function onSnackbar(): void {
        showSnackbar({
            icon: 'circle-check',
            message: 'Your changes have been saved.'
        });
    }

    async function onAlert(): Promise<void> {
        await showAlert({
            icon: 'circle-info',
            title: 'Heads up',
            message: 'The color tokens were regenerated for both themes.'
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

    async function onPrompt(): Promise<void> {
        const result = await showPrompt({
            icon: 'pen',
            title: 'Rename project',
            message: 'Pick a new name for this project.',
            fieldLabel: 'Project name',
            fieldPlaceholder: 'Project Apollo'
        });

        showSnackbar({
            icon: result ? 'circle-check' : 'xmark',
            message: result ? `Renamed to ${result}.` : 'Cancelled.'
        });
    }
</script>

<style
    lang="scss"
    module>
    .componentsPlayground {
        container: playground / inline-size;
        padding-block: 60px;
        max-width: 1800px;
        margin-inline: auto;
    }

    .componentsPlayground > :global([data-prose-full]) {
        margin-inline: 30px;
    }

    // Fixed column counts rather than `auto-fill`, so a card is the same width in
    // every section of the page.
    .cardGrid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 24px;
        align-items: start;
    }

    @container playground (width < 1320px) {
        .cardGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .cardGrid {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .gridIntents {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        align-items: start;
    }

    @container playground (width < 1008px) {
        .gridIntents {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .gridIntents {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .shadows {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 24px;
    }

    @container playground (width < 690px) {
        .shadows {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .shadow {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90px;
        font-size: 13px;
        background: var(--surface-raised);
        background-clip: padding-box;
        border: 1px solid var(--surface-stroke-out);
        border-radius: var(--radius);
        color: var(--foreground-secondary);
    }
</style>
