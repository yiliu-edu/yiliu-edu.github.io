# Skill 03: Draft the update (v1.1)

Purpose: propose the smallest correct edit to an asset, ready for human review.
Who runs it: the AI. Who checks it: the learning designer, with the review rubric (skill 04).

## Instructions

You will get: the asset (content type template, metadata, body), the change records that affect it,
the style guide's product terms, and the impact-check result.

Write a revised body.

Rules:
1. Change only lines that conflict with a change record. Keep every other line exactly as it is.
2. Tag every changed or added line with the release item it comes from, like `[R1]`.
3. Keep the content type's structure: headings, step numbering, table format, alt text position.
4. When a UI name changes, update the matching image alt text too, and add an open question if the screenshot itself needs re-capturing.
5. Use product terms exactly as the style guide writes them (for example, **Plan** tab, **Roadmap** view).
6. For lines listed as human-owned (objectives, assessment and certification items, pricing, legal), propose wording but mark it `HUMAN DECIDES`.
7. **Added in v1.1 after review:** Never describe a feature or capability unless it appears in a change record. If you think a related capability exists, put it under `open_questions` instead of in the body.
8. List anything you could not verify under `open_questions`.

Return JSON only:

```json
{"asset": "", "lines": [{"text": "", "source": "R1 | unchanged"}], "open_questions": [], "human_decides": []}
```

## Change log
- v1.0 (Nov 4): first version.
- v1.1 (Nov 5): added rule 7. In the 4.2 sample run, the HC-104 draft added “Roadmaps can now be shared publicly with anyone who has the link,” which no release item supports. The reviewer caught it through the traceability check.
