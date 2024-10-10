import 'vitepress/dist/client/theme-default/styles/vars.css';
import './base.css';
import 'vitepress/dist/client/theme-default/styles/icons.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';

import '../../../src/css/variables/index.scss';
import './style.css';

// @ts-ignore
import { fluxRegisterIcons } from '@basmilius/flux';
import * as icons from './icons';
fluxRegisterIcons(icons);

import ColorPalette from './ColorPalette.vue';
import Emits from './Emits.vue';
import FrontmatterDocs from './FrontmatterDocs.vue';
import Layout from './Layout.vue';
import Preview from './Preview.vue';
import Props from './Props.vue';
import RequiredIcons from './RequiredIcons.vue';
import RouterLink from './RouterLink.vue';

import type { Theme } from 'vitepress';

import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue';
// import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';
// import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
// import VPHomeContent from 'vitepress/dist/client/theme-default/components/VPHomeContent.vue';
// import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue';
// import VPHomeFeatures from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue';
// import VPHomeSponsors from 'vitepress/dist/client/theme-default/components/VPHomeSponsors.vue';
// import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
// import VPDocAsideSponsors from 'vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue';
// import VPSocialLink from 'vitepress/dist/client/theme-default/components/VPSocialLink.vue';
// import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue';
// import VPSponsors from 'vitepress/dist/client/theme-default/components/VPSponsors.vue';
// import VPTeamPage from 'vitepress/dist/client/theme-default/components/VPTeamPage.vue';
// import VPTeamPageTitle from 'vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue';
// import VPTeamPageSection from 'vitepress/dist/client/theme-default/components/VPTeamPageSection.vue';
// import VPTeamMembers from 'vitepress/dist/client/theme-default/components/VPTeamMembers.vue';

export { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar';
export { useLocalNav } from 'vitepress/dist/client/theme-default/composables/local-nav';

const theme: Theme = {
    Layout,
    enhanceApp: ({app}) => {
        app.component('Badge', VPBadge);
        app.component('ColorPalette', ColorPalette);
        app.component('Emits', Emits);
        app.component('FrontmatterDocs', FrontmatterDocs);
        app.component('Preview', Preview);
        app.component('Props', Props);
        app.component('RequiredIcons', RequiredIcons);
        app.component('RouterLink', RouterLink);
    }
};

export default theme;
