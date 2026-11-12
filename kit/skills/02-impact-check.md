# Skill 02: Check whether a flagged asset needs an update (v1.1)

Purpose: filter the deterministic impact scan (flag_impacted.py), which over-flags on purpose.
Who runs it: the AI, once per flag. Who checks it: the asset owner sees every “no update” decision with its reason.

## Instructions

You will get one learning asset (with metadata) and one change record from the release.

Decide whether the asset now tells customers something wrong, incomplete or out of date because of this change.

Return JSON only:

```json
{"asset": "", "release_item": "", "decision": "update | no_update | unsure",
 "conflicting_lines": ["exact lines from the asset that are now wrong"],
 "reason": "one sentence a busy reviewer can scan",
 "human_owned_parts": ["learning objective | assessment item | certification item | pricing or legal text"],
 "question_for_owner": null}
```

Rules:
1. `update` only if you can point to at least one exact line in the asset that conflicts with the change record. Check the title and metadata as well as the body, and match old names in any case and in plural or possessive form (Timeline, timeline, timelines).
2. `no_update` if the asset is still accurate. A change that makes the product better (for example, faster) does not make the asset wrong.
3. `unsure` if the release does not say enough. Write the question for the product manager. Never guess.
4. If a conflicting line is part of a learning objective, an assessment or certification item, or pricing or legal text, list it in `human_owned_parts`. The draft step will propose wording, but a person decides.

## Change log
- v1.0 (Nov 4): first version.
- v1.1 (Nov 12): check title and metadata; match old names in any case. In a real run, v1.0 found the outdated title but missed the lowercase heading “Share a timeline”.
