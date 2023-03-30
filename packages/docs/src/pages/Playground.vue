<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-stack :gap="15">
                    <flux-snackbar
                        color="success"
                        icon="circle-check"
                        message="Source Code WeAreFancee 2023-03-13.mp4"
                        sub-message="Uploading: 350 / 500 MB"
                        is-closeable/>

                    <flux-snackbar
                        icon="circle-check"
                        message="Source Code WeAreFancee 2023-03-13.mp4"
                        sub-message="Uploading: 350 / 500 MB"
                        is-closeable/>

                    <flux-snackbar
                        color="danger"
                        icon="circle-exclamation"
                        message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium debitis ea expedita explicabo in incidunt ipsum laudantium minus modi necessitatibus, nesciunt omnis provident rem sapiente similique tempore vero voluptate?"
                        sub-message="Uploading: 350 / 500 MB"
                        is-closeable/>

                    <flux-snackbar
                        icon="circle-exclamation"
                        message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium debitis ea expedita explicabo in incidunt ipsum laudantium minus modi necessitatibus, nesciunt omnis provident rem sapiente similique tempore vero voluptate?"
                        sub-message="Uploading: 350 / 500 MB"
                        is-closeable/>
                </flux-stack>
            </preview>

            <preview>
                <span style="font-size: 60px">🙂</span>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxSnackbar, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
