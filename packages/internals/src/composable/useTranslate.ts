import { english, type FluxTranslate } from '../data/i18n';
import { createTranslate } from './createTranslate';

const translate = createTranslate(english);

/**
 * Resolves the strings the Flux packages render. A key the app translated wins, and
 * everything else falls back to the English dictionary that ships with Flux.
 */
export default function useTranslate(): FluxTranslate {
    return translate();
}
