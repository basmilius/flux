// @ts-nocheck
import { Settings } from 'luxon';
import { createI18n } from 'vue-i18n';

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

import './style.css';

import { inBrowser, type Theme } from 'vitepress';

import { fluxRegisterIcons } from '@flux-ui/components';
import * as icons from './icons';
import ColorPalette from './ColorPalette.vue';
import ComponentGrid from './ComponentGrid.vue';
import ComponentGridIndex from './ComponentGridIndex.vue';
import ComponentGridItem from './ComponentGridItem.vue';
import Emits from './Emits.vue';
import FluxView from './FluxView.vue';
import KeyboardShortcuts from './KeyboardShortcuts.vue';
import FrontmatterDocs from './FrontmatterDocs.vue';
import Layout from './Layout.vue';
import Preview from './Preview.vue';
import PreviewColumn from './PreviewColumn.vue';
import Props from './Props.vue';
import RequiredIcons from './RequiredIcons.vue';
import RouterLink from './RouterLink.vue';
import Slots from './Slots.vue';
import ThemePreview from './ThemePreview.vue';
import TokenTable from './TokenTable.vue';
import Variants from './Variants.vue';

import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';

if (inBrowser) {
    Settings.defaultLocale = navigator.language;
}

fluxRegisterIcons(icons);

const theme: Theme = {
    Layout,
    enhanceApp: ({app}) => {
        // No messages: the packages fall back to the English they ship with, which is
        // what a reader of these docs is meant to see. Every string on the page then
        // comes from the same place the translations pages list.
        app.use(createI18n({
            fallbackLocale: 'en',
            legacy: false,
            fallbackWarn: false,
            missingWarn: false,
            locale: 'en',
            messages: {
                en: {}
            }
        }));

        app.component('Badge', VPBadge);
        app.component('ColorPalette', ColorPalette);
        app.component('ComponentGrid', ComponentGrid);
        app.component('ComponentGridIndex', ComponentGridIndex);
        app.component('ComponentGridItem', ComponentGridItem);
        app.component('Emits', Emits);
        app.component('FluxView', FluxView);
        app.component('FrontmatterDocs', FrontmatterDocs);
        app.component('KeyboardShortcuts', KeyboardShortcuts);
        app.component('Preview', Preview);
        app.component('PreviewColumn', PreviewColumn);
        app.component('Props', Props);
        app.component('RequiredIcons', RequiredIcons);
        app.component('RouterLink', RouterLink);
        app.component('Slots', Slots);
        app.component('ThemePreview', ThemePreview);
        app.component('TokenTable', TokenTable);
        app.component('Variants', Variants);
    }
};

export default theme;
