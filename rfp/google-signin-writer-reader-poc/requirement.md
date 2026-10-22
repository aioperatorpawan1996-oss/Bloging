# Google Sign-in with Writer/Reader Role POC

**Package ID:** `google-signin-writer-reader-poc`  
**Owner:** TBD  
**Target release:** POC  
**Platform:** Web application using Firebase Authentication and Cloud Firestore

## 1. Goal

Allow users to sign in with Google in Firebase project `blog-7ea36`, then identify whether the signed-in user is a `writer` or `reader` using a Firestore user document.

## 2. Scope

### In scope

- Google sign-in with Firebase Authentication.
- Signed-out and signed-in UI states.
- First-login role selection between `writer` and `reader`.
- Saving the user profile and role in `users/{uid}` in Firestore.
- Sign-out.
- Firestore access rules for a user's own role document.

### Out of scope

- Email/password login.
- Admin role management or invitation-only roles.
- Blog creation, editing, and publishing permissions.
- User profile editing.

## 3. Functional Requirements

### FR-001 — Google sign-in

- **Priority:** MUST
- **Actor:** Visitor
- **Trigger:** Visitor selects “Sign in with Google”.
- **Requirement:** Start Firebase Google authentication and show a signed-in state after success.
- **Acceptance criteria:** AC-001, AC-002

### FR-002 — Role identification

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** Google sign-in succeeds.
- **Requirement:** Read the user's role from `users/{uid}`. If no role exists, ask the user to choose `writer` or `reader`.
- **Acceptance criteria:** AC-003, AC-004

### FR-003 — Save role in Firestore

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** User selects Writer or Reader.
- **Requirement:** Save the user's UID, basic Google profile fields, selected role, and update timestamp in `users/{uid}`.
- **Acceptance criteria:** AC-005

### FR-004 — Sign-out

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** User selects “Sign out”.
- **Requirement:** End the Firebase session and restore the signed-out UI.
- **Acceptance criteria:** AC-006

### NFR-001 — User data protection

- **Priority:** MUST
- **Requirement:** Users may read/write only their own Firestore user document, and the role must be either `writer` or `reader`.
- **Acceptance criteria:** AC-007

## 4. Acceptance Criteria

- **AC-001:** Signed-out users see a Google sign-in action.
- **AC-002:** A valid Google account can authenticate through Firebase.
- **AC-003:** An existing role is shown after sign-in.
- **AC-004:** A first-time user is prompted to choose Writer or Reader.
- **AC-005:** The selected role is stored in `users/{uid}` in Firestore.
- **AC-006:** Sign-out ends the session and returns to the signed-out state.
- **AC-007:** Firestore rules prevent cross-user access and reject unsupported roles.

## 5. Assumptions and Open Questions

- POC assumption: a user may choose their own role on first login; admin approval is not included.
- TODO(ASK:user): Should Writer/Reader selection later require admin approval or invitation?
- TODO(ASK:user): What writer-only actions should be protected in the next requirement?
- TODO(ASK:user): Firebase project `blog-7ea36` must grant access to the currently logged-in Firebase CLI account.
