import { composePlugin } from '@basmilius/flux-internals';
import { name } from '../package.json' assert { type: 'json' };

export default composePlugin(name, '$fluxDashboard');
