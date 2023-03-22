<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Focal point editor"/>

        <preview>
            <flux-pane style="width: 420px">
                <flux-focal-point-editor
                    v-model="focalPoint"
                    url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg">
                    <template #footer-before>
                        <flux-secondary-button icon-before="question"/>
                    </template>

                    <template #footer>
                        <flux-primary-button
                            icon-before="circle-check"
                            label="Save"/>
                    </template>
                </flux-focal-point-editor>
            </flux-pane>
        </preview>

        <section>
            <p>
                <em>Todo</em>
            </p>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFocalPointEditor, FluxPane, FluxPrimaryButton, FluxSecondaryButton, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { PageTitle, Preview } from '@/components';

    const focalPoint = ref([65, 75]);
</script>
