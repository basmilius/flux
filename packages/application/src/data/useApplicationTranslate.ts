import { createTranslate } from '@flux-ui/internals';
import { english, type FluxApplicationTranslate } from './i18n';

const translate = createTranslate(english);

/**
 * Resolves the strings this package renders. A key the app translated wins, and
 * everything else falls back to the English dictionary that ships with it.
 */
export const useApplicationTranslate = (): FluxApplicationTranslate => translate();
