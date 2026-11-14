# Scenario drafting prompt

A prompt for drafting scenario check items with Claude. The item bank in the demo was drafted with Claude; every item goes through the review steps below before it is used with new hires.

## Prompt

You are helping an instructional designer write scenario-based check questions for new small-business ads sellers.

Write 10 multiple-choice questions. Each one:
- Starts from a realistic client moment in the first month (a call, an email, a dashboard).
- Tests one of these objectives: explain how ads are ranked; fix wasted spend with keywords or match types; propose measurement before launch; handle a concern without discounting; leave a call with a dated next step.
- Has 3 options: one best answer and two believable mistakes new sellers actually make.
- Includes a one-sentence explanation of why the best answer is right.
- Uses only general search advertising concepts. Do not mention real ad platforms, real prices or real results.

Return a table: objective, scenario, options, best answer, explanation.

## Review steps before an item enters the bank
- Remove items that test trivia; keep items that test a client decision.
- Rewrite distractors that are obviously wrong, so each one is a real new-seller mistake.
- Check every ad concept against the essentials cards, and with a product SME.
- Keep each objective covered at least once, so a random draw of 5 still samples the sprint (the demo bank has 8 items).
