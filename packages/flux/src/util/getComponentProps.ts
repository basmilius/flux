import { camelizeTag } from '@/util';

export default function <T extends object>(component: any): T {
    return Object.fromEntries(
        Object.entries(component.props ?? {})
            .map(([key, value]) => [camelizeTag(key), value])
    ) as T;
}
