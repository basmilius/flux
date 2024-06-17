<template>
    <FluxStack>
        <PageTitle
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <template
                v-if="previews.length > 0"
                v-for="preview of previews">
                <Preview>
                    <Component :is="preview"/>
                </Preview>
            </template>

            <Preview v-else>
                <span style="font-size: 60px">🙂</span>
            </Preview>
        </section>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@basmilius/flux';
    import { PageTitle, Preview } from '@docs/components';
    import { computed } from 'vue';

    type Module = {
        // note: String is not actually the correct type here, Vue does not export
        //  the type that is really needed here, which is ComponentDefinition. As
        //  we're on a playground page, the type error is suppressed by this.
        readonly default: string;
        readonly enabled: boolean;
    };

    const availablePreviews: Record<string, Module> = import.meta.glob('@docs/code/playground/*.vue', {eager: true});
    const previews = computed(() => Object
        .values(availablePreviews)
        .filter(module => module.enabled)
        .map(module => module.default));
</script>
