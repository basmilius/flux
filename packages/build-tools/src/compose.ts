import { existsSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { Plugin, ResolvedConfig, UserConfig } from 'vite';

type PathGenerator = (name: string) => string;

const defaultSrcPathGenerator: PathGenerator = name => resolve(process.cwd(), `./node_modules/${name}/src`);
const defaultTsaPathGenerator: PathGenerator = name => `node_modules/${name}/src/*`;

export default (name: string, alias: string, srcPathGenerator?: PathGenerator, tsaPathGenerator?: PathGenerator): () => Plugin => {
    srcPathGenerator ??= defaultSrcPathGenerator;
    tsaPathGenerator ??= defaultTsaPathGenerator;

    const src = srcPathGenerator(name);

    return (): Plugin => ({
        name,

        config: (): UserConfig => ({
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

        configResolved(config: ResolvedConfig): void {
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

            tsconfig.compilerOptions.paths[key] = [tsaPathGenerator(name)];

            writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 4), {encoding: 'utf-8'});
        }
    });
};
