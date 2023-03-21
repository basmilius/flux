<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
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
    import { FluxFormColumn, FluxFormField, FluxFormInput, FluxFormRow, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack, FluxToggle } from '@fancee/flux';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const toggle = ref(false);
</script>
