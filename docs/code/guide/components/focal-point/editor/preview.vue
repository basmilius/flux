<template>
    <Preview>
        <FluxPane>
            <FluxFocalPointEditor
                v-model="focalPoint"
                src="/assets/demo/image-2.jpg">
                <template #footer-before>
                    <FluxSecondaryButton icon-leading="question"/>
                </template>

                <template #footer>
                    <FluxPrimaryButton
                        icon-leading="circle-check"
                        label="Save"/>
                </template>
            </FluxFocalPointEditor>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFocalPointEditor, FluxPane, FluxPrimaryButton, FluxSecondaryButton } from '@basmilius/flux';
    import { ref } from 'vue';

    const focalPoint = ref<[number, number]>([75, 50]);
</script>
