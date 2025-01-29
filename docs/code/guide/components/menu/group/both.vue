<template>
    <FluxPane style="max-width: 300px">
        <FluxMenu>
            <FluxMenuGroup is-horizontal>
                <FluxMenuItem
                    icon-before="align-left"
                    is-highlighted/>

                <FluxMenuItem icon-before="align-center"/>

                <FluxMenuItem icon-before="align-right"/>

                <FluxMenuItem icon-before="align-justify"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="list-ul"
                    label="Unordered list"/>

                <FluxMenuItem
                    icon-before="list-ol"
                    label="Ordered list"/>

                <FluxMenuItem
                    icon-before="image"
                    label="Image"/>

                <FluxMenuItem
                    icon-before="play"
                    label="Video"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="indent"
                    label="Indent"/>

                <FluxMenuItem
                    icon-before="outdent"
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
