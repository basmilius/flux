import { fluxRegisterIcons } from '@fancee/flux';
import { createApp } from 'vue';
import { router } from './routes';

import * as icons from './icons';
import App from './App.vue';

import '@fancee/flux/style.css';
import 'vue-highlight-code/dist/style.css';

import './defaults.scss';

fluxRegisterIcons(icons);

createApp(App)
    .use(router)
    .mount('#app');
