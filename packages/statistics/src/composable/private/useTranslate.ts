import { createTranslate } from '@flux-ui/internals';
import type { Translator } from '~flux/statistics/util';

const translate = createTranslate();

/**
 * Puts a series, slice or axis name the consumer supplied through the app's
 * translations. A name without a message behind it is handed back untouched,
 * which is what lets a chart take labels that are already in the reader's
 * language.
 */
export default function useTranslate(): Translator {
    return translate();
}
