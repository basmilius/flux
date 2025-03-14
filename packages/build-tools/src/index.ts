import composePlugin from './compose';

export { composePlugin };

export const flux = composePlugin('@basmilius/flux', '$flux');
export const fluxDashboard = composePlugin('@basmilius/flux-dashboard', '$fluxDashboard');
