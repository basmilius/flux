<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-stack :gap="15">
                    <flux-pane
                        href="/"
                        :columns="3"
                        style="max-width: 540px">
                        <flux-pane-media image-url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg" :image-focal-point="[80, 90]"/>
                        <flux-pane-body :span="2">
                            <h2>My Pane</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
                        </flux-pane-body>
                    </flux-pane>

                    <flux-pane
                        :columns="3"
                        style="max-width: 540px">
                        <flux-pane-media
                            image-url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                            is-inset/>
                        <flux-pane-body :span="2">
                            <h2>My Pane</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
                        </flux-pane-body>
                    </flux-pane>

                    <flux-pane
                        :columns="3"
                        style="max-width: 540px">
                        <flux-pane-body :span="2">
                            <h2>My Pane</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
                        </flux-pane-body>
                        <flux-pane-media image-url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"/>
                    </flux-pane>

                    <flux-pane
                        :columns="3"
                        style="max-width: 540px">
                        <flux-pane-body :span="2">
                            <h2>My Pane</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
                        </flux-pane-body>
                        <flux-pane-media
                            image-url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                            is-inset/>
                    </flux-pane>

                    <flux-pane style="max-width: 540px">
                        <flux-pane-media image-url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"/>
                        <flux-pane-body>
                            <h2>My Pane</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
                        </flux-pane-body>
                    </flux-pane>

                    <flux-pane style="max-width: 540px">
                        <flux-pane-media
                            image-url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"
                            is-inset/>
                        <flux-pane-body>
                            <h2>My Pane</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A dolores ducimus eligendi fuga, fugit impedit odit perferendis repellendus. Corporis distinctio doloremque earum enim fuga hic molestias perspiciatis quaerat quidem repellendus.</p>
                        </flux-pane-body>
                    </flux-pane>
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
    import { FluxPane, FluxPaneBody, FluxPaneMedia, FluxStack } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
