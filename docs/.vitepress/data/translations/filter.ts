import type { english } from '../../../../packages/internals/src/data/i18n/filter';

export type Messages = Record<keyof typeof english, string>;

export const nl: Messages = {
    'flux.back': 'Terug',
    'flux.customPeriod': 'Aangepaste periode',
    'flux.filterRemove': 'Verwijder filter',
    'flux.max': 'Maximaal',
    'flux.min': 'Minimaal',
    'flux.nSelected': '{n} geselecteerd'
};

export const fr: Messages = {
    'flux.back': 'Retour',
    'flux.customPeriod': 'Période personnalisée',
    'flux.filterRemove': 'Supprimer le filtre',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} sélectionné(s)'
};

export const de: Messages = {
    'flux.back': 'Zurück',
    'flux.customPeriod': 'Benutzerdefinierter Zeitraum',
    'flux.filterRemove': 'Filter entfernen',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} ausgewählt'
};

export const sv: Messages = {
    'flux.back': 'Tillbaka',
    'flux.customPeriod': 'Anpassad period',
    'flux.filterRemove': 'Ta bort filter',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} valda'
};
