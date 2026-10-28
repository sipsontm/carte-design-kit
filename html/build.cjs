/* Explicit presentation-only export; no credentials or live analytics. */
const fs = require('fs'), path = require('path');
const kit = __dirname, root = path.dirname(kit), assets = path.join(kit, 'assets');
fs.mkdirSync(assets, { recursive: true });
const files = ['components/charts/StatCard.tsx', 'components/charts/ChartCard.tsx', 'components/charts/TrendArea.tsx', 'components/charts/VerticalBars.tsx', 'components/charts/BarList.tsx', 'components/charts/DonutChart.tsx', 'components/charts/EmptyState.tsx', 'components/explainer/MetricInfo.tsx', 'components/ui/card.tsx', 'components/ui/popover.tsx', 'lib/utils.ts', 'lib/format.ts', 'lib/metrics-catalog.ts', 'lib/analytics/types.ts'];
async function build() {
    if (process.argv.includes('--sync-dashboard') && fs.existsSync(path.join(root, 'app/globals.css'))) {
        for (const file of files) {
            const target = path.join(kit, 'source', file);
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.copyFileSync(path.join(root, file), target);
        }
        fs.copyFileSync(path.join(root, 'app/globals.css'), path.join(kit, 'source/dashboard.css'));
    }
    const css = fs.readFileSync(path.join(kit, 'source/dashboard.css'), 'utf8');
    const result = await require('postcss')([require('@tailwindcss/postcss')({ base: kit })]).process(css, { from: path.join(kit, 'source/dashboard.css') });
    fs.writeFileSync(path.join(assets, 'dashboard.css'), result.css);
    const chunks = path.join(root, '.next/dev/static/chunks');
    if (process.argv.includes('--sync-dashboard') && fs.existsSync(chunks)) {
        const fontFile = fs.readdirSync(chunks).find(f => f.includes('hanken_grotesk') && f.endsWith('.css'));
        if (fontFile) {
            let fonts = fs.readFileSync(path.join(chunks, fontFile), 'utf8');
            fonts = fonts.replace(/\.\.\/media\/([^\s)"']+)/g, (_, name) => { fs.copyFileSync(path.join(root, '.next/dev/static/media', name), path.join(assets, name)); return './' + name; }).replace(/\/\*# sourceMappingURL=.*?\*\//g, '').replace(/U\+\?\?/g, 'U+0-FF');
            fs.writeFileSync(path.join(assets, 'fonts.css'), fonts);
        }
    }
    if (!fs.existsSync(path.join(assets, 'fonts.css')))
        throw Error('Keep assets/fonts.css and its woff2 files with this kit.');
    let webpack;
    try {
        webpack = require('webpack');
    }
    catch {
        webpack = require('next/dist/compiled/webpack/webpack').webpack;
    }
    const stats = await new Promise((resolve, reject) => webpack({ mode: 'production', context: kit, entry: path.join(kit, 'src/demo.jsx'), output: { path: assets, filename: 'demo.js' }, resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'], alias: { '@': path.join(kit, 'source'), 'next/link': path.join(kit, 'src/link.jsx') } }, module: { rules: [{ test: /\.md$/, type: 'asset/source' }, { test: /\.[jt]sx?$/, exclude: /node_modules/, use: path.join(kit, 'typescript-loader.cjs') }] }, optimization: { minimize: false }, performance: { hints: false }, devtool: false }, (error, stats) => error ? reject(error) : stats.hasErrors() ? reject(Error(stats.toString({ all: false, errors: true }))) : resolve(stats)));
    const notices = new Map();
    function collect(modules) {
        for (const module of modules || []) {
            if (module.modules) collect(module.modules);
            let folder = module.nameForCondition && path.dirname(module.nameForCondition);
            if (!folder || !folder.includes('node_modules')) continue;
            while (folder.includes('node_modules')) {
                if (fs.existsSync(path.join(folder, 'package.json'))) {
                    const meta = JSON.parse(fs.readFileSync(path.join(folder, 'package.json'), 'utf8'));
                    const licenseFiles = fs.readdirSync(folder).filter(f => /^licen[cs]e(?:\..*)?$/i.test(f));
                    const license = licenseFiles.map(f => fs.readFileSync(path.join(folder, f), 'utf8')).join('\n');
                    notices.set(meta.name, `${meta.name} ${meta.version}\n${meta.license || ''}\n${license || 'See package distribution for full license.'}`);
                    break;
                }
                folder = path.dirname(folder);
            }
        }
    }
    collect(stats.toJson({ all: false, modules: true, nestedModules: true }).modules);
    fs.mkdirSync(path.join(kit, 'licenses'), { recursive: true });
    fs.writeFileSync(path.join(kit, 'licenses/THIRD-PARTY.txt'), [...notices.values()].join('\n\n------------------------------------------------------------\n\n'));
    console.log('Built offline design-system.html using original dashboard presentation components.');
}
build().catch(error => { console.error(error); process.exitCode = 1; });
