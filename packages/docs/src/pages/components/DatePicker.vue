<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Date picker"/>

        <preview>
            <flux-stack
                axis="horizontal"
                is-wrapping>
                <flux-pane style="align-self: start; width: 330px">
                    <flux-date-picker v-model="date"/>
                </flux-pane>

                <flux-pane style="align-self: start; width: 330px">
                    <flux-date-picker
                        v-model="dateRange"
                        range-mode="range"/>
                </flux-pane>
            </flux-stack>
        </preview>

        <api-section>
            <p>
                Date pickers allow the user to select a date within a calendar-like experience. The date picker is used in
                the FluxFormDatePicker and in FluxFilter components such as FluxFilterDate and FluxFilterDateRange. The
                date picker has various range modes like week and month.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="DatePicker">
                <template #props>
                    <tr>
                        <td><code>model-value</code><code>DateTime | DateTime[]</code></td>
                        <td>The value of the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>DateTime</code></td>
                        <td>The maximum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>DateTime</code></td>
                        <td>The minimum selectable date within the date picker.</td>
                    </tr>
                    <tr>
                        <td><code>range-mode</code><code>'range' | 'week' | 'month'</code></td>
                        <td>The range type to use.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(date: DateTime | DateTime[]): void;</code></td>
                        <td>Triggered when a date or date range is selected.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDatePicker, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const date = ref(DateTime.now().plus({day: 5}));
    const dateRange = ref([DateTime.now(), DateTime.now().plus({day: 7})]);
</script>
