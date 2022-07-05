const { build } = require('esbuild');
const replace = require('replace-in-file');

const contracts = ['/LikeContract/contract.ts'];

build({
    entryPoints: contracts.map((source) => {
        return `./backend/contracts${source}`;
    }),
    outbase: './backend/contracts',
    outdir: './contracts-dist',
    minify: false,
    bundle: true,
    format: 'iife',
})
    .catch(() => process.exit(1))
    // note: Warp SDK currently does not support files in IIFE bundle format, so we need to remove the "iife" part ;-)
    // update: it does since 0.4.31, but because viewblock.io is still incompatibile with this version, leaving as is for now.
    .finally(() => {
        const files = contracts.map((source) => {
            return `./contracts-dist${source}`.replace('.ts', '.js');
        });
        replace.sync({
            files: files,
            from: [/\(\(\) => {/g, /}\)\(\);/g],
            to: '',
            countMatches: true,
        });
    });