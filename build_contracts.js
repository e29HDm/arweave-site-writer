const { build } = require('esbuild');
const replace = require('replace-in-file');

const contracts = ['/LikeContract/contract.ts'];

const distFolder = './dist-contracts';
const baseSourceFolder = './backend/contracts';

build({
    entryPoints: contracts.map((source) => {
        return `${baseSourceFolder}${source}`;
    }),
    outbase: baseSourceFolder,
    outdir: distFolder,
    minify: false,
    bundle: true,
    format: 'iife',
})
    .catch(() => process.exit(1))
    // note: Warp SDK currently does not support files in IIFE bundle format, so we need to remove the "iife" part ;-)
    // update: it does since 0.4.31, but because viewblock.io is still incompatibile with this version, leaving as is for now.
    .finally(() => {
        const files = contracts.map((source) => {
            return `${distFolder}${source}`.replace('.ts', '.js');
        });
        replace.sync({
            files: files,
            from: [/\(\(\) => {/g, /}\)\(\);/g],
            to: '',
            countMatches: true,
        });
    });