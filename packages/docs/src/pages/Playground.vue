<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-pane style="width: 60%">
                    <flux-pane-header
                        icon="angle-down"
                        title="Select"/>

                    <flux-pane-body>
                        <flux-form-column>
                            <flux-form-select
                                v-model="selectValue"
                                is-editable
                                is-multiple
                                :options="[
                                    {id: 1, label: 'Option 1'},
                                    {id: 2, label: 'Option 2'},
                                    {id: 3, label: 'Option 3'},
                                    {id: 4, label: 'Option 4'},
                                    {id: 5, label: 'Option 5'}
                                ]"/>
                        </flux-form-column>
                    </flux-pane-body>
                </flux-pane>
            </preview>

            <preview>
                <flux-pane style="width: 100%">
                    <flux-pane-body>
                        <table class="upcoming-events">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Event</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="i of [1, 2, 3]">
                                <td>13 Oct</td>
                                <td>An amazing event that is happening soon {{ i }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </flux-pane-body>
                </flux-pane>
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

            <preview>
                <flux-pane style="width: 75%">
                    <flux-pane-body>
                        <flux-pips-pager
                            v-model="pipsPagerPage1"
                            arrows
                            :pages="10"
                            :visible="7"/>
                    </flux-pane-body>

                    <flux-pane-body>
                        <flux-pips-pager
                            v-model="pipsPagerPage2"
                            arrows
                            :pages="5"/>
                    </flux-pane-body>

                    <flux-pane-body>
                        <flux-pips-pager
                            v-model="pipsPagerPage3"
                            arrows
                            :pages="10"/>
                    </flux-pane-body>
                </flux-pane>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormColumn, FluxFormField, FluxFormInput, FluxFormRow, FluxFormSelect, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPipsPager, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack, FluxToggle } from '@fancee/flux';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const pipsPagerPage1 = ref(3);
    const pipsPagerPage2 = ref(3);
    const pipsPagerPage3 = ref(3);
    const selectValue = ref<number[]>([]);
    const toggle = ref(false);
</script>

<style lang="scss">
    .upcoming-events {
        border-collapse: collapse;
        border-spacing: 0;

        th, td {
            padding: 9px 9px;
            text-align: left;
        }

        th {
            background: rgb(var(--primary-7));
            color: white;
        }

        tr:nth-child(even) td {
            background: rgb(var(--primary-1));
        }

        tr:nth-child(odd) td {
            background: rgb(var(--primary-2));
        }
    }
</style>
