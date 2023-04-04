<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-pane>
                    <flux-pane-header title="Pane with Notice"/>
                    <flux-notice-stack>
                        <flux-notice
                            icon="circle-exclamation"
                            is-small
                            message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque dolor, et minima nemo neque odio odit recusandae saepe suscipit. Beatae commodi dolorem fugit nemo omnis quam suscipit tenetur voluptate?"
                            variant="info"/>
                    </flux-notice-stack>
                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae delectus, deserunt, ducimus ea enim fuga illo laboriosam magni maxime omnis provident quae quaerat qui repellat repudiandae rerum similique suscipit velit!
                    </flux-pane-body>
                </flux-pane>
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
    import { FluxNotice, FluxNoticeStack, FluxPane, FluxPaneBody, FluxPaneHeader, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
