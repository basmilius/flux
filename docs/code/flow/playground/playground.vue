<template>
    <article class="flow-playground">
        <header class="flow-playground__intro">
            <h1>Routing playground</h1>
            <p>A reference page for how connectors and cards share the canvas. Connectors route around the cards they would otherwise cross and draw under them by default; each flow below can toggle that last part to compare.</p>
            <ul>
                <li><strong>Under cards</strong> — draws the connectors behind the cards instead of over them, so a crossing line tucks away. On by default.</li>
            </ul>
        </header>

        <PlaygroundStage
            title="Synthetic stress test"
            tall>
            <FluxFlow
                axis="horizontal"
                background="dots"
                interactive
                :padding="30">
                <FluxFlowNode id="trigger" :x="0" :y="210">
                    <FluxFlowPill color="info" icon="bolt" label="Order received"/>
                </FluxFlowNode>

                <FluxFlowNode id="fetch" :x="300" :y="0">
                    <FluxFlowActionCard title="Fetch customer" icon="user" color="primary">
                        Loads the account behind the order.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="transform" :x="300" :y="210">
                    <FluxFlowActionCard title="Normalise" icon="code-branch">
                        Maps the payload to the internal schema.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="validate" :x="300" :y="420">
                    <FluxFlowActionCard title="Validate" icon="check" color="warning">
                        Rejects orders that fail the rules.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="hub" :x="690" :y="210">
                    <FluxFlowActionCard title="Router" icon="server" color="primary">
                        Central hop every branch runs through.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="enrich" :x="1080" :y="0">
                    <FluxFlowActionCard title="Enrich" icon="rocket" color="success">
                        Adds shipping and tax detail.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="store" :x="1080" :y="210">
                    <FluxFlowActionCard title="Persist" icon="database">
                        Writes the order to the warehouse.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="notify" :x="1080" :y="420">
                    <FluxFlowActionCard title="Notify" icon="envelope" color="info">
                        Emails the confirmation.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="done" :x="1470" :y="210">
                    <FluxFlowActionCard title="Complete" icon="truck" color="success">
                        Hands the order to fulfilment.
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowConnection from="trigger" to="fetch"/>
                <FluxFlowConnection from="trigger" to="transform"/>
                <FluxFlowConnection from="trigger" to="validate"/>

                <FluxFlowConnection from="transform" to="hub"/>

                <!-- Long branches that cut across the central router card. -->
                <FluxFlowConnection from="fetch" to="notify" color="danger"/>
                <FluxFlowConnection from="validate" to="enrich" color="danger"/>

                <FluxFlowConnection from="hub" to="enrich"/>
                <FluxFlowConnection from="hub" to="notify"/>

                <!-- Three connectors between the same pair: they stack until split. -->
                <FluxFlowConnection from="hub" to="store" label="write"/>
                <FluxFlowConnection from="hub" to="store" label="cache" color="warning"/>
                <FluxFlowConnection from="store" to="hub" label="read" color="info"/>

                <FluxFlowConnection from="enrich" to="done"/>
                <FluxFlowConnection from="store" to="done"/>
                <FluxFlowConnection from="notify" to="done"/>
            </FluxFlow>
        </PlaygroundStage>

        <PlaygroundStage
            title="Order fulfilment (large graph)"
            tall>
            <Fulfilment/>
        </PlaygroundStage>

        <PlaygroundStage
            v-for="example of examples"
            :key="example.name"
            :title="example.name">
            <component :is="example.component"/>
        </PlaygroundStage>
    </article>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
    import Approval from '../examples/approval.vue';
    import Deploy from '../examples/deploy.vue';
    import Enable from '../examples/enable.vue';
    import Knowledge from '../examples/knowledge.vue';
    import Live from '../examples/live.vue';
    import Onboarding from '../examples/onboarding.vue';
    import Ports from '../examples/ports.vue';
    import Routing from '../examples/routing.vue';
    import Running from '../examples/running.vue';
    import Fulfilment from './fulfilment.vue';
    import PlaygroundStage from './PlaygroundStage.vue';

    const examples = [
        {name: 'Routing rules', component: Routing},
        {name: 'Onboarding', component: Onboarding},
        {name: 'Deploy pipeline', component: Deploy},
        {name: 'Knowledge graph', component: Knowledge},
        {name: 'Branching on ports', component: Ports},
        {name: 'Enable and disable', component: Enable},
        {name: 'Approval step', component: Approval},
        {name: 'Run on demand', component: Live},
        {name: 'Running pipeline', component: Running}
    ];
</script>

<style scoped>
    .flow-playground {
        display: flex;
        flex-direction: column;
        gap: 42px;
        width: 100%;
        max-width: 1320px;
        margin-inline: auto;
        padding: 48px 30px 60px;
    }

    .flow-playground__intro {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 720px;
    }

    .flow-playground__intro h1 {
        font-size: 27px;
        font-weight: 700;
    }

    .flow-playground__intro ul {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding-left: 21px;
        list-style: disc;
    }
</style>
