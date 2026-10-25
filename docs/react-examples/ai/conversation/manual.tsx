import { type ComponentRef, useRef, useState } from 'react';
import {
    FluxAiConversation,
    FluxAiMessage,
    FluxButtonStack,
    FluxPrimaryButton,
    FluxSecondaryButton
} from '@flux-ui/react';
import './manual-0.scss';
export default function Example() {
    const conversation = useRef<ComponentRef<typeof FluxAiConversation> | null>(null);
    const [turns, setTurns] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    return (
        <>
            <div className="react-example-q3uc29w7brrm" style={{ width: '100%' }}>
                <div className={'stack'}>
                    <div className={'frame'}>
                        <FluxAiConversation ref={conversation} isSticky={false}>
                            {turns.map((turn) => (
                                <FluxAiMessage
                                    key={turn}
                                    icon={turn % 2 === 0 ? 'sparkles' : undefined}
                                    role={turn % 2 === 0 ? 'assistant' : 'user'}
                                >
                                    {' Turn '}
                                    {turn}
                                    {' of a conversation that never moves on its own. '}
                                </FluxAiMessage>
                            ))}
                        </FluxAiConversation>
                    </div>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            label={'Add a turn'}
                            onClick={() => {
                                setTurns([...turns, turns.length + 1]);
                            }}
                        ></FluxSecondaryButton>
                        <FluxPrimaryButton
                            label={'Jump to latest'}
                            onClick={() => {
                                conversation.current?.scrollToBottom();
                            }}
                        ></FluxPrimaryButton>
                    </FluxButtonStack>
                </div>
            </div>
        </>
    );
}
