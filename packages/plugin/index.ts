import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';

export default (name: string, alias: string): () => Plugin => {
    const src = realpathSync(resolve(process.cwd(), `./node_modules/${name}/src`));

    return (): Plugin => ({
        name,

        config: () => ({
            optimizeDeps: {
                exclude: [name]
            },
            resolve: {
                alias: {
                    [name]: src,
                    [alias]: src
                }
            },
            server: {
                fs: {
                    allow: [src]
                }
            }
        }),

        configResolved(config) {
            const tsconfigPath = join(config.root, 'tsconfig.json');

            if (!existsSync(tsconfigPath)) {
                config.logger.error(`[${name}] Flux requires TypeScript and therefore a tsconfig.json. Please create one.`);
                process.exit(1);
            }

            const key = `${alias}/*`;
            const tsconfigData = readFileSync(tsconfigPath, {encoding: 'utf-8'});
            const tsconfig = JSON.parse(tsconfigData);
            tsconfig.compilerOptions.paths ??= {};

            if (key in tsconfig.compilerOptions.paths) {
                return;
            }

            tsconfig.compilerOptions.paths[key] = [`node_modules/${name}/src/*`];

            writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 4), {encoding: 'utf-8'});
        }
    });
};

/*
{
    "@/*": ["src/*"],
    "$flux/*": ["node_modules/@basmilius/flux/src/*"],
    "$fluxDashboard/*": ["node_modules/@basmilius/flux-dashboard/src/*"]
}
 */
