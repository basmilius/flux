import { camelCase } from 'lodash-es';

export default function <T extends object>(component: any): T {
    return Object.fromEntries(
        Object.entries(component.props ?? {})
            .map(([key, value]) => [camelCase(key), value])
    ) as T;
}
