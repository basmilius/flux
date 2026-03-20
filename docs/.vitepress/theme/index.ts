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
import Props from './Props.vue';
import RequiredIcons from './RequiredIcons.vue';
import RouterLink from './RouterLink.vue';
import Slots from './Slots.vue';
import Variants from './Variants.vue';

import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';

if (inBrowser) {
    Settings.defaultLocale = navigator.language;
}

fluxRegisterIcons(icons);

const theme: Theme = {
    Layout,
    enhanceApp: ({app}) => {
        app.use(createI18n({
            legacy: false,
            fallbackWarn: false,
            locale: 'en',
            missingWarn: false,
            messages: {
                en: {
                    'flux': {
                        back: 'Back',
                        cancel: 'Cancel',
                        comingSoon: 'Coming soon',
                        continue: 'Continue',
                        customPeriod: 'Custom period',
                        filter: 'Filter',
                        filterReset: 'Reset filters',
                        justNow: 'Just now',
                        max: 'Max',
                        min: 'Min',
                        nSelected: '{n} selected',
                        ok: 'Ok',
                        optional: 'Optional',
                        preview: 'Preview',
                        previewClose: 'Close preview',
                        displayingOf: '{from}–{to} of {total}',
                        showN: 'Show {n}',
                        next: 'Next',
                        noItems: 'There are no items (left).',
                        pagination: 'Pagination',
                        paginationNavigateTitle: 'Navigate',
                        paginationNavigateMessage: 'Please provide the desired page number you wish to navigate to.',
                        paginationNavigatePage: 'Page',
                        previous: 'Previous',
                        search: 'Search...',
                        sort: 'Sort',
                        sortAscending: 'Ascending',
                        sortDescending: 'Descending',
                        sortRemove: 'Remove sorting',
                        today: 'Today',
                        galleryPlaceholderButton: 'Pick image',
                        galleryPlaceholderMessage: 'Drop an image here or click the button to upload...',
                        galleryPlaceholderTitle: 'Gallery',
                        timezoneEurope: 'Europe',
                        timezoneAmerica: 'America',
                        timezoneUs: 'United States',
                        timezoneAustralia: 'Australia',
                        timezoneCanada: 'Canada',
                        timezoneMexico: 'Mexico',
                        timezoneAfrica: 'Africa',
                        timezoneAntarctica: 'Antarctica',
                        timezoneArctic: 'Arctic',
                        timezoneAsia: 'Asia',
                        timezoneAtlantic: 'Atlantic',
                        timezoneBrazil: 'Brazil',
                        timezoneChile: 'Chile',
                        timezoneEtc: 'ETC',
                        timezoneOther: 'Other',
                        timezoneIndian: 'Indian',
                        timezonePacific: 'Pacific'
                    }
                }
            }
        }) as any);

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
        app.component('Props', Props);
        app.component('RequiredIcons', RequiredIcons);
        app.component('RouterLink', RouterLink);
        app.component('Slots', Slots);
        app.component('Variants', Variants);
    }
};

export default theme;
