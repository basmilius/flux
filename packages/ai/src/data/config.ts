import { reactive } from 'vue';

export type FluxAiStreamingConfig = {
    /**
     * Fades every word in as it arrives. Turning this off renders a growing
     * response without any transition at all.
     */
    hasFade: boolean;
    fadeDuration: number;
};

export type FluxAiToolCallConfig = {
    /**
     * Past this many characters the tail of a result moves behind a button,
     * because a result that long stops being scannable.
     */
    resultLimit: number;
};

export type FluxAiConfig = {
    streaming: FluxAiStreamingConfig;
    toolCall: FluxAiToolCallConfig;
};

export type ConfigureAiOptions = {
    readonly streaming?: Partial<FluxAiStreamingConfig>;
    readonly toolCall?: Partial<FluxAiToolCallConfig>;
};

export const aiConfig: FluxAiConfig = reactive({
    streaming: {
        hasFade: true,
        fadeDuration: 300
    },
    toolCall: {
        resultLimit: 900
    }
});

/**
 * Overrides how the components in this package behave. Every section is merged,
 * so naming one option leaves the others as they are. What they say is a
 * translation, not a configuration.
 */
export function configureAi(options: ConfigureAiOptions): void {
    if (options.streaming) {
        Object.assign(aiConfig.streaming, options.streaming);
    }

    if (options.toolCall) {
        Object.assign(aiConfig.toolCall, options.toolCall);
    }
}
