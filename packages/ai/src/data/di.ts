import type { InjectionKey } from 'vue';

export const FluxAiConversationInjectionKey: InjectionKey<FluxAiConversationInjection> = Symbol();

export type FluxAiConversationInjection = {
    /**
     * Scrolls the conversation to its newest turn and resumes following the tail.
     */
    scrollToBottom(): void;
};
