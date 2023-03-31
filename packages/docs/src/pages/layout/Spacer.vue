<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Spacer"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-button-stack>
                        <flux-secondary-button label="More info"/>
                        <flux-spacer class="spacer-example"/>
                        <flux-secondary-button label="Cancel"/>
                        <flux-primary-button
                            icon-before="circle-check"
                            label="Save"/>
                    </flux-button-stack>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A component that fills remaining space in its parent container, helpful in creating evenly divided
                button rows in responsive layouts. Spacers are invisible elements and are made visible for demo purposes.
            </p>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ApiSection, PageTitle, Preview } from '@/components';
</script>

<style
    lang="scss"
    scoped>
    .spacer-example {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(var(--gray-2));
        border: 1px dashed rgb(var(--gray-4));
        border-radius: var(--radius);

        &::before {
            content: 'Spacer';
            color: rgb(var(--gray-6));
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
    }
</style>
