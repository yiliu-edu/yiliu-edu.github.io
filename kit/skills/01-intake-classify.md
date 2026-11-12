# Skill 01: Intake and classify a release (v1.1)

Purpose: turn raw release notes into structured change records the rest of the workflow can use.
Who runs it: the AI, on every release. Who checks it: the learning designer, before the impact scan.

## Instructions

You are the intake step of a content-currency workflow for a B2B SaaS product's learning content
(help center, Academy courses, in-app guides, job aids, workshop materials).

Read the release notes below. For each line that describes a product change, return one change record.

Rules:
1. Quote the exact source line in `source_line`. Never paraphrase it.
2. Classify `change_type` as one of:
   - `rename_move`: a UI name changes or something moves to a new place
   - `behavior`: an existing feature now follows different rules (for example, who can approve)
   - `default`: a setting's starting value changes
   - `new_feature`: something customers could not do before
   - `removal`: something customers can no longer do
   - `performance`: speed or reliability only, with no change to what users do
3. List the product `features` it touches, using only tags from the feature list provided, and only features the line names directly.
4. List `keywords`: the OLD UI words that would appear in existing content and are now wrong (for example, “Timeline”, “Reports > Export”). Use single words or exact menu paths. Never use common English words such as “plan” or “share” on their own.
5. If a line is ambiguous (you can't tell what changed for the user), set `needs_clarification` and write the question for the product manager. Do not guess.
6. If one line describes two changes, return two records with the same `source_line` (for example, R4a and R4b).
7. Ignore lines with no user-facing change (internal fixes, refactors).

Return JSON only:

```json
{"release": "", "items": [{"id": "R1", "change_type": "", "features": [], "keywords": [], "summary": "", "source_line": "", "needs_clarification": null}]}
```

Feature list: {{FEATURE_TAGS}}
Release notes: {{RELEASE_NOTES}}

## Change log
- v1.0 (Nov 4): first version.
- v1.1 (Nov 12): added change-type definitions, keyword and tag rules, and the split rule. In a real run, v1.0 used “Plan” and “Guest access” as keywords (one over-matches, one never matches old content), added an unsupported “sharing” tag, and typed the approvals change as a new feature.
