<template>
    <FluxProse
        :class="$style.playground"
        container
        tag="article">
        <h1>Flux playground</h1>
        <p>This whole page is a single <code>FluxProse</code> container. The headings, paragraphs, lists and tables sit at a readable measure and flow in the prose rhythm, while Flux components are dropped straight in between them. No wrappers, no resets: prose only styles its own HTML elements, so every component keeps its own look and still lines up in the vertical rhythm.</p>
        <p>Use it to eyeball how the pieces look together and how the light element defaults and the rich prose styling coexist on one page.</p>

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
        <FluxTagStack>
            <FluxTag label="Design"/>
            <FluxTag
                color="success"
                icon="check-circle"
                label="Shipped"/>
            <FluxTag
                is-deletable
                label="Draft"/>
        </FluxTagStack>
        <FluxNotice
            color="warning"
            icon="circle-exclamation"
            message="Please note that this is a warning message rendered inside the prose flow."/>
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

        <h2>A grid of panes</h2>
        <p>The grid below is marked <code>data-prose-full</code>, so it breaks out of the reading measure to span the whole container, while the text keeps its width.</p>
        <div
            :class="$style.grid"
            data-prose-full>
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
            </FluxPane>
        </div>

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

        <h2>Typography</h2>
        <p>Back in the prose flow, the text scale, lists, quotes, code and tables all come from <code>FluxProse</code>. Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open a command palette.</p>

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
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxAvatarGroup, FluxBadge, FluxBadgeStack, FluxBoxedIcon, FluxBreadcrumb, FluxBreadcrumbItem, FluxButtonStack, FluxChip, FluxDescriptionItem, FluxDescriptionList, FluxDestructiveButton, FluxExpandable, FluxFlex, FluxForm, FluxFormCheckbox, FluxFormColumn, FluxFormField, FluxFormInput, FluxInlineEdit, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLink, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxNotice, FluxPagination, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPersona, FluxPrimaryButton, FluxProgressBar, FluxProse, FluxSecondaryButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator, FluxSkeleton, FluxSplitButton, FluxStepper, FluxStepperStep, FluxTab, FluxTabs, FluxTag, FluxTagStack, FluxText, FluxTimeline, FluxTimelineItem, FluxToggle, FluxTooltip, FluxTreeView, showConfirm, showSnackbar } from '@flux-ui/components';
    import type { FluxTreeViewOption } from '@flux-ui/types';
    import { ref } from 'vue';

    const step = ref(0);
    const toggle = ref(true);
    const toggleIcon = ref(false);
    const view = ref('grid');
    const inlineValue = ref('Project Apollo');

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
        padding-block: 60px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        align-items: start;
    }
</style>
