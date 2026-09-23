import { english as ai } from './ai';
import { english as application } from './application';
import { english as components } from './components';
import { english as filter } from './filter';
import { english as flow } from './flow';

export type FluxTranslate = (key: FluxTranslation, params?: Record<string, string | number>) => string;
export type FluxTranslation = keyof typeof english;

// One file per package keeps the docs pages and the translation check per package.
export const english: typeof components & typeof ai & typeof application & typeof filter & typeof flow = {
    ...components,
    ...ai,
    ...application,
    ...filter,
    ...flow
};
