import { fluxRegisterIcons } from '@basmilius/flux';
import { createApp } from 'vue';
import { router } from './routes';

import * as icons from './icons';
import App from './App.vue';

import '@basmilius/flux/style.css';
import 'vue-highlight-code/dist/style.css';

import './defaults.scss';

fluxRegisterIcons(icons);

createApp(App)
    .use(router)
    .mount('#app');
