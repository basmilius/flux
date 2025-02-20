import 'vitepress/dist/client/theme-default/styles/vars.css';
import './override/base.css';
import 'vitepress/dist/client/theme-default/styles/icons.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css';
import './override/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';

import 'virtual:group-icons.css';

import '@basmilius/flux/style.css';
import './style.css';

import type { Theme } from 'vitepress';

import { fluxRegisterIcons } from '@basmilius/flux';
import * as icons from './icons';

fluxRegisterIcons(icons);

import ColorPalette from './ColorPalette.vue';
import ComponentGrid from './ComponentGrid.vue';
import ComponentGridIndex from './ComponentGridIndex.vue';
import ComponentGridItem from './ComponentGridItem.vue';
import Emits from './Emits.vue';
import FrontmatterDocs from './FrontmatterDocs.vue';
import Layout from './Layout.vue';
import Preview from './Preview.vue';
import Props from './Props.vue';
import RequiredIcons from './RequiredIcons.vue';
import RouterLink from './RouterLink.vue';
import Slots from './Slots.vue';
import Variants from './Variants.vue';

import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';

const theme: Theme = {
    Layout,
    enhanceApp: ({app}) => {
        app.component('Badge', VPBadge);
        app.component('ColorPalette', ColorPalette);
        app.component('ComponentGrid', ComponentGrid);
        app.component('ComponentGridIndex', ComponentGridIndex);
        app.component('ComponentGridItem', ComponentGridItem);
        app.component('Emits', Emits);
        app.component('FrontmatterDocs', FrontmatterDocs);
        app.component('Preview', Preview);
        app.component('Props', Props);
        app.component('RequiredIcons', RequiredIcons);
        app.component('RouterLink', RouterLink);
        app.component('Slots', Slots);
        app.component('Variants', Variants);
    }
};

export default theme;
