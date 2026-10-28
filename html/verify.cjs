/* Browser smoke tests; all mutations occur in an isolated temporary browser context. */
const fs = require('fs'), path = require('path'), assert = require('assert/strict'), crypto = require('crypto');
let chromium;
try {
    ({ chromium } = require('playwright'));
}
catch {
    ({ chromium } = require('C:/Users/rusuc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
}
const out = path.join(__dirname, 'verification');
fs.mkdirSync(out, { recursive: true });
const url = require('url').pathToFileURL(path.join(__dirname, 'design-system.html')).href;
const results = [], errors = [], external = [];
function pass(name, details) { results.push({ name, status: 'passed', details }); console.log('PASS ' + name); }
async function run() {
    const executable = process.env.BROWSER_EXECUTABLE || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
    const browser = await chromium.launch({ headless: true, ...(executable ? { executablePath: executable } : {}) });
    try {
        const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, acceptDownloads: true });
        const p = await context.newPage();
        p.on('pageerror', e => errors.push(e.message));
        p.on('request', req => { if (/^https?:/.test(req.url()))
            external.push(req.url()); });
        await p.goto(url);
        await p.locator('[data-slot=card]').first().waitFor();
        await p.evaluate(() => document.fonts.ready);
        const route = async (id) => { await p.evaluate(id => { location.hash = id; }, id); await p.waitForTimeout(100); };
        const shot = async (name) => { await p.screenshot({ path: path.join(out, name + '.png'), fullPage: true }); };
        const geometry = await p.evaluate(() => { const kpi = document.querySelector('[data-slot=card]'), chart = document.querySelectorAll('[data-slot=card]')[4]; const rect = e => Object.fromEntries(['x', 'y', 'width', 'height'].map(k => [k, e.getBoundingClientRect()[k]])); return { canvas: rect(document.querySelector('.kit-canvas')), sidebar: rect(document.querySelector('.kit-sidebar')), kpi: rect(kpi), chart: rect(chart), gap: getComputedStyle(document.querySelector('.kit-stats')).gap, kpiPadding: getComputedStyle(kpi).padding, chartPadding: getComputedStyle(chart).padding, kpiNumberMargin: getComputedStyle(kpi.querySelectorAll('p')[1]).marginTop, chartSubtitleMargin: getComputedStyle(chart.querySelector('p')).marginTop, radius: getComputedStyle(kpi).borderRadius, font: getComputedStyle(kpi).fontFamily, fontLoaded: document.fonts.check('700 30px "Hanken Grotesk"') }; });
        assert.equal(geometry.canvas.width, 1280);
        assert.equal(geometry.sidebar.width, 264);
        assert.equal(geometry.kpi.width, 308);
        assert.equal(geometry.gap, '16px');
        assert.equal(geometry.kpiPadding, '20px');
        assert.equal(geometry.chartPadding, '24px');
        assert.equal(geometry.kpiNumberMargin, '10px');
        assert.equal(geometry.chartSubtitleMargin, '8px');
        assert.equal(geometry.radius, '12px');
        assert(geometry.fontLoaded);
        pass('Original layout measurements and local font', geometry);
        await shot('overview-desktop');
        await p.getByRole('button', { name: 'What is Views (30 days)?', exact: true }).first().click();
        await p.getByText('COUNT(page_view events) over the trailing 30 days', { exact: true }).waitFor();
        await p.keyboard.press('Escape');
        pass('Original metric explainer popover');
        const ids = ['overview', 'analytics', 'records', 'board', 'calendar', 'detail', 'settings', 'billing', 'components', 'foundations', 'signin'];
        for (const id of ids) {
            await route(id);
            await p.locator('main').waitFor();
            assert((await p.locator('main').innerText()).length > 30);
            await shot(id + '-desktop');
        }
        pass('All 11 page templates render');
        await route('records');
        await p.getByRole('button', { name: 'New project', exact: true }).click();
        await p.getByLabel('Project name', { exact: true }).fill('QA project');
        await p.getByLabel('Owner', { exact: true }).fill('Test Owner');
        await p.getByRole('button', { name: 'Create project', exact: true }).click();
        await p.getByLabel('Search projects', { exact: true }).fill('QA project');
        assert.equal(await p.locator('tbody tr').count(), 1);
        await p.getByRole('button', { name: 'Edit', exact: true }).click();
        await p.getByLabel('Progress (%)').fill('42');
        await p.getByRole('button', { name: 'Save project', exact: true }).click();
        assert((await p.locator('tbody').innerText()).includes('42%'));
        pass('Project create, search and edit');
        await p.reload();
        await p.getByLabel('Search projects', { exact: true }).fill('QA project');
        assert.equal(await p.locator('tbody tr').count(), 1);
        pass('Project persists across reload');
        const dl = p.waitForEvent('download');
        await p.getByRole('button', { name: 'Export CSV' }).click();
        const exported = await dl;
        assert.equal(exported.suggestedFilename(), 'carte-projects-demo.csv');
        const csv = fs.readFileSync(await exported.path(), 'utf8');
        assert(csv.includes('QA project'));
        pass('CSV export contains filtered records');
        await p.getByLabel('Select QA project', { exact: true }).check();
        await p.getByRole('button', { name: 'Delete 1', exact: true }).click();
        await p.getByRole('button', { name: 'Cancel', exact: true }).click();
        assert.equal(await p.locator('tbody tr').count(), 1);
        await p.getByRole('button', { name: 'Delete 1', exact: true }).click();
        await p.getByRole('button', { name: 'Confirm', exact: true }).click();
        assert.equal(await p.locator('tbody tr').count(), 0);
        pass('Bulk delete requires confirmation and supports cancellation');
        await p.getByRole('button', { name: 'Clear filters', exact: true }).click();
        assert.equal(await p.locator('tbody tr').count(), 5);
        await p.getByRole('button', { name: 'Next', exact: true }).click();
        assert.equal(await p.locator('tbody tr').count(), 1);
        await p.getByLabel('Filter status').selectOption('Review');
        assert.equal(await p.locator('tbody tr').count(), 2);
        await p.getByRole('button', { name: 'Project ↑', exact: true }).click();
        assert((await p.locator('tbody tr').first().innerText()).includes('Partner onboarding'));
        pass('Pagination, status filter and sort');
        await route('board');
        const task = p.locator('.kit-task').filter({ hasText: 'Customer portal' });
        await task.getByLabel('Move to').selectOption('Review');
        assert((await task.locator('..').innerText()).startsWith('Review'));
        await task.getByRole('button', { name: 'Customer portal', exact: true }).click();
        await p.getByRole('tab', { name: 'Tasks', exact: true }).click();
        await p.getByLabel('Confirm the brief').check();
        await p.reload();
        await p.getByRole('tab', { name: 'Tasks', exact: true }).click();
        assert(await p.getByLabel('Confirm the brief').isChecked());
        pass('Board move, detail navigation and task persistence');
        await route('calendar');
        await p.getByRole('button', { name: 'Add event on 2026-10-15', exact: true }).click();
        await p.getByLabel('Title', { exact: true }).fill('QA event');
        await p.getByRole('button', { name: 'Save event', exact: true }).click();
        await p.getByRole('button', { name: 'QA event', exact: true }).click();
        await p.getByLabel('Title', { exact: true }).fill('QA revised');
        await p.getByRole('button', { name: 'Save event', exact: true }).click();
        await p.getByRole('button', { name: 'Next month', exact: true }).click();
        assert((await p.locator('main h2').innerText()).includes('November'));
        await p.getByRole('button', { name: 'Previous month', exact: true }).click();
        await p.getByRole('button', { name: 'QA revised', exact: true }).click();
        await p.getByRole('button', { name: 'Delete event', exact: true }).click();
        assert.equal(await p.getByRole('button', { name: 'QA revised', exact: true }).count(), 0);
        pass('Calendar month navigation and event create/edit/delete');
        await route('settings');
        await p.getByLabel('Workspace name', { exact: true }).fill('QA workspace');
        await p.getByRole('button', { name: 'Save changes', exact: true }).click();
        await p.getByRole('switch', { name: 'Weekly digest', exact: true }).click();
        await p.reload();
        assert.equal(await p.getByLabel('Workspace name', { exact: true }).inputValue(), 'QA workspace');
        assert.equal(await p.getByRole('switch', { name: 'Weekly digest', exact: true }).getAttribute('aria-checked'), 'false');
        pass('Settings fields and switches persist');
        await route('billing');
        await p.getByRole('button', { name: 'Choose Business', exact: true }).click();
        await p.getByRole('button', { name: 'Confirm', exact: true }).click();
        assert((await p.locator('.kit-panel').filter({ has: p.getByRole('heading', { name: 'Business', exact: true }) }).innerText()).includes('Current plan'));
        const receipt = p.waitForEvent('download');
        await p.getByRole('button', { name: 'Download', exact: true }).first().click();
        assert(fs.readFileSync(await (await receipt).path(), 'utf8').includes('NOT A TAX INVOICE'));
        pass('Demo plan change and labeled receipt download');
        await route('components');
        for (const s of ['Loading', 'Empty', 'Error']) {
            await p.getByLabel('Component state').selectOption(s);
            assert((await p.locator('main').innerText()).length > 100);
        }
        await p.getByRole('button', { name: 'Try again', exact: true }).click();
        assert.equal(await p.getByLabel('Component state').inputValue(), 'Ready');
        await p.getByRole('button', { name: 'Create', exact: true }).click();
        await p.keyboard.press('Shift+Tab');
        assert.equal(await p.evaluate(() => document.activeElement.textContent), 'Cancel');
        await p.keyboard.press('Tab');
        assert.equal(await p.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Close dialog');
        await p.keyboard.press('Escape');
        assert.equal(await p.getByRole('dialog').count(), 0);
        assert.equal(await p.evaluate(() => document.activeElement.textContent), 'Create');
        pass('Component states, retry, dialog focus trap, Escape and focus return');
        await p.getByRole('button', { name: 'Drawer', exact: true }).click();
        await p.getByRole('button', { name: 'Mark all as read', exact: true }).click();
        assert(await p.getByRole('button', { name: 'Mark all as read', exact: true }).isDisabled());
        await p.keyboard.press('Escape');
        await p.getByRole('button', { name: 'Toast', exact: true }).click();
        await p.getByRole('status').filter({ hasText: 'Your changes have been saved.' }).waitFor();
        pass('Drawer notifications and toast');
        await p.getByRole('button', { name: 'Ask AI', exact: true }).click();
        await p.getByRole('button', { name: 'What makes this layout exact?', exact: true }).click();
        assert((await p.getByRole('dialog').innerText()).includes('StatCard'));
        await p.keyboard.press('Escape');
        pass('Clearly labeled local AI-interface explainer');
        await route('analytics');
        const initial = await p.locator('[data-slot=card]').first().innerText();
        await p.getByLabel('Report period').selectOption('7');
        assert.notEqual(await p.locator('[data-slot=card]').first().innerText(), initial);
        pass('Analytics period changes sample aggregates');
        await route('signin');
        await p.getByRole('button', { name: 'Sign in to demo' }).click();
        assert.equal(await p.locator('input:invalid').count(), 2);
        await p.getByLabel('Email address', { exact: true }).fill('test@example.com');
        await p.getByLabel('Password', { exact: true }).fill('fictional-only-123');
        await p.getByRole('button', { name: 'Sign in to demo' }).click();
        await p.waitForURL('**#overview');
        pass('Sign-in validation and simulated success');
        await route('foundations');
        for (const filename of ['REUSE-PROMPT.md', 'DESIGN-SYSTEM.md']) {
            assert(fs.existsSync(path.join(__dirname, filename)));
            const downloading = p.waitForEvent('download');
            await p.locator(`a[href="${filename}"]`).click();
            assert.equal((await downloading).suggestedFilename(), filename);
        }
        pass('Documentation download links');
        await route('settings');
        await p.getByRole('button', { name: 'Reset demo data', exact: true }).click();
        await p.getByRole('button', { name: 'Confirm', exact: true }).click();
        await p.reload();
        assert.equal(await p.getByLabel('Workspace name', { exact: true }).inputValue(), 'Carte workspace');
        pass('Confirmed local demo reset');
        await route('overview');
        await p.getByRole('button', { name: 'Switch to dark mode', exact: true }).click();
        await p.reload();
        assert.equal(await p.locator('html').getAttribute('class'), 'dark');
        await shot('overview-dark');
        await p.getByRole('button', { name: 'Switch to light mode', exact: true }).click();
        pass('Dark mode persists and renders');
        for (const width of [1920, 1440, 768, 390, 320]) {
            await p.setViewportSize({ width, height: 900 });
            for (const id of ids) {
                await route(id);
                const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
                assert(!overflow, `${id} overflows at ${width}px`);
            }
            if (width === 390) {
                await route('overview');
                await shot('overview-mobile');
                await p.getByLabel('Navigate to page').selectOption('records');
                await p.waitForURL('**#records');
                await shot('records-mobile');
                await route('components');
                await shot('components-mobile');
            }
        }
        pass('All 11 routes have no document overflow at 1920, 1440, 768, 390 and 320px');
        await p.goto(require('url').pathToFileURL(path.join(__dirname, 'examples/server-rendered.html')).href);
        await p.locator('[data-slot=card]').first().waitFor();
        assert(!await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
        pass('Framework-neutral HTML starter renders without JS');
        assert.deepEqual(errors, []);
        assert.deepEqual(external, []);
        pass('No uncaught browser errors or external network requests');
        const parent = path.dirname(__dirname);
        const files = ['components/charts/StatCard.tsx', 'components/charts/ChartCard.tsx', 'components/charts/TrendArea.tsx', 'components/charts/VerticalBars.tsx', 'components/charts/BarList.tsx', 'components/charts/DonutChart.tsx', 'components/charts/EmptyState.tsx', 'components/ui/card.tsx', 'components/ui/popover.tsx', 'components/explainer/MetricInfo.tsx'];
        if (fs.existsSync(path.join(parent, 'app/globals.css'))) {
            const hashes = [];
            for (const file of [...files, 'app/globals.css']) {
                const snapshot = file === 'app/globals.css' ? 'source/dashboard.css' : 'source/' + file;
                const original = fs.readFileSync(path.join(parent, file)), copy = fs.readFileSync(path.join(__dirname, snapshot));
                assert(original.equals(copy), file + ' differs from source');
                hashes.push({ file, sha256: crypto.createHash('sha256').update(copy).digest('hex') });
            }
            pass('Original CSS and 10 presentation components are byte-identical snapshots', hashes);
        }
        fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ checkedAt: new Date().toISOString(), browser: await browser.version(), results, errors, externalRequests: external }, null, 2));
        console.log(`${results.length} checks passed. Evidence: design-kit/verification/`);
    }
    finally {
        await browser.close();
    }
}
run().catch(error => { console.error(error); fs.writeFileSync(path.join(out, 'failure.json'), JSON.stringify({ error: error.message, results, errors }, null, 2)); process.exitCode = 1; });
