import type { FluxFilterTranslation } from '../../../../packages/filter/src/data/i18n';

export type Messages = Record<FluxFilterTranslation, string>;

export const nl: Messages = {
    'flux.back': 'Terug',
    'flux.customPeriod': 'Aangepaste periode',
    'flux.filter': 'Filter',
    'flux.filterRemove': 'Verwijder filter',
    'flux.filterReset': 'Verwijder alle filters',
    'flux.max': 'Maximaal',
    'flux.min': 'Minimaal',
    'flux.nSelected': '{n} geselecteerd'
};

export const fr: Messages = {
    'flux.back': 'Retour',
    'flux.customPeriod': 'Période personnalisée',
    'flux.filter': 'Filtrer',
    'flux.filterRemove': 'Supprimer le filtre',
    'flux.filterReset': 'Réinitialiser les filtres',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} sélectionné(s)'
};

export const de: Messages = {
    'flux.back': 'Zurück',
    'flux.customPeriod': 'Benutzerdefinierter Zeitraum',
    'flux.filter': 'Filter',
    'flux.filterRemove': 'Filter entfernen',
    'flux.filterReset': 'Filter zurücksetzen',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} ausgewählt'
};

export const sv: Messages = {
    'flux.back': 'Tillbaka',
    'flux.customPeriod': 'Anpassad period',
    'flux.filter': 'Filter',
    'flux.filterRemove': 'Ta bort filter',
    'flux.filterReset': 'Återställ filter',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} valda'
};
