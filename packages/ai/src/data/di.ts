import type { InjectionKey } from 'vue';

export const FluxAiConversationInjectionKey: InjectionKey<FluxAiConversationInjection> = Symbol();

export type FluxAiConversationInjection = {
    scrollToBottom(): void;
};
