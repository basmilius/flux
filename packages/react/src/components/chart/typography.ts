// Canvas text presets. zrender joins `[fontStyle, fontWeight, fontSize, fontFamily]` into a font
// shorthand and assigns it to `ctx.font`. `fontFamily: 'inherit'` is not a valid family name there,
// so the browser rejects the whole shorthand: the fontSize is dropped along with it and the text
// silently falls back to the ECharts default (12px sans-serif). Canvas text therefore always needs a
// real family. The `var(...)` values are resolved by `deepResolveCssVars` right before `setOption`,
// and zrender passes a resolved 'px' string through untouched.
//
// Never use these in `tooltip.textStyle`: tooltips render as HTML and ECharts' TooltipHTMLContent
// derives its line height from `Math.round(fontSize * 3 / 2)`, which is NaN for a string.

export const CHART_FONT_FAMILY = 'var(--font-sans)';

export const CHART_TEXT_2XSMALL = {
    fontSize: 'var(--font-size-2xsmall)',
    fontFamily: CHART_FONT_FAMILY
} as const;

export const CHART_TEXT_XSMALL = {
    fontSize: 'var(--font-size-xsmall)',
    fontFamily: CHART_FONT_FAMILY
} as const;
