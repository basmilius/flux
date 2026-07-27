import { inject } from 'vue';
import { type RouteLocationNormalizedLoaded, routeLocationKey } from 'vue-router';

/**
 * Internal alias for vue-router's `useRoute`, injecting with an explicit
 * fallback: an app without a router gets `null` instead of an `undefined`
 * that throws on first read. Call sites skip their routing behavior when
 * there is no route.
 */
export default function (): RouteLocationNormalizedLoaded | null {
    return inject(routeLocationKey, null);
}
