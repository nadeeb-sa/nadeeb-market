import { test, expect, Page } from "@playwright/test";

const BASE_URL = "http://localhost:4000";
const API_URL = "http://localhost:5235";

test("🧪 Submit delegate interest form — monitor console + network", async ({
  page,
}) => {
  const consoleLogs: string[] = [];
  const networkRequests: { url: string; status?: number; error?: string }[] =
    [];

  // 📋 مراقبة الكونسل
  page.on("console", (msg) => {
    const text = `[${msg.type().toUpperCase()}] ${msg.text()}`;
    consoleLogs.push(text);
    console.log("🖥️ Console:", text);
  });

  // 🌐 مراقبة الطلبات
  page.on("request", (req) => {
    if (req.url().includes("/api/")) {
      console.log(`📤 Request: ${req.method()} ${req.url()}`);
      networkRequests.push({ url: req.url() });
    }
  });

  page.on("response", async (res) => {
    if (res.url().includes("/api/")) {
      let body = "";
      try {
        body = await res.text();
      } catch {}
      console.log(`📥 Response: ${res.status()} ${res.url()} → ${body}`);
      const req = networkRequests.find((r) => r.url === res.url());
      if (req) req.status = res.status();
    }
  });

  page.on("requestfailed", (req) => {
    if (req.url().includes("/api/") || req.url().includes("localhost")) {
      const err = req.failure()?.errorText || "unknown error";
      console.log(`❌ Request FAILED: ${req.url()} — ${err}`);
      networkRequests.push({ url: req.url(), error: err });
    }
  });

  // 1️⃣ فتح صفحة المندوبين
  console.log("\n=== Step 1: Navigate to delegates page ===");
  await page.goto(`${BASE_URL}/ar/delegates`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  await page.screenshot({
    path: "/tmp/playwright-1-loaded.png",
    fullPage: false,
  });
  console.log("✅ Page loaded");

  // 2️⃣ تعبئة الحقول
  console.log("\n=== Step 2: Fill form ===");
  await page.fill('input[name="fullName"]', "محمد عبدالله الغامدي");
  await page.fill('input[name="phone"]', "0512345678");
  await page.fill('input[name="email"]', "playwright-live@test.com");

  // اختيار المدينة
  await page.selectOption('select[name="city"]', { index: 1 });

  // اختيار الخبرة
  await page.selectOption('select[name="experience"]', { index: 1 });

  // اختيار اللغة (checkbox)
  const arabicCheckbox = page.locator(
    'input[type="checkbox"][value="arabic"]'
  );
  if (await arabicCheckbox.count()) {
    await arabicCheckbox.check();
  }

  await page.fill('textarea[name="notes"]', "اختبار تلقائي من Playwright");

  await page.screenshot({
    path: "/tmp/playwright-2-filled.png",
    fullPage: false,
  });
  console.log("✅ Form filled");

  // 3️⃣ إرسال النموذج
  console.log("\n=== Step 3: Submit form ===");
  const submitBtn = page.getByRole("button", { name: /أرسل طلبي|إرسال|Send|submit/i });
  await submitBtn.click();

  // انتظر الاستجابة (نجاح أو خطأ)
  await page.waitForTimeout(4000);

  await page.screenshot({
    path: "/tmp/playwright-3-result.png",
    fullPage: false,
  });

  // 4️⃣ تقرير
  console.log("\n=== REPORT ===");
  console.log("\n🌐 Network Requests:");
  networkRequests.forEach((r) => {
    if (r.error) {
      console.log(`  ❌ ${r.url} → ERROR: ${r.error}`);
    } else {
      console.log(`  ${r.status === 200 || r.status === 201 ? "✅" : "⚠️"} ${r.url} → ${r.status}`);
    }
  });

  const errors = consoleLogs.filter(
    (l) => l.includes("ERROR") || l.includes("error") || l.includes("CORS") || l.includes("Failed") || l.includes("blocked")
  );
  if (errors.length) {
    console.log("\n⚠️ Console Errors:");
    errors.forEach((e) => console.log(" ", e));
  } else {
    console.log("\n✅ No console errors detected");
  }

  // التحقق من النجاح
  const pageContent = await page.content();
  const hasSuccess =
    pageContent.includes("تم استلام") ||
    pageContent.includes("success") ||
    pageContent.includes("شكراً") ||
    pageContent.includes("بنجاح");

  console.log(`\n📋 Form submission result: ${hasSuccess ? "✅ SUCCESS" : "⚠️ Check screenshots"}`);

  // التحقق من DB
  console.log("\n=== Step 4: Verify in DB ===");
  const { execSync } = require("child_process");
  const dbResult = execSync(
    `sqlite3 /home/abotrf/projects/programming/database/nadeeb.db "SELECT Id, FullName, Email, CreatedAt FROM DelegateLeads ORDER BY Id DESC LIMIT 1;"`
  )
    .toString()
    .trim();
  console.log("🗄️ Latest DB record:", dbResult);
});
