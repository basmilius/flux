import { FluxAiPromptInput } from '@flux-ui/react';
import { useState, useEffect } from 'react';
export default function Example() {
    const [prompt, setPrompt] = useState('');
    const [isStreaming, setStreaming] = useState(false);
    useEffect(() => {
        if (!isStreaming) return;
        const timer = setTimeout(() => setStreaming(false), 4000);
        return () => clearTimeout(timer);
    }, [isStreaming]);
    function onStop() {
        setStreaming(false);
    }
    function onSubmit() {
        setPrompt('');
        setStreaming(true);
    }
    return (
        <>
            <FluxAiPromptInput
                value={prompt}
                onValueChange={setPrompt}
                isStreaming={isStreaming}
                placeholder={'Ask a follow-up question...'}
                onStop={onStop}
                onSubmit={onSubmit}
            ></FluxAiPromptInput>
        </>
    );
}
