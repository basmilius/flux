import {
    FluxFlow,
    FluxFlowActionCard,
    FluxFlowConnection,
    FluxFlowNode,
    FluxFlowPill
} from '@flux-ui/react';
import Approval from '../examples/approval';
import Deploy from '../examples/deploy';
import Enable from '../examples/enable';
import Knowledge from '../examples/knowledge';
import Live from '../examples/live';
import Onboarding from '../examples/onboarding';
import Ports from '../examples/ports';
import Routing from '../examples/routing';
import Running from '../examples/running';
import Fulfilment from './fulfilment';
import { createElement, type ComponentType } from 'react';
import PlaygroundStage from './PlaygroundStage';
import './playground-0.scss';
export default function Example() {
    function renderExample(component: ComponentType) {
        return createElement(component);
    }
    const examples = [
        { name: 'Routing rules', component: Routing },
        { name: 'Onboarding', component: Onboarding },
        { name: 'Deploy pipeline', component: Deploy },
        { name: 'Knowledge graph', component: Knowledge },
        { name: 'Branching on ports', component: Ports },
        { name: 'Enable and disable', component: Enable },
        { name: 'Approval step', component: Approval },
        { name: 'Run on demand', component: Live },
        { name: 'Running pipeline', component: Running }
    ];
    return (
        <>
            <div className="react-example-o4r27jle41cb" style={{ width: '100%' }}>
                <article className={'flow-playground'}>
                    <header className={'flow-playground__intro'}>
                        <h1>{'Routing playground'}</h1>
                        <p>
                            {
                                'A reference page for how connectors and cards share the canvas. Connectors route around the cards they would otherwise cross and draw under them by default; each flow below can toggle that last part to compare.'
                            }
                        </p>
                        <ul>
                            <li>
                                <strong>{'Under cards'}</strong>
                                {
                                    ' — draws the connectors behind the cards instead of over them, so a crossing line tucks away. On by default.'
                                }
                            </li>
                        </ul>
                    </header>
                    <PlaygroundStage title={'Synthetic stress test'} tall>
                        <FluxFlow axis={'horizontal'} background={'dots'} interactive padding={30}>
                            <FluxFlowNode id={'trigger'} x={0} y={210}>
                                <FluxFlowPill
                                    color={'info'}
                                    icon={'bolt'}
                                    label={'Order received'}
                                ></FluxFlowPill>
                            </FluxFlowNode>
                            <FluxFlowNode id={'fetch'} x={300} y={0}>
                                <FluxFlowActionCard
                                    title={'Fetch customer'}
                                    icon={'user'}
                                    color={'primary'}
                                >
                                    {' Loads the account behind the order. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'transform'} x={300} y={210}>
                                <FluxFlowActionCard title={'Normalize'} icon={'code-branch'}>
                                    {' Maps the payload to the internal schema. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'validate'} x={300} y={420}>
                                <FluxFlowActionCard
                                    title={'Validate'}
                                    icon={'check'}
                                    color={'warning'}
                                >
                                    {' Rejects orders that fail the rules. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'hub'} x={690} y={210}>
                                <FluxFlowActionCard
                                    title={'Router'}
                                    icon={'server'}
                                    color={'primary'}
                                >
                                    {' Central hop every branch runs through. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'enrich'} x={1080} y={0}>
                                <FluxFlowActionCard
                                    title={'Enrich'}
                                    icon={'rocket'}
                                    color={'success'}
                                >
                                    {' Adds shipping and tax detail. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'store'} x={1080} y={210}>
                                <FluxFlowActionCard title={'Persist'} icon={'database'}>
                                    {' Writes the order to the warehouse. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'notify'} x={1080} y={420}>
                                <FluxFlowActionCard
                                    title={'Notify'}
                                    icon={'envelope'}
                                    color={'info'}
                                >
                                    {' Emails the confirmation. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowNode id={'done'} x={1470} y={210}>
                                <FluxFlowActionCard
                                    title={'Complete'}
                                    icon={'truck'}
                                    color={'success'}
                                >
                                    {' Hands the order to fulfilment. '}
                                </FluxFlowActionCard>
                            </FluxFlowNode>
                            <FluxFlowConnection from={'trigger'} to={'fetch'}></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'trigger'}
                                to={'transform'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'trigger'}
                                to={'validate'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection from={'transform'} to={'hub'}></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'fetch'}
                                to={'notify'}
                                color={'danger'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'validate'}
                                to={'enrich'}
                                color={'danger'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection from={'hub'} to={'enrich'}></FluxFlowConnection>
                            <FluxFlowConnection from={'hub'} to={'notify'}></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'hub'}
                                to={'store'}
                                label={'write'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'hub'}
                                to={'store'}
                                label={'cache'}
                                color={'warning'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection
                                from={'store'}
                                to={'hub'}
                                label={'read'}
                                color={'info'}
                            ></FluxFlowConnection>
                            <FluxFlowConnection from={'enrich'} to={'done'}></FluxFlowConnection>
                            <FluxFlowConnection from={'store'} to={'done'}></FluxFlowConnection>
                            <FluxFlowConnection from={'notify'} to={'done'}></FluxFlowConnection>
                        </FluxFlow>
                    </PlaygroundStage>
                    <PlaygroundStage title={'Order fulfilment (large graph)'} tall>
                        <Fulfilment></Fulfilment>
                    </PlaygroundStage>
                    {examples.map((example) => (
                        <PlaygroundStage key={example.name} title={example.name}>
                            {renderExample(example.component)}
                        </PlaygroundStage>
                    ))}
                </article>
            </div>
        </>
    );
}
