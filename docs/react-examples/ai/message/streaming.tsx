import { FluxAction, FluxAiConversation, FluxAiMessage } from '@flux-ui/react';
import { useEffect, useState } from 'react';
export default function Example() {
    const WORDS =
        'Every dimension, padding and offset is a multiple of three pixels, which keeps components on the same rhythm no matter how they are combined.'.split(
            ' '
        );
    const [spoken, setSpoken] = useState(0);
    const answer = WORDS.slice(0, spoken).join(' ');
    const isStreaming = spoken < WORDS.length;
    useEffect(() => {
        const timer = setInterval(
            () => setSpoken((value) => (value < WORDS.length ? value + 1 : 0)),
            200
        );
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <FluxAiConversation>
                <FluxAiMessage avatarFallbackInitials={'BM'} role={'user'} when={'09:30'}>
                    {' Explain the 3px grid in one sentence. '}
                </FluxAiMessage>
                <FluxAiMessage
                    icon={'sparkles'}
                    isStreaming={isStreaming}
                    role={'assistant'}
                    when={'09:30'}
                    actions={
                        <>
                            <FluxAction icon={'copy'} aria-label={'Copy'}></FluxAction>
                            <FluxAction icon={'rotate'} aria-label={'Retry'}></FluxAction>
                        </>
                    }
                >
                    {answer}
                </FluxAiMessage>
            </FluxAiConversation>
        </>
    );
}
