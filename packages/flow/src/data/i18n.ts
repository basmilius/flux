export type FluxFlowTranslate = (key: FluxFlowTranslation, params?: Record<string, string | number>) => string;
export type FluxFlowTranslation = keyof typeof english;

export const english = {
    'flux.flow.exitFullscreen': 'Exit fullscreen',
    'flux.flow.fitView': 'Fit view',
    'flux.flow.fullscreen': 'Fullscreen',
    'flux.flow.zoom': 'Zoom',
    'flux.flow.zoomIn': 'Zoom in',
    'flux.flow.zoomOut': 'Zoom out'
} as const;
