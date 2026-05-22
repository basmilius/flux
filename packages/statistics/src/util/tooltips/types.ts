import type { FluxIconName } from '@flux-ui/types';

export interface TooltipParam {
    readonly seriesName?: string;
    readonly seriesIndex: number;
    readonly color: string;
    readonly value: number | string | (number | string)[];
    readonly name: string;
    readonly dataIndex?: number;
    readonly axisValue?: string;
    readonly axisValueLabel?: string;
    readonly data?: unknown;
    readonly marker?: string;
}

export type TooltipStyleClasses = Readonly<Record<string, string>>;

export type Translator = (key: string) => string;

export interface SharedTooltipItem {
    readonly name: string;
    readonly value: number | string;
    readonly color: string;
    readonly icon?: FluxIconName;
    readonly seriesIndex?: number;
    readonly dataIndex?: number;
}

export type ChartTooltipValueFormatter = (value: number | string, item: SharedTooltipItem) => string;
