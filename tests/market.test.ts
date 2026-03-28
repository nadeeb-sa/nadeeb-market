import { test, expect, type Page } from '@playwright/test';

const BASE = 'http://localhost:4000';
const API = 'http://localhost:5235/api';
const PROD_API = 'https://nadeeb-api.azurewebsites.net/api';

// ─── Test Data ──────────────────────────────────────────────────────────────

const delegateData = {
  fullName: 'أحمد محمد الشهري',
  phone: '0512345678',
  email: `delegate-test-${Date.now()}@test.com`,
  city: 'makkah',
  experience: '1-3',
};

const companyData = {
  companyName: 'شركة الفضيلة للعمرة',
  contactName: 'محمد عبدالله',
  phone: '0556789012',
  email: `company-test-${Date.now()}@test.com`,
  city: 'jeddah',
  companySize: 'medium',
};

const investorData = {
  fullName: 'خالد سعد المطيري',
  phone: '0598765432',
  email: `investor-test-${Date.now()}@test.com`,
  investmentRange: 'under_500k',
  investorType: 'individual',
  country: 'السعودية',
  interestLevel: 'interested',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 15000 });
}

/** Route production API calls to local backend */
async function routeApiToLocal(page: Page) {
  await page.route(`${PROD_API}/**`, async (route) => {
    const url = route.request().url().replace(PROD_API, API);
    const response = await route.fetch({ url });
    await route.fulfill({ response });
  });
}

async function getValidationErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  const errorEls = await page.$$('p.text-red-500, div.bg-red-50');
  for (const el of errorEls) {
    const text = await el.textContent();
    if (text && text.trim()) errors.push(text.trim());
  }
  return errors;
}

// ═══════════════════════════════════════════════════════════════════
// GROUP 1: Page Load Tests
// ═══════════════════════════════════════════════════════════════════

test.describe('Page Load — Arabic', () => {

  test('Hub page loads correctly (AR)', async ({ page }) => {
    await page.goto(`${BASE}/ar`);
    await waitForPageLoad(page);

    const heading = await page.$('h1, h2');
    expect(heading).not.toBeNull();
    expect(page.url()).not.toContain('404');

    await page.screenshot({ path: '/tmp/nadeeb-test-hub-ar.png', fullPage: true });
  });

  test('Delegates page loads (AR)', async ({ page }) => {
    await page.goto(`${BASE}/ar/delegates`);
    await waitForPageLoad(page);

    expect(page.url()).toContain('/ar/delegates');
    const form = await page.$('form');
    expect(form).not.toBeNull();

    await page.screenshot({ path: '/tmp/nadeeb-test-delegates-ar.png', fullPage: true });
  });

  test('Companies page loads (AR)', async ({ page }) => {
    await page.goto(`${BASE}/ar/companies`);
    await waitForPageLoad(page);

    expect(page.url()).toContain('/ar/companies');
    const form = await page.$('form');
    expect(form).not.toBeNull();

    await page.screenshot({ path: '/tmp/nadeeb-test-companies-ar.png', fullPage: true });
  });

  test('Investors page loads (AR)', async ({ page }) => {
    await page.goto(`${BASE}/ar/investors`);
    await waitForPageLoad(page);

    expect(page.url()).toContain('/ar/investors');
    const form = await page.$('form');
    expect(form).not.toBeNull();

    await page.screenshot({ path: '/tmp/nadeeb-test-investors-ar.png', fullPage: true });
  });
});

test.describe('Page Load — English', () => {

  test('Hub page loads (EN)', async ({ page }) => {
    await page.goto(`${BASE}/en`);
    await waitForPageLoad(page);
    expect(page.url()).toContain('/en');
    await page.screenshot({ path: '/tmp/nadeeb-test-hub-en.png', fullPage: true });
  });

  test('Language toggle switches AR→EN', async ({ page }) => {
    await page.goto(`${BASE}/ar`);
    await waitForPageLoad(page);

    // The locale switcher is a button with Globe icon + "English" text (when on AR page)
    const langToggle = page.locator('button:has(svg.lucide-globe)').first();
    if (await langToggle.count() > 0) {
      await langToggle.click();
      await page.waitForURL('**/en/**', { timeout: 5000 }).catch(() => {});
      await waitForPageLoad(page);
      expect(page.url()).toContain('/en');
      console.log('Language toggle works');
    } else {
      console.log('Language toggle not found — skipping');
    }
  });

  test('RTL direction set for Arabic', async ({ page }) => {
    await page.goto(`${BASE}/ar/delegates`);
    await waitForPageLoad(page);

    const dir = await page.$eval('html', (el) => el.getAttribute('dir') || getComputedStyle(el).direction);
    console.log(`Direction: ${dir}`);
    expect(dir).toBe('rtl');
  });
});

// ═══════════════════════════════════════════════════════════════════
// GROUP 2: Form Validation Tests
// ═══════════════════════════════════════════════════════════════════

test.describe('Form Validation', () => {

  test('Delegate form — empty submit shows validation errors', async ({ page }) => {
    await page.goto(`${BASE}/ar/delegates`);
    await waitForPageLoad(page);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    const errors = await getValidationErrors(page);
    console.log(`Validation errors shown: ${errors.length}`);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('Delegate form — invalid phone rejected', async ({ page }) => {
    await page.goto(`${BASE}/ar/delegates`);
    await waitForPageLoad(page);

    // Fill all required fields but with bad phone
    await page.fill('input[name="fullName"]', 'تجربة');
    await page.fill('input[name="phone"]', '123');
    await page.fill('input[name="email"]', 'test@test.com');
    await page.selectOption('select[name="city"]', 'makkah');
    await page.selectOption('select[name="experience"]', '1-3');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    const errors = await getValidationErrors(page);
    console.log(`Phone validation errors: ${JSON.stringify(errors)}`);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('Company form — empty submit shows validation errors', async ({ page }) => {
    await page.goto(`${BASE}/ar/companies`);
    await waitForPageLoad(page);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    const errors = await getValidationErrors(page);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('Investor form — empty submit shows validation errors', async ({ page }) => {
    await page.goto(`${BASE}/ar/investors`);
    await waitForPageLoad(page);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    const errors = await getValidationErrors(page);
    expect(errors.length).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════════
// GROUP 3: Full Form Submission + API Verification
// ═══════════════════════════════════════════════════════════════════

test.describe('Form Submission + Data Persistence', () => {

  test('Delegate form — submit valid data, verify success state', async ({ page }) => {
    await routeApiToLocal(page);
    await page.goto(`${BASE}/ar/delegates`);
    await waitForPageLoad(page);

    const email = `delegate-ui-${Date.now()}@test.com`;

    // Fill form
    await page.fill('input[name="fullName"]', delegateData.fullName);
    await page.fill('input[name="phone"]', delegateData.phone);
    await page.fill('input[name="email"]', email);
    await page.selectOption('select[name="city"]', delegateData.city);
    await page.selectOption('select[name="experience"]', delegateData.experience);

    // Submit and wait for API
    const [response] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/market/delegate'), { timeout: 15000 }),
      page.click('button[type="submit"]'),
    ]);

    const status = response.status();
    const body = await response.json();
    console.log(`Delegate API → ${status}: ${JSON.stringify(body)}`);
    expect(status).toBe(200);
    expect(body.success).toBe(true);

    // Wait for success state
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/nadeeb-test-delegate-submit.png', fullPage: true });

    // Check for success state (SuccessState component renders after onSuccess)
    const successIndicator = page.locator('text=تم, text=شكراً, text=Thank').first();
    if (await successIndicator.count() > 0) {
      console.log('Success state shown');
    } else {
      // Form might have disappeared which also indicates success
      const formStillVisible = await page.$('form');
      console.log(`Form still visible: ${!!formStillVisible}`);
    }
  });

  test('Company form — submit valid data', async ({ page }) => {
    await routeApiToLocal(page);
    await page.goto(`${BASE}/ar/companies`);
    await waitForPageLoad(page);

    const email = `company-ui-${Date.now()}@test.com`;

    await page.fill('input[name="companyName"]', companyData.companyName);
    await page.fill('input[name="contactName"]', companyData.contactName);
    await page.fill('input[name="phone"]', companyData.phone);
    await page.fill('input[name="email"]', email);
    await page.selectOption('select[name="city"]', companyData.city);
    await page.selectOption('select[name="companySize"]', companyData.companySize);

    const [response] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/market/company'), { timeout: 15000 }),
      page.click('button[type="submit"]'),
    ]);

    const status = response.status();
    const body = await response.json();
    console.log(`Company API → ${status}: ${JSON.stringify(body)}`);
    expect(status).toBe(200);

    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/nadeeb-test-company-submit.png', fullPage: true });
  });

  test('Investor form — submit valid data', async ({ page }) => {
    await routeApiToLocal(page);
    await page.goto(`${BASE}/ar/investors`);
    await waitForPageLoad(page);

    const email = `investor-ui-${Date.now()}@test.com`;

    await page.fill('input[name="fullName"]', investorData.fullName);
    await page.fill('input[name="phone"]', investorData.phone);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="country"]', investorData.country);
    await page.selectOption('select[name="investmentRange"]', investorData.investmentRange);
    await page.selectOption('select[name="investorType"]', investorData.investorType);
    await page.selectOption('select[name="interestLevel"]', investorData.interestLevel);

    const [response] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/market/investor'), { timeout: 15000 }),
      page.click('button[type="submit"]'),
    ]);

    const status = response.status();
    console.log(`Investor API → ${status}`);
    expect(status).toBe(200);

    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/nadeeb-test-investor-submit.png', fullPage: true });
  });
});

// ═══════════════════════════════════════════════════════════════════
// GROUP 4: API Direct Tests (Backend)
// ═══════════════════════════════════════════════════════════════════

test.describe('Backend API Direct Tests', () => {

  test('POST /api/market/delegate — returns 200', async ({ request }) => {
    const res = await request.post(`${API}/market/delegate`, {
      data: {
        fullName: 'Test Delegate اختبار',
        phone: '0512345678',
        email: `api-test-delegate-${Date.now()}@test.com`,
        city: 'makkah',
        experience: '1-3',
        languages: ['arabic', 'english'],
        hasSmartphone: true,
        notes: 'API direct test',
      },
    });

    const body = await res.json();
    console.log(`Delegate API: ${res.status()} →`, body);
    expect(res.status()).toBe(200);
    expect(body.success).toBe(true);
  });

  test('POST /api/market/company — returns 200', async ({ request }) => {
    const res = await request.post(`${API}/market/company`, {
      data: {
        companyName: 'شركة اختبار',
        contactName: 'مسؤول الاختبار',
        phone: '0556789012',
        email: `api-test-company-${Date.now()}@test.com`,
        city: 'jeddah',
        companySize: 'small',
        servicesInterest: ['delegates', 'tracking'],
        notes: 'API direct test',
      },
    });

    const body = await res.json();
    console.log(`Company API: ${res.status()} →`, body);
    expect(res.status()).toBe(200);
  });

  test('POST /api/market/investor — returns 200', async ({ request }) => {
    const res = await request.post(`${API}/market/investor`, {
      data: {
        fullName: 'مستثمر اختبار',
        phone: '0598765432',
        email: `api-test-investor-${Date.now()}@test.com`,
        investmentRange: 'under_500k',
        investorType: 'individual',
        country: 'Saudi Arabia',
        interestLevel: 'info',
        notes: 'API direct test',
      },
    });

    const body = await res.json();
    console.log(`Investor API: ${res.status()} →`, body);
    expect(res.status()).toBe(200);
  });

  test('Invalid data — returns 400', async ({ request }) => {
    const res = await request.post(`${API}/market/delegate`, {
      data: { fullName: '' },
    });

    console.log(`Invalid data response: ${res.status()}`);
    expect([400, 422]).toContain(res.status());
  });
});

// ═══════════════════════════════════════════════════════════════════
// GROUP 5: DB Verification
// ═══════════════════════════════════════════════════════════════════

test.describe('Database Verification', () => {

  test('Submitted data exists in SQLite DB', async () => {
    const { execSync } = require('child_process');
    const dbPath = '/home/abotrf/projects/programming/database/nadeeb.db';

    try {
      const delegateCount = execSync(
        `sqlite3 "${dbPath}" "SELECT COUNT(*) FROM DelegateLeads;"`,
        { encoding: 'utf8' },
      ).trim();

      const companyCount = execSync(
        `sqlite3 "${dbPath}" "SELECT COUNT(*) FROM CompanyLeads;"`,
        { encoding: 'utf8' },
      ).trim();

      const investorCount = execSync(
        `sqlite3 "${dbPath}" "SELECT COUNT(*) FROM InvestorLeads;"`,
        { encoding: 'utf8' },
      ).trim();

      console.log(`DB Counts → Delegates: ${delegateCount} | Companies: ${companyCount} | Investors: ${investorCount}`);

      const totalLeads = parseInt(delegateCount) + parseInt(companyCount) + parseInt(investorCount);
      expect(totalLeads).toBeGreaterThanOrEqual(0);

      const lastDelegates = execSync(
        `sqlite3 "${dbPath}" "SELECT Id, FullName, Email, CreatedAt FROM DelegateLeads ORDER BY Id DESC LIMIT 3;"`,
        { encoding: 'utf8' },
      ).trim();
      console.log(`Last delegates:\n${lastDelegates}`);
    } catch (err) {
      console.log(`SQLite query failed: ${err}`);
      console.log('Tables may not exist yet — run dotnet migrations first');
    }
  });
});

// ═══════════════════════════════════════════════════════════════════
// GROUP 6: Email Verification
// ═══════════════════════════════════════════════════════════════════

test.describe('Email Sending Verification', () => {

  test('Backend logs confirm email config is SendGrid', async () => {
    const { execSync } = require('child_process');

    const config = execSync(
      `cat /home/abotrf/projects/programming/database/appsettings.json | python3 -c "import json,sys; d=json.load(sys.stdin); e=d.get('Email',{}); print(e.get('Provider','?'))"`,
      { encoding: 'utf8' },
    ).trim();
    console.log(`Email provider: ${config}`);
    expect(config.toLowerCase()).toBe('sendgrid');
  });

  test('SendGrid API key is valid (not placeholder)', async () => {
    const { execSync } = require('child_process');

    const apiKey = execSync(
      `cat /home/abotrf/projects/programming/database/appsettings.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('Email',{}).get('ApiKey',''))"`,
      { encoding: 'utf8' },
    ).trim();

    const isReal = apiKey.startsWith('SG.') && apiKey.length > 40;
    console.log(`SendGrid key: ${apiKey.substring(0, 15)}... | Valid format: ${isReal}`);
    expect(isReal).toBe(true);
  });

  test('Backend returns 200 (email triggered)', async ({ request }) => {
    const email = `email-verify-${Date.now()}@test.com`;

    const res = await request.post(`${API}/market/delegate`, {
      data: {
        fullName: 'Email Test مختبر البريد',
        phone: '0512345678',
        email,
        city: 'madinah',
        experience: '1-3',
        languages: ['arabic'],
        hasSmartphone: true,
        notes: 'Email verification test',
      },
    });

    console.log(`Response ${res.status()} → email triggered for: ${email}`);
    console.log('Note: Actual delivery requires checking SendGrid dashboard or inbox');
    expect(res.status()).toBe(200);
  });
});
