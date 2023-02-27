import { fluxRegisterIcons } from '@fancee/flux';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import * as icons from './icons';
import App from './App.vue';

import '@fancee/flux/style.css';
import './reset.scss';
import './defaults.scss';

const pinia = createPinia();

fluxRegisterIcons(icons);

createApp(App)
    .use(pinia)
    .mount('#app');
