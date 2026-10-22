# Test Cases: Google Sign-in with Writer/Reader Role POC

**Package ID:** `google-signin-writer-reader-poc`  
**Execution environment:** Local homepage at `http://127.0.0.1:4173/`; Firebase web configuration is pending.  
**Last execution:** Not Run

## TC-001 — Show Google sign-in action

- **Priority:** P0
- **Type:** UI/UX
- **Requirement:** FR-001, AC-001
- **Preconditions:** User is signed out.
- **Test data:** None.
- **Steps:** Open the homepage and inspect the header.
- **Expected result:** “Sign in with Google” is visible and usable.
- **Actual Result:** Not Run
- **Status:** Not Run
- **Evidence:** None

## TC-002 — Authenticate with Google

- **Priority:** P0
- **Type:** Integration
- **Requirement:** FR-001, AC-002
- **Preconditions:** Firebase Google provider and web config are enabled.
- **Test data:** Valid Google test account.
- **Steps:** Select Google sign-in and complete the Google flow.
- **Expected result:** Firebase authenticates the user and the signed-in state appears.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access/config pending
- **Evidence:** None

## TC-003 — Prompt first-time user for role

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-002, AC-004
- **Preconditions:** Authenticated user has no `users/{uid}` role document.
- **Test data:** New Google test account.
- **Steps:** Sign in with Google.
- **Expected result:** Writer and Reader role options are shown.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access/config pending
- **Evidence:** None

## TC-004 — Show existing role

- **Priority:** P1
- **Type:** Functional
- **Requirement:** FR-002, AC-003
- **Preconditions:** Authenticated user has a valid role in `users/{uid}`.
- **Test data:** User document with `role: "writer"` or `role: "reader"`.
- **Steps:** Sign in with that account.
- **Expected result:** The stored role is shown and role selection is not requested again.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access/config pending
- **Evidence:** None

## TC-005 — Save Writer role

- **Priority:** P0
- **Type:** Integration
- **Requirement:** FR-003, AC-005
- **Preconditions:** User is authenticated and role selection is visible.
- **Test data:** Role `writer`.
- **Steps:** Select Writer and inspect `users/{uid}` in Firestore.
- **Expected result:** The document contains the authenticated UID, basic profile fields, `role: "writer"`, and an update timestamp.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access/config pending
- **Evidence:** None

## TC-006 — Save Reader role

- **Priority:** P0
- **Type:** Integration
- **Requirement:** FR-003, AC-005
- **Preconditions:** User is authenticated and role selection is visible.
- **Test data:** Role `reader`.
- **Steps:** Select Reader and inspect `users/{uid}` in Firestore.
- **Expected result:** The document contains `role: "reader"` and the authenticated user's profile data.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access/config pending
- **Evidence:** None

## TC-007 — Sign out

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-004, AC-006
- **Preconditions:** User is authenticated.
- **Test data:** Authenticated test account.
- **Steps:** Select Sign out and reload the page.
- **Expected result:** The session ends and the Google sign-in action returns.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access/config pending
- **Evidence:** None

## TC-008 — Reject cross-user Firestore access

- **Priority:** P0
- **Type:** Security
- **Requirement:** NFR-001, AC-007
- **Preconditions:** Two authenticated test users exist.
- **Test data:** User A attempts to read/write `users/{userB_uid}`.
- **Steps:** Attempt the cross-user read and write operations.
- **Expected result:** Both operations are denied by Firestore rules.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access pending
- **Evidence:** None

## Coverage Matrix

| Requirement / Acceptance criterion | Covered by |
|---|---|
| FR-001 | TC-001, TC-002 |
| FR-002 | TC-003, TC-004 |
| FR-003 | TC-005, TC-006 |
| FR-004 | TC-007 |
| NFR-001 | TC-008 |
| AC-001 | TC-001 |
| AC-002 | TC-002 |
| AC-003 | TC-004 |
| AC-004 | TC-003 |
| AC-005 | TC-005, TC-006 |
| AC-006 | TC-007 |
| AC-007 | TC-008 |
