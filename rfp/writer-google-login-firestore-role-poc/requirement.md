# Writer Google Login with Firestore Role POC

**Package ID:** `writer-google-login-firestore-role-poc`  
**Owner:** TBD  
**Target release:** POC  
**Platform:** Web application using Firebase Authentication and Cloud Firestore  
**Firebase project:** `blog-7ea36`

## 1. Goal

Allow visitors to view the public homepage shell, sign in with Google, choose a Writer or Reader role, and save the authenticated user's profile and role in Firestore. Blog posts must be readable only after authentication.

## 2. Users

- Public visitor: can view the homepage shell without signing in.
- Writer: can sign in with Google and manage blog content.
- Reader: must sign in with Google before reading blog posts.

## 3. Scope

### In scope

- Public homepage shell access without authentication.
- Google sign-in entry point in the homepage body for Writer and Reader.
- Google authentication through Firebase Authentication.
- User-selected `writer` or `reader` role after successful Google sign-in.
- Firestore user profile document at `users/{uid}`.
- Saving `name`, `email`, `role`, and `unauthorizedUser`.
- Writer permissions to create, edit, and delete blog posts.
- Sign-out.
- Unauthorized-user handling.

### Out of scope

- Email/password login.
- Admin role assignment or approval workflow.
- Full blog editor design beyond the access requirement.

## 4. Functional Requirements

### FR-001 — Public homepage shell access

- **Priority:** MUST
- **Actor:** Public visitor
- **Trigger:** Visitor opens the homepage
- **Requirement:** The visitor must be able to view the homepage shell without signing in, but blog post content must remain gated.
- **Acceptance criteria:** AC-001

### FR-002 — Google sign-in for Writer and Reader

- **Priority:** MUST
- **Actor:** Visitor, writer, or reader
- **Trigger:** Visitor selects the Google sign-in action in the homepage body
- **Requirement:** The application must start Google authentication through Firebase Authentication for both Writer and Reader access.
- **Acceptance criteria:** AC-002, AC-003

### FR-003 — Role selection

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** Google authentication succeeds and the user has no saved role
- **Requirement:** The user must be able to select either `writer` or `reader`.
- **Acceptance criteria:** AC-004

### FR-004 — Save user profile and role

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** User selects a role
- **Requirement:** Save `name`, `email`, `role`, and `unauthorizedUser` in `users/{uid}` in Firestore.
- **Acceptance criteria:** AC-005, AC-006

### FR-005 — Writer permissions

- **Priority:** MUST
- **Actor:** User with `role: writer` and `unauthorizedUser: false`
- **Trigger:** Writer opens the blog management area
- **Requirement:** The writer can create, edit, and delete blog posts.
- **Acceptance criteria:** AC-007

### FR-006 — Reader permissions

- **Priority:** MUST
- **Actor:** User with `role: reader` and `unauthorizedUser: false`
- **Trigger:** Reader opens the blogging section
- **Requirement:** The reader can read blog posts after signing in, but cannot create, edit, or delete blog posts.
- **Acceptance criteria:** AC-008

### FR-007 — Unauthorized user handling

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** User is marked with `unauthorizedUser: true` or is not permitted for writer actions
- **Requirement:** The user may remain able to view the public homepage shell but must not read gated posts or access writer actions, and must receive a clear status message.
- **Acceptance criteria:** AC-009

### FR-008 — Sign-out

- **Priority:** MUST
- **Actor:** Authenticated user
- **Trigger:** User selects sign out
- **Requirement:** End the Firebase session and return to the signed-out state.
- **Acceptance criteria:** AC-010

## 5. Data Requirements

Firestore document path: `users/{uid}`

| Field | Required | Description |
|---|---:|---|
| `name` | Yes | Google display name |
| `email` | Yes | Google account email |
| `role` | Yes | `writer` or `reader` |
| `unauthorizedUser` | Yes | Boolean access flag |

## 6. Acceptance Criteria

- **AC-001:** A visitor can view the homepage shell without signing in, but cannot read gated blog posts.
- **AC-002:** The Google sign-in action is visible in the homepage body.
- **AC-003:** Selecting the action opens Google authentication through Firebase.
- **AC-004:** A first-time authenticated user can choose Writer or Reader.
- **AC-005:** Firestore stores the required profile fields under `users/{uid}`.
- **AC-006:** The stored role is exactly `writer` or `reader`, and `unauthorizedUser` is Boolean.
- **AC-007:** An authorized writer can create, edit, and delete blog posts.
- **AC-008:** An authorized reader can read blog posts but cannot create, edit, or delete them.
- **AC-009:** An unauthorized user cannot read gated posts or use writer actions but can still view the public shell.
- **AC-010:** Sign-out ends the session and restores the signed-out state.

## 7. Open Questions

- TODO(ASK:user): Should `unauthorizedUser` default to `false` for a new user, or should a new user require approval before writer actions?
- TODO(ASK:user): Should a user selecting Reader be able to access reader features immediately, or is Reader only stored for the next phase?
