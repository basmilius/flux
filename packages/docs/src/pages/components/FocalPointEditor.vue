<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Focal point editor"/>

        <Preview>
            <FluxPane style="width: 420px">
                <FluxFocalPointEditor
                    v-model="focalPoint"
                    url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg">
                    <template #footer-before>
                        <FluxSecondaryButton icon-before="question"/>
                    </template>

                    <template #footer>
                        <FluxPrimaryButton
                            icon-before="circle-check"
                            label="Save"/>
                    </template>
                </FluxFocalPointEditor>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                <em>Todo</em>
            </p>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFocalPointEditor, FluxPane, FluxPrimaryButton, FluxSecondaryButton, FluxStack } from '@basmilius/flux';
    import { ApiSection, PageTitle, Preview } from '@docs/components';
    import { ref } from 'vue';

    const focalPoint = ref([65, 75]);
</script>
