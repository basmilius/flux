export type BorderBeamVariant = 'sm' | 'md' | 'line' | 'pulse-inner' | 'pulse-outside';

export type HighlighterVariant = 'highlight' | 'box' | 'circle' | 'underline' | 'strike-through' | 'crossed-off' | 'bracket';

export type HighlighterGroupProps = {
    readonly variant?: HighlighterVariant;
    readonly color?: string;
    readonly strokeWidth?: number;
    readonly animationDuration?: number;
    readonly iterations?: number;
    readonly padding?: number;
    readonly multiline?: boolean;
    readonly whenInView?: boolean;
};
