<template>
    <FluxFlow :padding="21">
        <template
            v-for="(marker, index) of markers"
            :key="marker">
            <!-- Both ends sit in a column of the same width, so a step naming its
                 marker centres over the port below it and the connector runs
                 straight down. -->
            <FluxFlowNode :id="`${marker}-from`" :x="column(index)" :y="row(index)">
                <div style="display: flex; width: 120px; justify-content: center">
                    <FluxFlowStep :value="marker"/>
                </div>
            </FluxFlowNode>

            <FluxFlowNode :id="`${marker}-to`" :x="column(index)" :y="row(index) + 150">
                <div style="display: flex; width: 120px; justify-content: center">
                    <FluxFlowStep :value="''"/>
                </div>
            </FluxFlowNode>

            <FluxFlowConnection
                :from="`${marker}-from`"
                :to="`${marker}-to`"
                marker-start="none"
                :marker-end="marker"/>
        </template>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConnection, FluxFlowNode, FluxFlowStep } from '@flux-ui/flow';

    const markers = ['chevron', 'arrow', 'dot', 'diamond', 'square', 'bar'] as const;

    const COLUMNS = 3;

    function column(index: number): number {
        return (index % COLUMNS) * 180;
    }

    function row(index: number): number {
        return Math.floor(index / COLUMNS) * 270;
    }
</script>
