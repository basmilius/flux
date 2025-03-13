import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

const SRC = realpathSync(resolve(process.cwd(), './node_modules/@basmilius/flux-dashboard/src'));

export default (): Plugin => ({
    name: '@basmilius/flux-dashboard',

    config: () => ({
        resolve: {
            alias: {
                '@basmilius/flux-dashboard': SRC,
                '$fluxDashboard': SRC
            }
        },
        server: {
            fs: {
                allow: [SRC]
            }
        }
    })
});
