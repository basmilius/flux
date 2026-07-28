export type FluxApplicationTranslate = (key: FluxApplicationTranslation, params?: Record<string, string | number>) => string;
export type FluxApplicationTranslation = keyof typeof english;

export const english = {
    'flux.application.back': 'Back',
    'flux.application.closeMenu': 'Close menu',
    'flux.application.closePanel': 'Close panel',
    'flux.application.statusErrorDescription': 'We could not load this page. Try again in a moment.',
    'flux.application.statusErrorTitle': 'Something went wrong',
    'flux.application.statusMaintenanceDescription': 'We are making some improvements. Please check back shortly.',
    'flux.application.statusMaintenanceTitle': 'Down for maintenance',
    'flux.application.statusNotFoundDescription': 'This page does not exist, or it moved somewhere else.',
    'flux.application.statusNotFoundTitle': 'Page not found',
    'flux.application.statusOfflineDescription': 'Check your network and try again.',
    'flux.application.statusOfflineTitle': 'No connection',
    'flux.application.toggleMenu': 'Toggle menu'
} as const;
