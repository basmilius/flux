<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxTimeline>
                    <FluxTimelineItem
                        icon="cubes"
                        when="13 March 2023 1 PM"
                        title="Timeline component">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci commodi debitis dolor dolores, ducimus facere, fugit id impedit ipsam mollitia nam nobis reiciendis temporibus vero. Accusamus in repellat voluptatibus.
                    </FluxTimelineItem>

                    <FluxTimelineItem
                        title="Bas Milius commented"
                        photo="https://avatars.githubusercontent.com/u/978257?v=4"
                        when="13 March 2023 1:30 PM">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid illum quaerat ratione voluptates? Atque consequatur cupiditate ducimus enim nam necessitatibus quibusdam quos! Amet cupiditate dicta maiores natus quae sint?
                    </FluxTimelineItem>
                </FluxTimeline>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
</script>
