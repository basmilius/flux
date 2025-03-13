import { realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

const SRC = realpathSync(resolve(process.cwd(), './node_modules/@basmilius/flux/src'));

export default (): Plugin => ({
    name: '@basmilius/flux',

    config: () => ({
        resolve: {
            alias: {
                '@basmilius/flux': SRC,
                '$flux': SRC
            }
        },
        server: {
            fs: {
                allow: [SRC]
            }
        }
    })
});
