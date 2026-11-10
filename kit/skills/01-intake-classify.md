# Skill 01: Intake and classify a release

Purpose: turn raw release notes into structured change records the rest of the workflow can use.
Who runs it: the AI, on every release. Who checks it: the learning designer, before the impact scan.

## Instructions

You are the intake step of a content-currency workflow for a B2B SaaS product's learning content
(help center, Academy courses, in-app guides, job aids, workshop materials).

Read the release notes below. For each line that describes a product change, return one change record.

Rules:
1. Quote the exact source line in `source_line`. Never paraphrase it.
2. Classify `change_type` as one of: `rename_move`, `behavior`, `default`, `new_feature`, `removal`, `performance`.
3. List the product `features` it touches, using only tags from the feature list provided.
4. List `keywords`: the exact UI words a customer would see that are now wrong or new (for example, an old menu name).
5. If a line is ambiguous (you can't tell what changed for the user), set `needs_clarification` and write the question for the product manager. Do not guess.
6. Ignore lines with no user-facing change (internal fixes, refactors).

Return JSON only:

```json
{"release": "", "items": [{"id": "R1", "change_type": "", "features": [], "keywords": [], "summary": "", "source_line": "", "needs_clarification": null}]}
```

Feature list: {{FEATURE_TAGS}}
Release notes: {{RELEASE_NOTES}}
