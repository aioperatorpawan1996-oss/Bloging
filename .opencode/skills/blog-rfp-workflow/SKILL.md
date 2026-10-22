---
name: Blog RFP Workflow
description: Create and verify one blogging website requirement at a time with requirement, test cases, and evidence files under rfp/.
---

# Blog RFP Workflow

Use this skill when the user provides a new requirement for the blogging website and wants its requirement document, test cases, and evidence.

## Core rule

Work on exactly one requirement at a time. Do not create files until the user has supplied a requirement. Do not create requirements that the user has not requested.

## Folder layout

For every requirement, create a new folder under the project root. All requirement documents, test results, screenshots, logs, videos, and other evidence must remain inside this same RFP folder:

```text
rfp/<kebab-case-requirement-slug>/
├── requirement.md
├── test-cases.md
└── evidence/
    ├── README.md
    └── <test-case-id>-<short-name>.<ext>
```

If the same slug already exists, never overwrite it. Use `-2`, `-3`, etc., unless the user explicitly asks to update the existing package.

## Requirement intake

Before writing the package, collect only the missing information needed for the current requirement:

1. What the feature does and who uses it.
2. Platform or surface (normally the blogging website/web homepage).
3. In-scope and explicitly out-of-scope behavior.
4. Acceptance criteria or definition of done.

If the user cannot answer something, record `TODO(ASK:user)` in an `Open Questions` section instead of inventing a business rule. Ask no more than five concise questions in one round.

## `requirement.md`

Include:

- Requirement title, package slug, author/owner, and target release (`TBD` when unknown).
- Problem statement and users.
- Scope and out of scope.
- Functional requirements numbered `FR-001`, `FR-002`, ... . Each must state its priority (`MUST`, `SHOULD`, or `COULD`), actor, trigger, behavior, and acceptance-criteria reference.
- Non-functional requirements numbered `NFR-001`, ... when applicable.
- Acceptance criteria numbered `AC-001`, ... . Every requirement must map to at least one acceptance criterion.
- Dependencies, assumptions, and open questions.

Do not leave template placeholders or instruction comments in the final file.

## `test-cases.md`

Derive tests only from the requirement and acceptance criteria. Use IDs `TC-001`, `TC-002`, ... . Each test case must contain:

- Title, priority (`P0`, `P1`, or `P2`), and type (`Functional`, `Negative`, `Integration`, `Performance`, `Security`, `UI/UX`, or `Regression`).
- Preconditions and test data.
- Numbered steps.
- Expected result.
- `Requirement` field referencing the relevant `FR-`, `NFR-`, and/or `AC-` IDs.
- `Actual Result: Not Run` and `Status: Not Run` until the user asks to run it.

For every functional requirement, include happy-path, boundary/edge, invalid-input or negative, and failure-path coverage where applicable. End with a coverage matrix mapping every requirement and acceptance criterion to test-case IDs.

## Running tests and evidence

Do not claim that tests were run unless they were actually executed. When the user asks to run a test case:

1. Run only the requested test case(s), unless the user asks for the full suite.
2. Record the actual result and status in `test-cases.md`.
3. Save evidence for every executed test case inside the same package's `evidence/` folder. Evidence must never be saved outside the requirement's RFP folder. Prefer screenshots for UI tests, captured output/logs for functional or API tests, and a short Markdown report when binary evidence is not possible.
4. Name evidence with the test ID, for example `TC-001-homepage-visible.png`. Every requirement must have an evidence index in `evidence/README.md`, including `Not Run` or `Blocked` entries when evidence does not yet exist.
5. Add an evidence index to `evidence/README.md` containing test-case ID, file, date, and what the evidence proves.
6. If a test fails, preserve the failure evidence and mark the test `Failed`; never replace it with a passing claim.

## Verification before reporting

Check that:

- Both Markdown files are in the same requirement folder.
- Every `FR-`, `NFR-`, and `AC-` is covered by at least one test case.
- Every test has preconditions, steps, expected result, and status.
- Evidence paths exist for every test that was run, and all evidence paths point inside the same RFP folder.
- No placeholders or invented rules remain.

Report the absolute package path, files created, test cases run, evidence paths, and unresolved open questions. Respond in the user's language when practical.
