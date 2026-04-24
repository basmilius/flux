import { computed, type ComputedRef, type Ref, unref } from 'vue';
import type { RouteRecordNormalized } from 'vue-router';
import useRoute from './useRoute';

/**
 * Returns **all** matched route records that expose a named view with
 * the given `name`, paired with their depth in `route.matched`. Powers
 * `<FluxApplicationMenuContextStack>` so every level of a nested route
 * tree can render its own menu component (instead of vue-router's
 * default behaviour of only rendering the deepest one).
 */
export default function (nameRef: Ref<string> | string): ComputedRef<NamedRouteMatch[]> {
    const route = useRoute();

    return computed(() => {
        const name = unref(nameRef);
        const matches: NamedRouteMatch[] = [];

        route.matched.forEach((record, depth) => {
            if (!record.components || !(name in record.components)) {
                return;
            }

            matches.push({depth, record});
        });

        return matches;
    });
}

export type NamedRouteMatch = {
    readonly depth: number;
    readonly record: RouteRecordNormalized;
};
