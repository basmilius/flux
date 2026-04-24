import { type RouteLocationNormalizedLoaded, useRoute as useVueRoute } from 'vue-router';

/**
 * Internal alias for vue-router's `useRoute`. Exists so the rest of the
 * package can import a single, controlled `useRoute` symbol — making it
 * trivial to swap in a wrapper later (e.g. modal-aware variants) without
 * touching every call site.
 */
export default function (): RouteLocationNormalizedLoaded {
    return useVueRoute();
}
