import {
    FluxAiConversation,
    FluxAiMessage,
    FluxAiPromptInput,
    FluxAiStreamingText
} from '@flux-ui/react';
import { useEffect, useState } from 'react';
type Turn = { id: number; role: 'user' | 'assistant'; text: string; streaming: boolean };
const answer =
    'Flux components share their design tokens and styles across frameworks. In React, use controlled values and callbacks for inputs, children for content, and render props when a component exposes interactive state. The examples on this page render the React package directly.';
export default function ConversationDemo() {
    const [prompt, setPrompt] = useState('');
    const [turns, setTurns] = useState<Turn[]>([
        { id: 1, role: 'user', text: 'How do I get started with Flux in React?', streaming: false },
        {
            id: 2,
            role: 'assistant',
            text: 'Install @flux-ui/react, import its stylesheet, and mount FluxRoot once for dialogs and notifications. Try another question below.',
            streaming: false
        }
    ]);
    const activeId = turns.find((turn) => turn.streaming)?.id;
    useEffect(() => {
        if (activeId === undefined) return;
        const words = answer.split(' ');
        let count = 0;
        const timer = window.setInterval(() => {
            count += 2;
            setTurns((current) =>
                current.map((turn) =>
                    turn.id === activeId
                        ? {
                              ...turn,
                              text: words.slice(0, count).join(' '),
                              streaming: count < words.length
                          }
                        : turn
                )
            );
        }, 80);
        return () => window.clearInterval(timer);
    }, [activeId]);
    function submit() {
        if (!prompt.trim() || activeId !== undefined) return;
        setTurns((current) => [
            ...current,
            { id: current.length + 1, role: 'user', text: prompt.trim(), streaming: false },
            { id: current.length + 2, role: 'assistant', text: '', streaming: true }
        ]);
        setPrompt('');
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%' }}>
            <div style={{ height: 420, overflow: 'auto' }}>
                <FluxAiConversation>
                    {turns.map((turn) => (
                        <FluxAiMessage
                            key={turn.id}
                            role={turn.role}
                            icon={turn.role === 'assistant' ? 'sparkles' : undefined}
                            isStreaming={turn.streaming}
                        >
                            <FluxAiStreamingText content={turn.text} isStreaming={turn.streaming} />
                        </FluxAiMessage>
                    ))}
                </FluxAiConversation>
            </div>
            <FluxAiPromptInput
                value={prompt}
                onValueChange={setPrompt}
                isStreaming={activeId !== undefined}
                onSubmit={submit}
                onStop={() =>
                    setTurns((current) => current.map((turn) => ({ ...turn, streaming: false })))
                }
            />
            <small>Local demo with a fixed response; no AI service is called.</small>
        </div>
    );
}
