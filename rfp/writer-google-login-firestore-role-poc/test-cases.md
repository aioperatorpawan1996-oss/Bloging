# Test Cases: Writer Google Login with Firestore Role POC

**Package ID:** `writer-google-login-firestore-role-poc`  
**Execution environment:** Local homepage at `http://127.0.0.1:4173/`; Firebase project access and web configuration pending.  
**Last execution:** Not Run

## TC-001 — View public homepage shell while signed out

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-001, AC-001
- **Preconditions:** User is signed out.
- **Test data:** Local homepage URL.
- **Steps:** Open `http://127.0.0.1:4173/`.
- **Expected result:** Homepage shell is visible without login, while gated blog posts are unavailable.
- **Actual Result:** Not Run
- **Status:** Not Run
- **Evidence:** None

## TC-002 — Display Google login action

- **Priority:** P0
- **Type:** UI/UX
- **Requirement:** FR-002, AC-002
- **Preconditions:** User is signed out.
- **Test data:** None.
- **Steps:** Inspect the homepage body.
- **Expected result:** Google sign-in action for Writer/Reader access is visible and usable.
- **Actual Result:** Not Run
- **Status:** Not Run
- **Evidence:** None

## TC-003 — Start Google authentication for Reader

- **Priority:** P0
- **Type:** Integration
- **Requirement:** FR-002, AC-003
- **Preconditions:** Firebase Google provider and web configuration are enabled.
- **Test data:** Valid Google test account.
- **Steps:** Select the writer login action and complete the Google flow.
- **Expected result:** Firebase authenticates the user and allows the user to continue to role selection or the saved role.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access pending
- **Evidence:** None

## TC-004 — Select Writer role

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-003, AC-004
- **Preconditions:** New Google user has authenticated and has no saved role.
- **Test data:** `writer`.
- **Steps:** Select Writer from the role options.
- **Expected result:** Writer role is selected and the user profile save begins.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access pending
- **Evidence:** None

## TC-005 — Select Reader role

- **Priority:** P1
- **Type:** Functional
- **Requirement:** FR-003, AC-004
- **Preconditions:** New Google user has authenticated and has no saved role.
- **Test data:** `reader`.
- **Steps:** Select Reader from the role options.
- **Expected result:** Reader role is selected and the user profile save begins.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access pending
- **Evidence:** None

## TC-006 — Save required Firestore profile fields

- **Priority:** P0
- **Type:** Integration
- **Requirement:** FR-004, AC-005, AC-006
- **Preconditions:** User is authenticated and has selected a role.
- **Test data:** Name, email, selected role, and `unauthorizedUser: false`.
- **Steps:** Select a role, then inspect `users/{uid}` in Firestore.
- **Expected result:** The document contains `name`, `email`, `role`, and Boolean `unauthorizedUser`; role is `writer` or `reader`.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access pending
- **Evidence:** None

## TC-007 — Allow authorized writer blog actions

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-005, AC-007
- **Preconditions:** User document has `role: writer` and `unauthorizedUser: false`.
- **Test data:** New, edited, and deleted test blog post.
- **Steps:** Create a post, edit it, then delete it.
- **Expected result:** All three writer actions succeed.
- **Actual Result:** Not Run
- **Status:** Blocked — writer management UI not implemented
- **Evidence:** None

## TC-008 — Allow authorized reader to read posts

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-006, AC-008
- **Preconditions:** User document has `role: reader` and `unauthorizedUser: false`.
- **Test data:** Published test blog post.
- **Steps:** Open the blogging section after signing in as Reader.
- **Expected result:** Reader can read posts, but writer create/edit/delete actions are not available.
- **Actual Result:** Not Run
- **Status:** Blocked — blog access UI not implemented
- **Evidence:** None

## TC-009 — Block unauthorized reader and writer actions

- **Priority:** P0
- **Type:** Security
- **Requirement:** FR-007, AC-009
- **Preconditions:** User document has `unauthorizedUser: true`.
- **Test data:** Unauthorized authenticated user.
- **Steps:** Open the homepage and attempt to access writer actions.
- **Expected result:** Public shell remains viewable, gated posts and writer actions are blocked, and a clear message is shown.
- **Actual Result:** Not Run
- **Status:** Blocked — writer management UI and Firebase rules pending
- **Evidence:** None

## TC-010 — Sign out

- **Priority:** P0
- **Type:** Functional
- **Requirement:** FR-008, AC-010
- **Preconditions:** User is authenticated.
- **Test data:** Authenticated test account.
- **Steps:** Select Sign out and reload the homepage.
- **Expected result:** Firebase session ends and the writer login action returns.
- **Actual Result:** Not Run
- **Status:** Blocked — Firebase project access pending
- **Evidence:** None

## Coverage Matrix

| Requirement / Acceptance criterion | Covered by |
|---|---|
| FR-001 | TC-001 |
| FR-002 | TC-002, TC-003 |
| FR-003 | TC-004, TC-005 |
| FR-004 | TC-006 |
| FR-005 | TC-007 |
| FR-006 | TC-008 |
| FR-007 | TC-009 |
| FR-008 | TC-010 |
| AC-001 | TC-001 |
| AC-002 | TC-002 |
| AC-003 | TC-003 |
| AC-004 | TC-004, TC-005 |
| AC-005 | TC-006 |
| AC-006 | TC-006 |
| AC-007 | TC-007 |
| AC-008 | TC-008 |
| AC-009 | TC-009 |
| AC-010 | TC-010 |
