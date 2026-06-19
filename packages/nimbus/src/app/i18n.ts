import { createI18n } from 'vue-i18n';

// @flux-ui/statistics requires a registered vue-i18n instance. Flux components
// keep their own built-in English strings as long as no global `$t` is injected,
// so `globalInjection` stays false — otherwise the UI would show raw keys like
// `(flux.optional)`. Statistics translates series names via `useI18n()` and falls
// back to the raw name when a key is missing (warnings are silenced).
export default createI18n({
    legacy: false,
    globalInjection: false,
    locale: 'en',
    fallbackLocale: 'en',
    missingWarn: false,
    fallbackWarn: false
});
