import { inject } from 'vue';
import { type RouteLocationNormalizedLoaded, routeLocationKey } from 'vue-router';

/**
 * Internal alias for vue-router's `useRoute`. Exists so the rest of the
 * package can import a single, controlled `useRoute` symbol, making it
 * trivial to swap in a wrapper later (e.g. modal-aware variants) without
 * touching every call site.
 *
 * Unlike vue-router's own version this injects with an explicit fallback,
 * so an app without a router gets `null` instead of an `undefined` that
 * throws on first read. Call sites skip their routing behavior when there
 * is no route.
 */
export default function (): RouteLocationNormalizedLoaded | null {
    return inject(routeLocationKey, null);
}
