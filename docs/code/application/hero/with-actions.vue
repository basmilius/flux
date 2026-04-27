<template>
    <Preview>
        <FluxApplicationHero
            title="Projects"
            subtitle="All projects you're a member of.">
            <template #end>
                <FluxPrimaryButton
                    icon-leading="plus"
                    label="New project"/>
            </template>
        </FluxApplicationHero>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationHero } from '@flux-ui/application';
    import { FluxPrimaryButton } from '@flux-ui/components';
</script>
