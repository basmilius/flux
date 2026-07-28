import { inject } from 'vue';
import { type Router, routerKey } from 'vue-router';

/**
 * Internal alias for vue-router's `useRouter`, injecting with an explicit
 * fallback: an app without a router gets `null` instead of an `undefined`
 * that throws on first read. Call sites fall back to plain history
 * navigation when there is no router.
 */
export default function (): Router | null {
    return inject(routerKey, null);
}
