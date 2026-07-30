<template>
    <FluxProse
        :class="$style.statisticsPlayground"
        container
        tag="article">
        <h1>Flux Statistics playground</h1>
        <p>Every export of <code>@flux-ui/statistics</code> on one page. The first section is the arrangement a real product ships: a period select driving a row of KPIs, a chart, a tracker and a details table. Everything after it isolates the parts that have to be judged on their own, because a chart that looks fine inside a dashboard can still be wrong on its own axis.</p>
        <p>This is a review sheet rather than a tutorial. There is no code next to the examples and nothing here is meant to be copied; the component pages under <a href="./components/kpi">Components</a> do that. What this page is for is judging the package as a whole: the series palette, the loading state, the empty state, the small parts at a comparable size, and the legend.</p>
        <p>Charts are the hardest thing in the library to get right in dark mode. A series color is painted on a canvas, so it inherits nothing and reacts to nothing: it has to hold its own contrast against the chart surface, and against the seven other series, in both themes. Grid lines, axis labels and tooltips have the same problem one layer down. Switch the site between light and dark and scroll through the whole page a second time. Every section is worth looking at twice.</p>
        <p>All data is hard-coded, so the page renders the same on every visit. The only thing that changes what you see is the period select in the dashboard, which really does recompute the buckets, the totals and the deltas.</p>

        <Dashboard/>
        <ChartTypes/>
        <Palettes/>
        <LoadingState/>
        <ThinData/>
        <SmallParts/>
        <Legends/>
        <Trackers/>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxProse } from '@flux-ui/components';
    import ChartTypes from './playground/ChartTypes.vue';
    import Dashboard from './playground/Dashboard.vue';
    import Legends from './playground/Legends.vue';
    import LoadingState from './playground/LoadingState.vue';
    import Palettes from './playground/Palettes.vue';
    import SmallParts from './playground/SmallParts.vue';
    import ThinData from './playground/ThinData.vue';
    import Trackers from './playground/Trackers.vue';
</script>

<style
    lang="scss"
    module>
    .statisticsPlayground {
        container: playground / inline-size;
        padding-block: 60px;
        max-width: 1800px;
        margin-inline: auto;
    }

    .statisticsPlayground > :global([data-prose-full]) {
        margin-inline: 30px;
    }
</style>
