import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
    FluxAiConversation,
    FluxAiMessage,
    FluxAiModelSelect,
    FluxAiPromptInput,
    FluxAiReasoning,
    FluxAiStreamingText,
    FluxAiSuggestions,
    FluxAiToolCall,
    FluxAiUsage,
    configureAi,
    findBlockBoundary,
    repairStreamingTail
} from './Ai';

describe('AI markdown', () => {
    it('renders safe React nodes and never interprets raw HTML', () => {
        render(<FluxAiStreamingText content={'# Hello\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))'} />);
        expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
        expect(document.querySelector('script')).not.toBeInTheDocument();
        expect(screen.getByText(/<script>/)).toBeInTheDocument();
        expect(screen.getByText('bad').closest('a')).toBeNull();
    });

    it('repairs partial streams and detects settled block boundaries', () => {
        expect(repairStreamingTail('A **partial')).toBe('A **partial**');
        expect(repairStreamingTail('A [partial')).toBe('A ');
        expect(findBlockBoundary('First\n\nSecond')).toBe(7);
    });
});

describe('AI interactions', () => {
    it('submits prompts from Enter and exposes a streaming stop action', () => {
        const onSubmit = vi.fn(),
            onStop = vi.fn();
        const { rerender } = render(<FluxAiPromptInput defaultValue="  Explain Flux  " onSubmit={onSubmit} />);
        fireEvent.keyDown(screen.getByRole('textbox', { name: 'Prompt message' }), { key: 'Enter' });
        expect(onSubmit).toHaveBeenCalledWith('Explain Flux');
        rerender(<FluxAiPromptInput value="Waiting" isStreaming onStop={onStop} />);
        fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
        expect(onStop).toHaveBeenCalledOnce();
    });

    it('selects models and suggestions', () => {
        const onValueChange = vi.fn(),
            onSelect = vi.fn();
        render(
            <>
                <FluxAiModelSelect models={[{ id: 'fast', name: 'Fast' }, { id: 'smart', name: 'Smart' }]} value="fast" onValueChange={onValueChange} />
                <FluxAiSuggestions suggestions={[{ id: 'one', label: 'Summarize' }]} onSelect={onSelect} />
            </>
        );
        fireEvent.click(screen.getByRole('button', { name: /Fast/ }));
        fireEvent.click(screen.getByRole('menuitemradio', { name: /Smart/ }));
        expect(onValueChange).toHaveBeenCalledWith('smart');
        fireEvent.click(screen.getByRole('button', { name: 'Summarize' }));
        expect(onSelect).toHaveBeenCalledWith({ id: 'one', label: 'Summarize' });
    });

    it('groups conversation days and expands reasoning and tool results', () => {
        configureAi({ toolCall: { resultLimit: 4 } });
        render(
            <>
                <FluxAiConversation isGrouped>
                    <FluxAiMessage role="assistant" day="Today">
                        Answer
                    </FluxAiMessage>
                </FluxAiConversation>
                <FluxAiReasoning content="Because" />
                <FluxAiToolCall name="search" result="abcdefgh" />
            </>
        );
        expect(screen.getByText('Today')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /Reasoning/ }));
        expect(screen.getByText('Because')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /search/ }));
        expect(screen.getByText('abcd...')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Show full result' }));
        expect(screen.getByText('abcdefgh')).toBeInTheDocument();
        configureAi({ toolCall: { resultLimit: 900 } });
    });

    it('reports token totals and limit state', () => {
        render(<FluxAiUsage inputTokens={60} outputTokens={40} limit={100} cost="$0.01" />);
        expect(screen.getByText('Token limit reached')).toBeInTheDocument();
        expect(screen.getByText('100 of 100 tokens used')).toBeInTheDocument();
    });
});
