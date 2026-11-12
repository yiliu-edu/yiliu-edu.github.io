# Skill 04: Review rubric for customer-facing learning content (v1.1)

Used two ways: the AI runs the automatic checks and reports them; a person makes the publish decision.
The same rubric applies to new assets before they reach customers.

Required inputs: the release notes, the original asset, the draft, and the style guide’s product terms. Without the style guide, check 3 cannot be scored.

| # | Check | Automatic? | Pass when |
|---|-------|------------|-----------|
| 1 | Traceability | Yes | Every changed line cites a release item, and the cited item supports it |
| 2 | Scope | Partly | The draft adds no feature, capability or claim beyond the change records |
| 3 | Terminology | Yes | Product terms match the style guide exactly |
| 4 | Instructional integrity | No | Steps are still in a usable order, and practice and checks still match the objective |
| 5 | Accessibility | Partly | Alt text matches the new UI; headings stay in order; links say where they go; nothing relies on color alone |
| 6 | Ownership | Yes | Objectives, assessment and certification items, pricing and legal text have a named human decision |
| 7 | Open questions | Yes | Every open question has an owner before publish |

## Decisions a reviewer can make
- Approve: publish as drafted.
- Approve with edit: fix the draft, publish, and log what changed so the prompt can improve.
- Route to owner: an open question or a human-owned part needs the product manager, Academy or legal.
- Reject: the draft misreads the change. Log the reason and re-run.

Every decision goes into the review log. Patterns in the log become new rules in skills 01–03.

## Change log
- v1.0 (Nov 4): first version.
- v1.1 (Nov 12): made the style guide a required input. In a real run, the reviewer pointed out that the prompt left it out.
