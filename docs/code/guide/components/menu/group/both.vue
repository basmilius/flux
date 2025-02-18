<template>
    <FluxPane style="max-width: 300px">
        <FluxMenu>
            <FluxMenuGroup is-horizontal>
                <FluxMenuItem
                    icon-leading="align-left"
                    is-highlighted/>

                <FluxMenuItem icon-leading="align-center"/>

                <FluxMenuItem icon-leading="align-right"/>

                <FluxMenuItem icon-leading="align-justify"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="list-ul"
                    label="Unordered list"/>

                <FluxMenuItem
                    icon-leading="list-ol"
                    label="Ordered list"/>

                <FluxMenuItem
                    icon-leading="image"
                    label="Image"/>

                <FluxMenuItem
                    icon-leading="play"
                    label="Video"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="indent"
                    label="Indent"/>

                <FluxMenuItem
                    icon-leading="outdent"
                    label="Outdent"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>
