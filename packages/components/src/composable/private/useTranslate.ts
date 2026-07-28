import { createTranslate } from '@flux-ui/internals';
import { english, type FluxTranslate } from '~flux/components/data';

const translate = createTranslate(english);

/**
 * Resolves the strings the components render. A key the app translated wins, and
 * everything else falls back to the English dictionary that ships with it.
 */
export default (): FluxTranslate => translate();
