# Skill 03: Draft the update (v1.2)

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
8. Never carry an old detail into new text unless the change record confirms it still holds (for example, where a tab sits).
9. List anything you could not verify under `open_questions`. Give each question an `owner` (product manager, asset owner, style guide owner) and mark it `blocking` or `non_blocking`. List at most 3 blocking questions. Leave wording and style choices to the review rubric; don’t raise them as questions.

Return JSON only:

```json
{"asset": "", "lines": [{"text": "", "source": "R1 | unchanged"}], "open_questions": [{"question": "", "owner": "", "priority": "blocking | non_blocking"}], "human_decides": []}
```

## Change log
- v1.0 (Nov 4): first version.
- v1.1 (Nov 5): added rule 7, first from the sample run used in the demo.
- v1.1 tested (Nov 12): in a real run, v1.0 invented no features but kept “at the top of the project” from the old article, a location R1 never stated, and listed 7 open questions without owners. With rule 7, the same input dropped the unsupported location and listed 5 questions.
- v1.2 (Nov 12): added rule 8 (no carried-over details) and owners and priority on every open question, after the AI reviewer flagged both.
