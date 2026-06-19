import { createApp } from 'vue';
import { flux, i18n, router } from '@/app';

import '@flux-ui/components/css/index.scss';
import '@/assets/css/index.scss';

import Root from '@/Root.vue';

createApp(Root)
    .use(flux)
    .use(i18n)
    .use(router)
    .mount('#app');
