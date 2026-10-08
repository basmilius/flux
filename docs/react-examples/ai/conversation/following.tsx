import { FluxAiConversation, FluxAiMessage, FluxPrimaryButton } from '@flux-ui/react';
import { useState, useEffect } from 'react';
import './following-0.scss';
export default function Example() {
    type Turn = {
        id: number;
        role: 'user' | 'assistant';
        content: string;
        isStreaming: boolean;
    };
    const WORDS =
        'A conversation that follows its own tail keeps the newest words in view while they arrive, and steps aside as soon as you scroll up to read something back.'.split(
            ' '
        );
    const [turns, setTurns] = useState<Turn[]>([
        {
            id: 1,
            role: 'user',
            content: 'Why should a chat follow its own tail?',
            isStreaming: false
        },
        { id: 2, role: 'assistant', content: WORDS.join(' '), isStreaming: false }
    ]);
    const activeId = turns.find((turn) => turn.isStreaming)?.id;
    const isAnswering = activeId !== undefined;
    useEffect(() => {
        if (activeId === undefined) return;
        let spoken = 0;
        const timer = setInterval(() => {
            spoken++;
            setTurns((current) =>
                current.map((turn) =>
                    turn.id === activeId
                        ? {
                              ...turn,
                              content: WORDS.slice(0, spoken).join(' '),
                              isStreaming: spoken < WORDS.length
                          }
                        : turn
                )
            );
        }, 120);
        return () => clearInterval(timer);
    }, [activeId]);
    function ask() {
        if (isAnswering) return;
        setTurns((current) => [
            ...current,
            { id: current.length + 1, role: 'user', content: 'Tell me again.', isStreaming: false },
            { id: current.length + 2, role: 'assistant', content: '', isStreaming: true }
        ]);
    }
    return (
        <>
            <div className="react-example-tk4igjdwhccq" style={{ width: '100%' }}>
                <div className={'stack'}>
                    <div className={'frame'}>
                        <FluxAiConversation>
                            {turns.map((turn) => (
                                <FluxAiMessage
                                    key={turn.id}
                                    avatarFallbackInitials={turn.role === 'user' ? 'BM' : undefined}
                                    icon={turn.role === 'assistant' ? 'sparkles' : undefined}
                                    isStreaming={turn.isStreaming}
                                    role={turn.role}
                                >
                                    {turn.content}
                                </FluxAiMessage>
                            ))}
                        </FluxAiConversation>
                    </div>
                    <FluxPrimaryButton
                        isLoading={isAnswering}
                        label={'Ask again'}
                        onClick={ask}
                    ></FluxPrimaryButton>
                </div>
            </div>
        </>
    );
}
