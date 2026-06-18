<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Patterns

The Patterns section collects opinionated recipes for common UI flows that span multiple Flux components. Where the [Components](../../components/) section documents each component in isolation, these recipes show how to wire them together for a real-world feature.

Each pattern is self-contained — copy the snippets into your project and adjust them to your needs.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Pattern</FluxTableHeader>
                <FluxTableHeader>What it covers</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><a href="./crud-form">CRUD form</a></FluxTableCell>
            <FluxTableCell>A validated create/edit form using <code>FluxForm</code>, <code>FluxFormField</code> and an overlay.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./filterable-data-table">Filterable data table</a></FluxTableCell>
            <FluxTableCell>A <code>FluxDataTable</code> driven by <code>FluxFilter</code> and server-side pagination.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./stepper-wizard">Stepper wizard</a></FluxTableCell>
            <FluxTableCell>A multi-step flow using <code>FluxStepper</code>.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./programmatic-dialogs">Programmatic dialogs</a></FluxTableCell>
            <FluxTableCell>When to use <code>showAlert</code> / <code>showConfirm</code> / <code>showPrompt</code> instead of an overlay.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./app-shell">Application shell</a></FluxTableCell>
            <FluxTableCell>A responsive frame with a <code>FluxSplitView</code>, the <code>FluxMenu</code> family and a sticky header.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./dashboard">Dashboard</a></FluxTableCell>
            <FluxTableCell>An overview screen of KPI cards, a timeline and a description list.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./data-management">Data management</a></FluxTableCell>
            <FluxTableCell>An editable <code>FluxTable</code> with bulk selection, inline editing and faceted filters.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./project-board">Project board</a></FluxTableCell>
            <FluxTableCell>A <code>FluxKanban</code> board with cards, context menus and a detail slide-over.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./settings">Settings</a></FluxTableCell>
            <FluxTableCell>A profile form and preference controls spanning the whole form layer.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./profile">Contact profile</a></FluxTableCell>
            <FluxTableCell>A detail screen with a persona, description list, timeline and contextual actions.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./media-library">Media library</a></FluxTableCell>
            <FluxTableCell>A gallery with uploads, focal-point editing and an overlay preview.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./inbox">Inbox</a></FluxTableCell>
            <FluxTableCell>A split-view message list with threads, filters and a virtual scroller.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./command-center">Command center</a></FluxTableCell>
            <FluxTableCell>A <code>FluxCommandPalette</code> with windows, overlays and snackbars.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./onboarding">Onboarding</a></FluxTableCell>
            <FluxTableCell>A guided <code>FluxTour</code>, a welcome screen and a setup checklist.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./scheduling">Scheduling</a></FluxTableCell>
            <FluxTableCell>A <code>FluxCalendar</code> of events with a date-picker day planner.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./checkout">Checkout</a></FluxTableCell>
            <FluxTableCell>An order summary with quantities, totals and a pay action.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><a href="./states">Empty, loading &amp; error states</a></FluxTableCell>
            <FluxTableCell>The three states beyond the happy path: empty, loading and error.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>
