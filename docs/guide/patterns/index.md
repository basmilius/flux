<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Patterns

The Patterns section collects opinionated recipes for common UI flows that span multiple Flux components. Where the [Components](../components/) section documents each component in isolation, these recipes show how to wire them together for a real-world feature.

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
    </FluxTable>
</FluxPane>
