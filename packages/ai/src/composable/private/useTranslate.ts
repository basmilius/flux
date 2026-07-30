import { createTranslate } from '@flux-ui/internals';
import { english, type FluxAiTranslate } from '~flux/ai/data';

const translate = createTranslate(english);

/**
 * Resolves the strings this package renders. A key the app translated wins, and
 * everything else falls back to the English dictionary that ships with it.
 */
export default function useTranslate(): FluxAiTranslate {
    return translate();
}
