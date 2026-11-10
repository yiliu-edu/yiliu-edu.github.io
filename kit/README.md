# Release-Ready Learning Content: an AI-assisted content currency workflow

A working prototype of a workflow that keeps customer learning content current as a SaaS product changes.
It takes a release from intake to flagged assets, AI-drafted updates, human review and publish, and feeds
every review decision back into the prompts.

Kitebird Projects and all of its content are fictional, created for this portfolio.
Designed and built by Yi Liu, November 2026.

## The workflow

| Step | What happens | Who does it | Files |
|------|--------------|-------------|-------|
| 1. Intake | Release notes become structured change records with the exact source line quoted | AI drafts, designer checks | `skills/01-intake-classify.md`, `content/release-4.2.json` |
| 2. Impact scan | Every asset is matched to every change by feature tag and by UI keyword | Script (deterministic) | `flag_impacted.py`, `sample-run/impact-report.json` |
| 3. Impact check | Each flag is confirmed, dismissed with a reason, or turned into a question for Product | AI, visible to asset owner | `skills/02-impact-check.md`, `sample-run/impact-check.json` |
| 4. Draft | Smallest correct edit, every changed line tagged with its release item | AI | `skills/03-draft-update.md`, `sample-run/drafts.json` |
| 5. Review | Rubric checks run automatically; a person approves, edits, routes or rejects | Designer (always) | `skills/04-review-rubric.md` |
| 6. Learn | Review decisions become new prompt rules | Designer | change log in skill 03 |

## Where AI drafts and where a person owns the work

- AI drafts: change classification, impact checks, minimal edits to procedures, UI names, alt text, tooltip copy.
- A person owns: learning objectives, assessment and certification items, pricing and legal text, anything with an open question, and every publish decision.
- No customer-facing change publishes without a human decision in the review log.

## Run the scan

```
python3 flag_impacted.py content/library.json content/release-4.2.json > sample-run/impact-report.json
```

## Sample run (release 4.2)

- 9 assets scanned, 10 flags. The keyword pass caught HC-050 (a shortcut table), which has no `timeline` tag. A tag-only scan would have missed it.
- Impact check dismissed 2 flags with reasons (HC-415, and JA-07 for R2) and turned 1 into a question for Product (HC-050).
- 4 drafts reviewed: 1 approved as drafted, 1 approved with an edit, 2 routed to owners.
- The edit removed one unsupported claim in HC-104. That led to rule 7 in skill 03 (v1.1).

The sample outputs in `sample-run/` were drafted with Claude for this portfolio demo. Re-run the skills on the same inputs to compare results.
