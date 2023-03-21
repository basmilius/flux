<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview style="min-height: 420px">
                <flux-pane style="align-self: start; translate: 0 54px; width: 330px">
                    <flux-filter v-model="filterState">
                        <flux-filter-option
                            icon="clone"
                            label="Option"
                            name="option1"
                            :options="[
                            {label: 'Option A', value: 'a'},
                            {label: 'Option B', value: 'b'},
                            {label: 'Option C', value: 'c'}
                        ]"/>

                        <flux-filter-options
                            icon="circle-check"
                            label="Choices"
                            name="option2"
                            :options="[
                            {label: 'Option A', value: 'a'},
                            {label: 'Option B', value: 'b'},
                            {label: 'Option C', value: 'c'}
                        ]"/>

                        <flux-separator/>

                        <flux-filter-date
                            icon="calendar"
                            label="Date"
                            name="option3"/>

                        <flux-filter-date-range
                            icon="calendar-range"
                            label="Period"
                            name="option4"/>
                    </flux-filter>
                </flux-pane>
            </preview>

            <preview>
                <flux-stack
                    axis="horizontal"
                    is-wrapping>
                    <flux-pane style="align-self: start; width: 330px">
                        <flux-date-picker
                            v-model="date"
                            :max="DateTime.now().plus({day: 20})"
                            :min="DateTime.now()"/>
                    </flux-pane>

                    <flux-pane style="align-self: start; width: 330px">
                        <flux-date-picker
                            v-model="dateRange"
                            range-mode="range"/>
                    </flux-pane>

                    <flux-pane style="align-self: start; width: 330px">
                        <flux-date-picker
                            v-model="dateWeek"
                            range-mode="week"/>
                    </flux-pane>

                    <flux-pane style="align-self: start; width: 330px">
                        <flux-date-picker
                            v-model="dateMonth"
                            range-mode="month"/>
                    </flux-pane>
                </flux-stack>
            </preview>

            <preview>
                <flux-pane style="width: 60%">
                    <flux-pane-header
                        icon="clone"
                        title="Form"/>

                    <flux-pane-body>
                        <flux-form-column>
                            <flux-form-row>
                                <flux-form-field label="First name">
                                    <flux-form-input
                                        auto-complete="given_name"
                                        placeholder="E.g. Bas"/>
                                </flux-form-field>

                                <flux-form-field label="Last name">
                                    <flux-form-input
                                        auto-complete="family_name"
                                        placeholder="E.g. Milius"/>
                                </flux-form-field>
                            </flux-form-row>

                            <flux-form-field label="Email">
                                <flux-form-input
                                    auto-complete="email"
                                    placeholder="E.g. bas@tibbaa.com"
                                    type="email"/>
                            </flux-form-field>

                            <flux-form-field label="Question">
                                <flux-form-text-area
                                    auto-complete="email"
                                    placeholder="E.g. What does API mean in the Medium ticketing package?"/>
                            </flux-form-field>

                            <flux-form-field label="High priority">
                                <flux-toggle
                                    v-model="toggle"
                                    icon-off="sun-alt"
                                    icon-on="moon"
                                    is-switch/>
                            </flux-form-field>

                            <flux-form-field label="Toggle">
                                <flux-toggle
                                    v-model="toggle"
                                    icon-off="circle"
                                    icon-on="circle"/>
                            </flux-form-field>
                        </flux-form-column>
                    </flux-pane-body>

                    <flux-pane-footer>
                        <flux-secondary-button label="Back"/>

                        <flux-spacer/>

                        <flux-primary-button
                            icon-before="circle-check"
                            label="Send"/>
                    </flux-pane-footer>
                </flux-pane>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDatePicker, FluxFilter, FluxFilterDate, FluxFilterDateRange, FluxFilterOption, FluxFilterOptions, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormRow, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator, FluxSpacer, FluxStack, FluxToggle } from '@fancee/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const date = ref(DateTime.now().plus({day: 5}));
    const dateRange = ref([
        DateTime.now(),
        DateTime.now().plus({day: 7})
    ]);
    const dateWeek = ref(null);
    const dateMonth = ref(null);

    const filterState = ref({
        option1: 'b',
        option2: ['a', 'c'],
        option3: DateTime.now(),
        option4: [DateTime.now(), DateTime.now().plus({day: 14})]
    });
    const toggle = ref(false);
</script>
