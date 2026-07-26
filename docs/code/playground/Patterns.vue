<template>
    <h2>Application patterns</h2>
    <p>Everything above this point shows components on their own. These sections show the arrangements two production applications built on Flux write over and over: a list screen, a detail screen, a form, a confirmation, an empty state. Each block is the full composition rather than a trimmed one, because that is where the tokens actually have to hold up. A badge inside a table cell inside a pane, a destructive button next to a primary one in a footer, a muted label above a value that is missing: none of those are visible in a single component demo.</p>
    <p>All of it is one imaginary back office for work orders, so the same record travels from the list to the detail pane to the form.</p>

    <h3>The list screen</h3>
    <p>The table is not wrapped in a pane. It fills the content area itself, and the filter bar lives inside the table, in its <code>filter</code> slot, wrapped in a <code>FluxTableBar</code> so it scrolls with the header. The primary action sits at the end of that same bar. Pagination is never written by hand: give <code>FluxDataTable</code> a <code>page</code>, a <code>perPage</code>, a <code>total</code> and a set of <code>limits</code> and it renders the bar itself. The last column is a shrinking header with no label, holding the row actions.</p>
    <FluxSegmentedControl v-model="listState">
        <FluxSegmentedControlItem
            label="Rows"
            value="rows"/>

        <FluxSegmentedControlItem
            label="Loading"
            value="loading"/>

        <FluxSegmentedControlItem
            label="No results"
            value="empty"/>
    </FluxSegmentedControl>
    <FluxDataTable
        data-prose-full
        is-filled
        is-hoverable
        :is-loading="listState === 'loading'"
        is-sticky
        :items="listState === 'empty' ? [] : workOrders"
        :limits="[5, 10, 25]"
        :page="page"
        :per-page="5"
        :row-color="rowColor"
        :total="listState === 'empty' ? 0 : workOrders.length"
        unique-key="id"
        @navigate="page = $event">
        <template #filter>
            <FluxTableBar>
                <FluxFilterBar
                    v-model="filters"
                    v-model:search="search"
                    is-searchable
                    search-placeholder="Search work orders...">
                    <FluxFilterOption
                        icon="circle-dot"
                        label="Status"
                        name="status"
                        :options="statusFilterOptions"/>

                    <FluxFilterOptions
                        icon="users"
                        label="Team"
                        name="team"
                        :options="teamFilterOptions"/>

                    <FluxFilterDateRange
                        icon="calendar"
                        label="Due between"
                        name="due"/>

                    <template #end>
                        <FluxPrimaryButton
                            icon-leading="circle-plus"
                            label="New work order"/>
                    </template>
                </FluxFilterBar>
            </FluxTableBar>
        </template>

        <template #header>
            <FluxTableHeader
                is-sortable
                :min-width="270"
                :sort="sort ?? undefined"
                @sort="sort = $event">
                Work order
            </FluxTableHeader>

            <FluxTableHeader :min-width="180">Site</FluxTableHeader>
            <FluxTableHeader is-shrinking>Status</FluxTableHeader>
            <FluxTableHeader :min-width="150">Team</FluxTableHeader>

            <FluxTableHeader
                data-type="date"
                is-sortable
                :min-width="150">
                Due
            </FluxTableHeader>

            <FluxTableHeader
                align="end"
                is-numeric
                is-shrinking>
                Hours
            </FluxTableHeader>

            <FluxTableHeader is-shrinking/>
        </template>

        <template #reference="{item}">
            <FluxTableCell content-direction="column">
                <strong>{{ item.reference }}</strong>
                <small>{{ item.summary }}</small>
            </FluxTableCell>
        </template>

        <template #site="{item}">
            <FluxTableCell>{{ item.site }}</FluxTableCell>
        </template>

        <template #status="{item}">
            <FluxTableCell>
                <FluxBadge
                    :color="STATUS_COLOR[item.status]"
                    :icon="STATUS_ICON[item.status]"
                    :label="STATUS_LABEL[item.status]"/>
            </FluxTableCell>
        </template>

        <template #team="{item}">
            <FluxTableCell>{{ item.team }}</FluxTableCell>
        </template>

        <template #due="{item}">
            <FluxTableCell>{{ item.due }}</FluxTableCell>
        </template>

        <template #hours="{item}">
            <FluxTableCell is-numeric>{{ item.hours }}</FluxTableCell>
        </template>

        <template #actions="{item}">
            <FluxTableCell>
                <FluxTableActions>
                    <FluxTooltip content="Edit">
                        <FluxAction icon="pen"/>
                    </FluxTooltip>

                    <FluxTooltip content="Delete">
                        <FluxAction
                            icon="trash"
                            is-destructive
                            @click="remove(item)"/>
                    </FluxTooltip>

                    <FluxFlyout>
                        <template #opener="{open}">
                            <FluxAction
                                icon="ellipsis-h"
                                @click="open()"/>
                        </template>

                        <template #default="{close}">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="clone"
                                        label="Duplicate"
                                        @click="close()"/>

                                    <FluxMenuItem
                                        icon-leading="arrow-down-to-line"
                                        label="Export as PDF"
                                        @click="close()"/>
                                </FluxMenuGroup>

                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="box-archive"
                                        is-destructive
                                        label="Archive"
                                        @click="close()"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </template>
                    </FluxFlyout>
                </FluxTableActions>
            </FluxTableCell>
        </template>

        <template #empty>
            <div :class="$style.emptyView">
                <FluxBoxedIcon
                    :class="$style.emptyViewIcon"
                    color="primary"
                    name="magnifying-glass"
                    :size="48"/>

                <h3>No work orders found</h3>
                <p>Nothing matches the current filters. Widen the date range or clear the status filter to see more.</p>
            </div>
        </template>
    </FluxDataTable>
    <p>The row action group is the same three pieces every time: a tooltip around an action for the two operations that deserve their own button, then a flyout with a menu for everything else. Both applications wrap every single <code>FluxAction</code> in a <code>FluxTooltip</code>, which is why an icon only button never appears bare in this sheet either.</p>

    <h3>Nothing to show</h3>
    <p>An empty table is not one state but three, and only the first of them is really empty. Filtering down to zero rows needs different words than a table that has never had a row, and a screen the user may not open at all needs a third. Both applications write the same block by hand: a boxed icon in the brand color, a heading, one sentence and an optional action, centered in whatever container it lands in.</p>
    <FluxStatisticsGrid
        data-prose-full
        :md="2"
        :lg="3">
        <FluxPane>
            <div :class="$style.emptyView">
                <FluxBoxedIcon
                    :class="$style.emptyViewIcon"
                    color="primary"
                    name="clipboard"
                    :size="48"/>

                <h3>No work orders yet</h3>
                <p>Work orders appear here as soon as a site reports one.</p>

                <div :class="$style.emptyViewEnd">
                    <FluxPrimaryButton
                        icon-leading="circle-plus"
                        label="New work order"/>
                </div>
            </div>
        </FluxPane>

        <FluxPane>
            <div :class="$style.emptyView">
                <FluxBoxedIcon
                    :class="$style.emptyViewIcon"
                    color="primary"
                    name="lock"
                    :size="48"/>

                <h3>No access</h3>
                <p>You do not have permission to view work orders for this site.</p>

                <div :class="$style.emptyViewEnd">
                    <FluxSecondaryButton
                        icon-leading="angle-left"
                        label="Back to overview"/>
                </div>
            </div>
        </FluxPane>

        <FluxPane>
            <FluxPaneBody>
                <FluxPlaceholder
                    icon="square-dashed"
                    message="The library component, for comparison. Neither application reaches for it, because it has no boxed icon, no slot for an action and no way to span a table grid."
                    title="FluxPlaceholder"
                    variant="extended"/>
            </FluxPaneBody>
        </FluxPane>
    </FluxStatisticsGrid>

    <h3>The detail screen</h3>
    <p>A record opens as a pane, not as a page. The title lives in the pane header, never above it. The status goes in the header's <code>before</code> slot so it reads before the title, the actions go in <code>after</code>, and the close button is always last. A tab bar sits directly under the header, outside the body, and carries a count badge per tab. The footer repeats the closing action and holds the record level actions, with destructive ones before the primary.</p>
    <FluxPane data-prose-full>
        <FluxPaneHeader
            subtitle="North depot, reported on 4 March"
            title="WO-2481 Replace lighting in the north hall">
            <template #before>
                <FluxTooltip :content="STATUS_LABEL[detail.status]">
                    <FluxIcon
                        :color="STATUS_COLOR[detail.status]"
                        :name="STATUS_ICON[detail.status]"
                        :size="20"/>
                </FluxTooltip>
            </template>

            <template #after>
                <FluxBadge
                    color="warning"
                    icon="hourglass-clock"
                    label="Due in 3 days"/>

                <FluxTooltip content="More">
                    <FluxAction icon="ellipsis-h"/>
                </FluxTooltip>

                <FluxSecondaryButton
                    icon-leading="xmark"
                    size="small"/>
            </template>
        </FluxPaneHeader>

        <FluxTabBar>
            <FluxTabBarItem
                icon="circle-info"
                is-active
                label="Summary"/>

            <FluxTabBarItem
                icon="clipboard"
                label="Tasks">
                <template #end>
                    <FluxBadge
                        color="gray"
                        label="7"/>
                </template>
            </FluxTabBarItem>

            <FluxTabBarItem
                icon="paper-plane"
                label="Messages">
                <template #end>
                    <FluxBadge
                        color="gray"
                        label="2"/>
                </template>
            </FluxTabBarItem>

            <FluxTabBarItem
                icon="file-lines"
                label="Documents"/>

            <FluxTabBarItem
                icon="clock-rotate-left"
                label="History"/>
        </FluxTabBar>

        <FluxPaneBody>
            <FluxFormGrid>
                <FluxFormField label="Reference">
                    <FluxText>WO-2481</FluxText>
                </FluxFormField>

                <FluxFormField label="Status">
                    <FluxBadge
                        :color="STATUS_COLOR[detail.status]"
                        :icon="STATUS_ICON[detail.status]"
                        :label="STATUS_LABEL[detail.status]"/>
                </FluxFormField>

                <FluxFormField label="Priority">
                    <FluxBadge
                        color="danger"
                        dot
                        label="High"/>
                </FluxFormField>

                <FluxFormField label="Site">
                    <FluxText>North depot</FluxText>
                    <FluxText
                        color="muted"
                        size="small">
                        Building B, floor 2
                    </FluxText>
                </FluxFormField>

                <FluxFormField label="Team">
                    <FluxText>Facilities</FluxText>
                </FluxFormField>

                <FluxFormField label="Estimated hours">
                    <FluxText tabular>6.0</FluxText>
                </FluxFormField>

                <FluxFormField label="Contact">
                    <FluxText color="muted">{{ EMPTY }}</FluxText>
                </FluxFormField>

                <FluxFormField label="Purchase order">
                    <FluxText color="muted">{{ EMPTY }}</FluxText>
                </FluxFormField>

                <FluxFormField label="Approved by">
                    <FluxText>Facilities lead</FluxText>
                </FluxFormField>
            </FluxFormGrid>
        </FluxPaneBody>

        <FluxPaneBody>
            <FluxDescriptionList title="Schedule">
                <FluxDescriptionItem
                    icon="calendar"
                    label="Reported">
                    4 March 2026
                </FluxDescriptionItem>

                <FluxDescriptionItem
                    icon="hourglass-clock"
                    label="Due">
                    12 March 2026
                </FluxDescriptionItem>

                <FluxDescriptionItem
                    icon="stopwatch"
                    label="Time logged">
                    4 hours 20 minutes
                </FluxDescriptionItem>

                <FluxDescriptionItem
                    icon="circle-check"
                    label="Completed">
                    <FluxText color="muted">{{ EMPTY }}</FluxText>
                </FluxDescriptionItem>
            </FluxDescriptionList>
        </FluxPaneBody>

        <FluxPaneFooter>
            <FluxSecondaryButton
                icon-leading="arrow-down-to-line"
                label="Export"/>

            <FluxSpacer/>

            <FluxDestructiveButton
                icon-leading="ban"
                label="Reject"
                @click="reject()"/>

            <FluxPrimaryButton
                icon-leading="circle-check"
                label="Approve"
                @click="approve()"/>
        </FluxPaneFooter>
    </FluxPane>
    <p>A value that is missing is not left blank. Both applications render a dash in the muted foreground, so a field that has never been filled in still occupies its row and never reads as a rendering failure.</p>

    <h3>Section cards</h3>
    <p>Content inside a detail screen is grouped in a card whose header sits on the layer behind the body. That is two panes nested: a <code>FluxLayerPane</code> holds the header, and a plain <code>FluxPane</code> inside it holds the content. When the card is a shortcut to a fuller screen, the header becomes a <code>FluxClickablePaneHeader</code> and the whole strip turns into the link.</p>
    <FluxStatisticsGrid
        data-prose-full
        :md="2">
        <FluxLayerPane>
            <FluxPaneHeader
                icon="location-dot"
                subtitle="Where the work happens"
                title="Site">
                <template #after>
                    <FluxTooltip content="Edit">
                        <FluxAction icon="pen"/>
                    </FluxTooltip>
                </template>
            </FluxPaneHeader>

            <FluxPane>
                <FluxPaneBody>
                    <FluxDescriptionList>
                        <FluxDescriptionItem
                            is-stacked
                            label="Address">
                            <FluxFlex
                                direction="vertical"
                                :gap="0">
                                <FluxText>Depot road 14</FluxText>
                                <FluxText>1234 AB, Riverside</FluxText>
                            </FluxFlex>
                        </FluxDescriptionItem>

                        <FluxDescriptionItem
                            is-stacked
                            label="Telephone">
                            <FluxText color="muted">{{ EMPTY }}</FluxText>
                        </FluxDescriptionItem>

                        <FluxDescriptionItem
                            is-stacked
                            label="Opening hours">
                            Weekdays, 07:00 to 17:00
                        </FluxDescriptionItem>
                    </FluxDescriptionList>
                </FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane>
            <FluxClickablePaneHeader
                icon="users"
                subtitle="3 members on this order"
                title="Team"/>

            <FluxPane>
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="12">
                        <FluxItem
                            v-for="member of team"
                            :key="member.name">
                            <FluxItemMedia>
                                <FluxAvatar
                                    :fallback-initials="member.initials"
                                    :size="36"
                                    :status="member.status"/>
                            </FluxItemMedia>

                            <FluxItemContent>
                                <strong>{{ member.name }}</strong>
                                <small>{{ member.role }}</small>
                            </FluxItemContent>

                            <FluxItemActions>
                                <FluxTooltip content="Message">
                                    <FluxAction icon="paper-plane"/>
                                </FluxTooltip>
                            </FluxItemActions>
                        </FluxItem>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>
    </FluxStatisticsGrid>
    <p>The same card, stripped to an icon, a title, a sentence and a chevron, is how a dashboard offers a set of destinations. Both applications reach for the statistics grid here rather than a plain grid, because it is the only responsive grid in the library that takes a column count per breakpoint.</p>
    <FluxStatisticsGrid
        data-prose-full
        :md="2"
        :lg="3">
        <FluxClickablePane
            v-for="destination of destinations"
            :key="destination.title"
            :disabled="destination.disabled"
            variant="flat">
            <FluxItem>
                <FluxItemMedia>
                    <FluxBoxedIcon
                        color="primary"
                        :name="destination.icon"/>
                </FluxItemMedia>

                <FluxItemContent>
                    <strong>{{ destination.title }}</strong>
                    <p>{{ destination.description }}</p>
                </FluxItemContent>

                <FluxItemActions>
                    <FluxIcon name="angle-right"/>
                </FluxItemActions>
            </FluxItem>
        </FluxClickablePane>
    </FluxStatisticsGrid>

    <h3>The form screen</h3>
    <p>A form is a pane with a <code>FluxForm</code> wrapped around the header, the body and the footer, so the submit button in the footer still submits. Fields stack in a <code>FluxFormColumn</code>, pairs sit side by side in a <code>FluxFormRow</code>, and a second body separates a group of settings from the record itself. The error summary is the first child of the column, above every field.</p>
    <p>The footer order never varies: a spacer pushes everything to the end, then cancel, then submit. The submit button is disabled while the form is invalid, carries <code>circle-check</code> and is the only primary button on the screen.</p>
    <FluxPane data-prose-full>
        <FluxForm @submit="save()">
            <FluxPaneHeader
                icon="screwdriver-wrench"
                title="New work order"/>

            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxNoticeStack>
                        <FluxNotice
                            color="danger"
                            icon="circle-exclamation"
                            is-closeable
                            message="Two fields need attention before this work order can be saved."
                            title="Could not save"/>

                        <FluxNotice
                            color="info"
                            icon="circle-info"
                            message="Work orders are visible to every member of the assigned team."/>
                    </FluxNoticeStack>

                    <FluxFormField
                        :current-length="form.summary.length"
                        label="Summary"
                        :max-length="120">
                        <FluxFormInput
                            v-model="form.summary"
                            :max-length="120"
                            placeholder="Describe the work in one line"/>
                    </FluxFormField>

                    <FluxFormRow>
                        <FluxFormField label="Site">
                            <FluxFormSelect
                                v-model="form.site"
                                is-searchable
                                :options="siteOptions"
                                placeholder="Pick a site"/>
                        </FluxFormField>

                        <FluxFormField label="Team">
                            <FluxFormSelect
                                v-model="form.team"
                                :options="teamOptions"/>
                        </FluxFormField>
                    </FluxFormRow>

                    <FluxFormRow>
                        <FluxFormField
                            error="Pick a date that is not in the past."
                            label="Due date">
                            <FluxFormDateInput
                                v-model="form.due"
                                error="Pick a date that is not in the past."/>
                        </FluxFormField>

                        <FluxFormField
                            hint="Used to plan the week, not to bill."
                            label="Estimated hours">
                            <FluxFormNumberInput
                                v-model="form.hours"
                                :min="0"
                                :step="0.5"/>
                        </FluxFormField>
                    </FluxFormRow>

                    <FluxFormField
                        hint="Anything the team should read before starting."
                        is-optional
                        label="Instructions">
                        <FluxFormTextArea
                            v-model="form.instructions"
                            :rows="4"/>
                    </FluxFormField>
                </FluxFormColumn>
            </FluxPaneBody>

            <FluxPaneGroup>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField
                            hint="The team is told as soon as the order is saved."
                            label="Notify the team">
                            <FluxToggle v-model="form.notify"/>
                        </FluxFormField>

                        <FluxFormField
                            error="A recurring order needs an interval."
                            label="Repeat">
                            <FluxFormSelect
                                v-model="form.repeat"
                                error="A recurring order needs an interval."
                                :options="repeatOptions"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPaneGroup>

            <FluxPaneFooter>
                <FluxFlexItem>
                    <FluxBadge
                        color="warning"
                        icon="circle-exclamation"
                        label="Unsaved changes"/>
                </FluxFlexItem>

                <FluxSpacer/>

                <FluxSecondaryButton label="Cancel"/>

                <FluxPrimaryButton
                    icon-leading="circle-check"
                    is-submit
                    :is-loading="isSaving"
                    label="Create work order"/>
            </FluxPaneFooter>
        </FluxForm>
    </FluxPane>

    <h3>Confirming and destroying</h3>
    <p>Neither application ever builds its own dialog. A destructive action is a <code>showConfirm</code> with an icon, a title and a message, an early return when it is declined, and a snackbar afterwards: success in green with <code>circle-check</code>, failure in red. The confirm dialog has no destructive variant and no custom button labels, so the icon carries the entire warning and the confirm button stays primary.</p>
    <FluxButtonStack>
        <FluxSecondaryButton
            icon-leading="box-archive"
            label="Archive"
            @click="archive()"/>

        <FluxDestructiveButton
            icon-leading="trash"
            label="Delete work order"
            @click="remove(workOrders[0])"/>
    </FluxButtonStack>
    <p>Irreversible settings live at the bottom of a form screen, behind a divider, in a section of their own. The heading and the sentence carry the warning, and the button is the only destructive element on the page.</p>
    <FluxPane data-prose-full>
        <FluxPaneBody>
            <FluxFormSection title="General">
                <FluxFormField label="Work order template">
                    <FluxFormSelect
                        v-model="form.template"
                        :options="templateOptions"/>
                </FluxFormField>
            </FluxFormSection>

            <FluxDivider/>

            <FluxFormSection title="Danger zone">
                <p>Deleting a work order removes its tasks, messages and logged hours as well. This cannot be undone.</p>

                <FluxDestructiveButton
                    icon-leading="trash"
                    :is-loading="isRemoving"
                    label="Delete work order"
                    @click="remove(workOrders[0])"/>
            </FluxFormSection>
        </FluxPaneBody>
    </FluxPane>

    <h3>The status vocabulary</h3>
    <p>Both applications land on the same reading of the six intents, and both write it as two records, one from status to color and one from status to icon, rather than as a chain of conditions in a template. The badge is used wherever there is room for a word; where a column is too narrow for one, the same two records feed a tooltipped icon instead.</p>
    <FluxPane data-prose-full>
        <FluxTable is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="150">Intent</FluxTableHeader>
                <FluxTableHeader :min-width="180">Badge</FluxTableHeader>
                <FluxTableHeader is-shrinking>Icon</FluxTableHeader>
                <FluxTableHeader :min-width="330">Reads as</FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="entry of vocabulary"
                :key="entry.color">
                <FluxTableCell>
                    <code>{{ entry.color }}</code>
                </FluxTableCell>

                <FluxTableCell>
                    <FluxBadge
                        :color="entry.color"
                        :icon="entry.icon"
                        :label="entry.label"/>
                </FluxTableCell>

                <FluxTableCell>
                    <FluxTooltip :content="entry.label">
                        <FluxIcon
                            :color="entry.color"
                            :name="entry.icon"
                            :size="20"/>
                    </FluxTooltip>
                </FluxTableCell>

                <FluxTableCell>{{ entry.meaning }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
    <p>Colors that come from the data rather than from a meaning are the one place this breaks down. A label picked by a user is an arbitrary hue, and a badge only takes one of the six intents, so both applications mix the hue into the <code>--intent-*</code> properties a colored badge styles against and hand those to it as an inline style. It works, but it writes to a contract the library fills through a mixin and treats as internal, so this is the one pattern on this page that a future version could break. A badge that accepts a color of its own is the real fix.</p>
    <FluxBadgeStack>
        <FluxBadge
            v-for="label of labels"
            :key="label.name"
            colored
            :label="label.name"
            :style="customBadgeColor(label.color)"/>

        <FluxBadge
            color="gray"
            label="+3"/>
    </FluxBadgeStack>

    <h3>Key figures</h3>
    <p>A dashboard opens with a row of figures above everything else: a title, one large value, and a change against the previous period in green or red. Below it the same grid carries meters, which are the one component that shows a ratio without a chart engine behind it.</p>
    <FluxStatisticsGrid
        data-prose-full
        :sm="2"
        :lg="4">
        <FluxStatisticsKpi
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.4%'}"
            footer="vs. last month"
            icon="clipboard"
            title="Work orders"
            value="1,284"/>

        <FluxStatisticsKpi
            :change="{color: 'danger', icon: 'arrow-trend-down', value: '-3.1%'}"
            footer="vs. last month"
            icon="circle-check"
            title="Completed on time"
            value="87.2%"/>

        <FluxStatisticsKpi
            footer="across 14 sites"
            icon="stopwatch"
            title="Average lead time"
            value="4.6 days"/>

        <FluxStatisticsKpi
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+8.0%'}"
            footer="vs. last month"
            icon="money-bill"
            title="Cost per order"
            value="184.50"/>
    </FluxStatisticsGrid>
    <FluxStatisticsGrid
        data-prose-full
        :sm="2"
        :lg="3">
        <FluxStatisticsMeter
            icon="circle-check"
            sub-title="of 1,284 orders"
            title="Completed"
            :value="0.872"/>

        <FluxStatisticsMeter
            icon="hourglass-clock"
            sub-title="waiting on approval"
            title="Pending"
            :value="0.094"
            variant="blocks"/>

        <FluxStatisticsMeter
            icon="circle-xmark"
            sub-title="rejected this month"
            title="Rejected"
            :value="0.034"/>
    </FluxStatisticsGrid>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxAvatar, FluxBadge, FluxBadgeStack, FluxBoxedIcon, FluxButtonStack, FluxClickablePane, FluxClickablePaneHeader, FluxDataTable, FluxDescriptionItem, FluxDescriptionList, FluxDestructiveButton, FluxDivider, FluxFilterBar, FluxFilterDateRange, FluxFilterOption, FluxFilterOptions, FluxFlex, FluxFlexItem, FluxFlyout, FluxForm, FluxFormColumn, FluxFormDateInput, FluxFormField, FluxFormGrid, FluxFormInput, FluxFormNumberInput, FluxFormRow, FluxFormSection, FluxFormSelect, FluxFormTextArea, FluxIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxLayerPane, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxNotice, FluxNoticeStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneGroup, FluxPaneHeader, FluxPlaceholder, FluxPrimaryButton, FluxSecondaryButton, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator, FluxSpacer, FluxTabBar, FluxTabBarItem, FluxTable, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTableRow, FluxText, FluxToggle, FluxTooltip, showConfirm, showSnackbar } from '@flux-ui/components';
    import { FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsMeter } from '@flux-ui/statistics';
    import type { FluxColor, FluxFilterOptionRow, FluxFilterState, FluxFormSelectOption, FluxIconName } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { reactive, ref } from 'vue';

    type WorkOrderStatus = 'draft' | 'open' | 'pending' | 'completed' | 'rejected';

    type WorkOrder = {
        readonly id: number;
        readonly reference: string;
        readonly summary: string;
        readonly site: string;
        readonly status: WorkOrderStatus;
        readonly team: string;
        readonly due: string;
        readonly hours: number;
    };

    // A dash rather than an empty cell. Both applications render one in the muted
    // foreground for a value that was never filled in, so a field keeps its row and
    // an unfilled record never reads as a rendering failure.
    const EMPTY = '-';

    const STATUS_COLOR: Record<WorkOrderStatus, FluxColor> = {
        draft: 'gray',
        open: 'info',
        pending: 'warning',
        completed: 'success',
        rejected: 'danger'
    };

    const STATUS_ICON: Record<WorkOrderStatus, FluxIconName> = {
        draft: 'circle-dot',
        open: 'circle-info',
        pending: 'hourglass-clock',
        completed: 'circle-check',
        rejected: 'circle-xmark'
    };

    const STATUS_LABEL: Record<WorkOrderStatus, string> = {
        draft: 'Draft',
        open: 'Open',
        pending: 'Pending',
        completed: 'Completed',
        rejected: 'Rejected'
    };

    const workOrders: WorkOrder[] = [
        {id: 1, reference: 'WO-2481', summary: 'Replace lighting in the north hall', site: 'North depot', status: 'pending', team: 'Facilities', due: '12 Mar 2026', hours: 6},
        {id: 2, reference: 'WO-2480', summary: 'Quarterly inspection of the loading dock', site: 'Riverside yard', status: 'completed', team: 'Grounds', due: '9 Mar 2026', hours: 3},
        {id: 3, reference: 'WO-2479', summary: 'Repair the roller shutter at gate 4', site: 'Riverside yard', status: 'open', team: 'Facilities', due: '14 Mar 2026', hours: 8},
        {id: 4, reference: 'WO-2478', summary: 'Calibrate the weighbridge sensors', site: 'South terminal', status: 'rejected', team: 'Logistics', due: '6 Mar 2026', hours: 2},
        {id: 5, reference: 'WO-2477', summary: 'Repaint the pedestrian walkway', site: 'North depot', status: 'draft', team: 'Grounds', due: '20 Mar 2026', hours: 12},
        {id: 6, reference: 'WO-2476', summary: 'Service the forklift charging bay', site: 'South terminal', status: 'completed', team: 'Logistics', due: '2 Mar 2026', hours: 5},
        {id: 7, reference: 'WO-2475', summary: 'Replace the door closer at reception', site: 'Head office', status: 'open', team: 'Facilities', due: '18 Mar 2026', hours: 1},
        {id: 8, reference: 'WO-2474', summary: 'Clear the drainage grid behind block C', site: 'Riverside yard', status: 'pending', team: 'Grounds', due: '16 Mar 2026', hours: 4}
    ];

    const vocabulary: { color: FluxColor; icon: FluxIconName; label: string; meaning: string }[] = [
        {color: 'gray', icon: 'circle-dot', label: 'Draft', meaning: 'Neutral, archived, concluded or not started yet.'},
        {color: 'primary', icon: 'sparkles', label: 'Featured', meaning: 'Brand emphasis only, never a state of the record.'},
        {color: 'info', icon: 'circle-info', label: 'Open', meaning: 'In progress, awaiting a first action, or purely informational.'},
        {color: 'success', icon: 'circle-check', label: 'Completed', meaning: 'Finished, approved, paid or valid.'},
        {color: 'warning', icon: 'hourglass-clock', label: 'Pending', meaning: 'Waiting, cancelled, refunded or holding unsaved changes.'},
        {color: 'danger', icon: 'circle-xmark', label: 'Rejected', meaning: 'Failed, denied, expired or otherwise blocking.'}
    ];

    const team = [
        {name: 'A. Vermeer', initials: 'AV', role: 'Site engineer', status: 'success' as FluxColor},
        {name: 'K. Doorn', initials: 'KD', role: 'Electrician', status: 'warning' as FluxColor},
        {name: 'M. Halsema', initials: 'MH', role: 'Planner', status: 'gray' as FluxColor}
    ];

    const destinations: { icon: FluxIconName; title: string; description: string; disabled?: boolean }[] = [
        {icon: 'clipboard', title: 'Work orders', description: 'Everything reported across all sites, with the full filter set.'},
        {icon: 'location-dot', title: 'Sites', description: 'Locations, contacts and opening hours per site.'},
        {icon: 'users', title: 'Teams', description: 'Who is on which team and what they are allowed to approve.'},
        {icon: 'chart-line', title: 'Reporting', description: 'Lead times, cost per order and completion rates.'},
        {icon: 'receipt', title: 'Invoicing', description: 'Hours logged against each order, ready to be billed.', disabled: true},
        {icon: 'gear', title: 'Settings', description: 'Templates, approval thresholds and notification rules.'}
    ];

    const labels = [
        {name: 'Urgent', color: '#e11d48'},
        {name: 'Outsourced', color: '#0891b2'},
        {name: 'Warranty', color: '#7c3aed'}
    ];

    const statusFilterOptions: FluxFilterOptionRow[] = [
        {icon: 'circle-dot', label: 'Draft', value: 'draft'},
        {icon: 'circle-info', label: 'Open', value: 'open'},
        {icon: 'hourglass-clock', label: 'Pending', value: 'pending'},
        {icon: 'circle-check', label: 'Completed', value: 'completed'},
        {icon: 'circle-xmark', label: 'Rejected', value: 'rejected'}
    ];

    const teamFilterOptions: FluxFilterOptionRow[] = [
        {label: 'Facilities', value: 'facilities'},
        {label: 'Grounds', value: 'grounds'},
        {label: 'Logistics', value: 'logistics'}
    ];

    const siteOptions: FluxFormSelectOption[] = [
        {icon: 'location-dot', label: 'Head office', value: 'head-office'},
        {icon: 'location-dot', label: 'North depot', value: 'north-depot'},
        {icon: 'location-dot', label: 'Riverside yard', value: 'riverside-yard'},
        {icon: 'location-dot', label: 'South terminal', value: 'south-terminal'}
    ];

    const teamOptions: FluxFormSelectOption[] = [
        {label: 'Facilities', value: 'facilities'},
        {label: 'Grounds', value: 'grounds'},
        {label: 'Logistics', value: 'logistics'}
    ];

    const repeatOptions: FluxFormSelectOption[] = [
        {label: 'Does not repeat', value: 'none'},
        {label: 'Every week', value: 'weekly'},
        {label: 'Every month', value: 'monthly'},
        {label: 'Every quarter', value: 'quarterly'}
    ];

    const templateOptions: FluxFormSelectOption[] = [
        {label: 'No template', value: 'none'},
        {label: 'Inspection', value: 'inspection'},
        {label: 'Repair', value: 'repair'}
    ];

    const detail = {status: 'pending' as WorkOrderStatus};

    const isRemoving = ref(false);
    const isSaving = ref(false);
    const listState = ref<string | number>('rows');
    const page = ref(1);
    const search = ref('');
    const sort = ref<'ascending' | 'descending' | null>('descending');

    const filters = ref<FluxFilterState>({
        due: null,
        status: null,
        team: null
    });

    const form = reactive({
        due: DateTime.now().plus({days: 8}) as DateTime | null,
        hours: 6 as number | null,
        instructions: '',
        notify: true,
        repeat: 'none' as string | number | null,
        site: 'north-depot' as string | number | null,
        summary: 'Replace lighting in the north hall',
        team: 'facilities' as string | number | null,
        template: 'none' as string | number | null
    });

    // A badge only takes one of the six intents, so a color that comes from the
    // data has to be mixed into the intent contract a `colored` badge styles
    // against: `--intent-soft` for the fill, `--intent-border` for the edge and
    // `--intent-text` for the label. Both applications carry a helper shaped
    // exactly like this one.
    function customBadgeColor(color: string): Record<string, string> {
        return {
            '--intent-soft': `color-mix(in oklab, ${color} 18%, var(--surface))`,
            '--intent-border': `color-mix(in oklab, ${color} 45%, var(--surface-stroke))`,
            '--intent-text': color
        };
    }

    function rowColor(item: WorkOrder): FluxColor | undefined {
        return item.status === 'rejected' ? 'danger' : undefined;
    }

    async function archive(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'box-archive',
            message: 'Archived work orders stay searchable but can no longer be edited.',
            title: 'Archive this work order?'
        });

        if (!confirmed) {
            return;
        }

        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: 'The work order has been archived.'
        });
    }

    function approve(): void {
        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: 'WO-2481 has been approved.'
        });
    }

    async function reject(): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'ban',
            message: 'The team is notified and the order returns to the site that reported it.',
            title: 'Reject this work order?'
        });

        if (!confirmed) {
            return;
        }

        showSnackbar({
            color: 'danger',
            icon: 'triangle-exclamation',
            message: 'WO-2481 has been rejected.'
        });
    }

    async function remove(item: WorkOrder): Promise<void> {
        const confirmed = await showConfirm({
            icon: 'trash',
            message: `${item.reference} and everything logged against it will be deleted. This cannot be undone.`,
            title: 'Delete this work order?'
        });

        if (!confirmed) {
            return;
        }

        isRemoving.value = true;

        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: `${item.reference} has been deleted.`
        });

        isRemoving.value = false;
    }

    function save(): void {
        isSaving.value = true;

        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: 'The work order has been created.'
        });

        isSaving.value = false;
    }
</script>

<style
    lang="scss"
    module>
    // Neither application uses FluxPlaceholder for an empty screen. Both write this
    // block by hand instead, because the placeholder has no boxed icon, no slot for
    // an action and no way to span the columns of a table grid. Reproduced here
    // rather than replaced, so the tokens are reviewed in the shape that ships.
    .emptyView {
        display: flex;
        max-width: 450px;
        margin-inline: auto;
        padding-block: 45px;
        align-items: center;
        flex-flow: column;
        text-align: center;
        text-wrap: pretty;
    }

    .emptyViewIcon {
        margin-bottom: 30px;
    }

    .emptyViewEnd {
        margin-top: 30px;
    }
</style>
