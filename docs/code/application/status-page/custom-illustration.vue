<template>
    <FluxApplicationStatusPage
        code="403"
        variant="not-found"
        title="You need access to this project"
        description="Ask an owner of the project to invite you, then reload this page.">
        <template #media>
            <svg
                width="180"
                height="120"
                viewBox="0 0 180 120"
                fill="none">
                <rect
                    x="21"
                    y="18"
                    width="138"
                    height="84"
                    rx="12"
                    stroke="var(--surface-stroke)"
                    stroke-width="2"/>

                <path
                    d="M21 42h138"
                    stroke="var(--surface-stroke)"
                    stroke-width="2"/>

                <circle
                    cx="36"
                    cy="30"
                    r="3"
                    fill="var(--primary-solid)"/>

                <circle
                    cx="48"
                    cy="30"
                    r="3"
                    fill="var(--surface-stroke)"/>

                <path
                    d="M75 78V66a15 15 0 0 1 30 0v12"
                    stroke="var(--primary-solid)"
                    stroke-width="3"
                    stroke-linecap="round"/>

                <rect
                    x="66"
                    y="72"
                    width="48"
                    height="18"
                    rx="6"
                    fill="var(--primary-solid)"/>
            </svg>
        </template>

        <template #actions>
            <FluxPrimaryButton label="Request access"/>

            <FluxSecondaryButton label="Back to dashboard"/>
        </template>
    </FluxApplicationStatusPage>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationStatusPage } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
