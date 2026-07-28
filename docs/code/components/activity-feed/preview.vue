<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxActivityFeed>
                    <FluxActivityFeedItem
                        actor="Bas Milius"
                        avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
                        date-time="2026-03-13T09:12:00+01:00"
                        when="09:12">
                        opened the pull request.
                    </FluxActivityFeedItem>

                    <FluxActivityFeedItem
                        actor="Sarah Jansen"
                        avatar-fallback-initials="SJ"
                        date-time="2026-03-13T10:04:00+01:00"
                        when="10:04">
                        requested changes.

                        <template #details>
                            The color tokens still reference the removed palette scales, could you rebase on main first?
                        </template>
                    </FluxActivityFeedItem>

                    <FluxActivityFeedItem
                        color="success"
                        date-time="2026-03-13T11:47:00+01:00"
                        icon="circle-check"
                        when="11:47">
                        All checks passed.
                    </FluxActivityFeedItem>
                </FluxActivityFeed>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
