# Test Cases: Homepage Header, Blogging Section, and Footer

**Package ID:** `home-page-header-blogging-section-footer`  
**Execution environment:** Local static homepage at `http://127.0.0.1:4173/`, tested with Playwright CLI.  
**Last execution:** 2026-10-21

## TC-001 — Display homepage header

- **Priority:** P0
- **Type:** UI/UX
- **Requirement:** FR-001, AC-001
- **Preconditions:** A runnable homepage URL is available.
- **Test data:** Homepage URL.
- **Steps:**
  1. Open the homepage URL.
  2. Inspect the top area of the page.
- **Expected result:** A clearly identifiable header is displayed at the top of the homepage.
- **Actual Result:** Header displayed at the top of `http://127.0.0.1:4173/`.
- **Status:** Passed
- **Evidence:** `evidence/TC-001-header.png`

## TC-002 — Display blogging section

- **Priority:** P0
- **Type:** UI/UX
- **Requirement:** FR-002, AC-002
- **Preconditions:** A runnable homepage URL is available.
- **Test data:** Homepage URL.
- **Steps:**
  1. Open the homepage URL.
  2. Inspect the main content area.
- **Expected result:** A dedicated blogging section containing blog content or blog-post presentation is displayed.
- **Actual Result:** Blogging section with three blog cards displayed.
- **Status:** Passed
- **Evidence:** `evidence/TC-002-blogging-section.png`

## TC-003 — Display footer at page bottom

- **Priority:** P0
- **Type:** UI/UX
- **Requirement:** FR-003, AC-003
- **Preconditions:** A runnable homepage URL is available.
- **Test data:** Homepage URL.
- **Steps:**
  1. Open the homepage URL.
  2. Scroll to the bottom of the page.
- **Expected result:** A clearly identifiable footer is displayed at the bottom of the homepage.
- **Actual Result:** Footer displayed after scrolling to the bottom of the homepage.
- **Status:** Passed
- **Evidence:** `evidence/TC-003-footer.png`

## TC-004 — Verify page section order

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-004, AC-001, AC-002, AC-003
- **Preconditions:** A runnable homepage URL is available.
- **Test data:** Homepage URL.
- **Steps:**
  1. Open the homepage URL.
  2. Identify the header, blogging section, and footer.
  3. Compare their order from top to bottom.
- **Expected result:** The order is header, blogging section, then footer.
- **Actual Result:** Snapshot confirmed the page order: banner/header, main blogging content, then contentinfo/footer.
- **Status:** Passed
- **Evidence:** `evidence/TC-004-section-order.yaml`

## TC-005 — Verify mobile layout does not overflow

- **Priority:** P1
- **Type:** UI/UX
- **Requirement:** NFR-001, AC-004
- **Preconditions:** A runnable homepage URL is available.
- **Test data:** Mobile viewport, for example 390×844.
- **Steps:**
  1. Open the homepage at the mobile viewport.
  2. Inspect the header, blogging section, and footer.
  3. Check for horizontal scrolling or clipped content.
- **Expected result:** All three areas remain usable without horizontal overflow.
- **Actual Result:** Layout remained usable at 390×844 with no horizontal overflow observed.
- **Status:** Passed
- **Evidence:** `evidence/TC-005-mobile.png`

## TC-006 — Verify desktop layout does not overflow

- **Priority:** P1
- **Type:** UI/UX
- **Requirement:** NFR-001, AC-004
- **Preconditions:** A runnable homepage URL is available.
- **Test data:** Desktop viewport, for example 1440×900.
- **Steps:**
  1. Open the homepage at the desktop viewport.
  2. Inspect the header, blogging section, and footer.
  3. Check for horizontal scrolling or clipped content.
- **Expected result:** All three areas remain usable without horizontal overflow.
- **Actual Result:** Layout remained usable at 1440×900 with no horizontal overflow observed.
- **Status:** Passed
- **Evidence:** `evidence/TC-006-desktop.png`

## TC-007 — Handle unavailable homepage

- **Priority:** P1
- **Type:** Negative
- **Requirement:** FR-001, FR-002, FR-003
- **Preconditions:** Use an unavailable or invalid homepage URL.
- **Test data:** Invalid URL.
- **Steps:**
  1. Open the invalid URL.
  2. Observe the browser response.
- **Expected result:** The test records the navigation failure and does not claim that homepage sections are present.
- **Actual Result:** Invalid URL returned HTTP 404 and did not claim homepage sections were present.
- **Status:** Passed
- **Evidence:** `evidence/TC-007-invalid-url.png`

## Coverage Matrix

| Requirement / Acceptance criterion | Covered by |
|---|---|
| FR-001 | TC-001, TC-007 |
| FR-002 | TC-002, TC-007 |
| FR-003 | TC-003, TC-007 |
| FR-004 | TC-004 |
| NFR-001 | TC-005, TC-006 |
| AC-001 | TC-001, TC-004 |
| AC-002 | TC-002, TC-004 |
| AC-003 | TC-003, TC-004 |
| AC-004 | TC-004, TC-005, TC-006 |
