export type FluxVisualBorderBeamVariant = 'sm' | 'md' | 'line' | 'pulse-inner' | 'pulse-outside';

export type FluxVisualHighlighterVariant = 'highlight' | 'box' | 'circle' | 'underline' | 'strike-through' | 'crossed-off' | 'bracket';

export type FluxVisualHighlighterGroupProps = {
    readonly variant?: FluxVisualHighlighterVariant;
    readonly color?: string;
    readonly strokeWidth?: number;
    readonly animationDuration?: number;
    readonly iterations?: number;
    readonly padding?: number;
    readonly multiline?: boolean;
    readonly whenInView?: boolean;
};
