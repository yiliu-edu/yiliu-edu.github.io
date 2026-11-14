# xAPI tracking plan: Pricing Conversations with Sellers

Completion tells us who finished. xAPI tells us which decisions learners struggle with, so the next revision targets real gaps.

| Moment | Verb | Object | Result |
|---|---|---|---|
| Opens an accordion or flip card | experienced | lesson-N/interaction-N | — |
| Answers a knowledge check | answered | lesson-N/knowledge-check | success, attempt |
| Chooses a scenario reply | answered | scenario/moment-N | success, response (option A/B/C) |
| Finishes the scenario | completed | scenario | success |
| Completes the course | completed | course | completion |

Verb IRIs use the ADL vocabulary, for example `http://adlnet.gov/expapi/verbs/answered`.

## Questions the data answers
1. Which scenario moments are missed most on the first try? (Review any moment missed by more than 40%)
2. Do learners who open the worked examples do better on the knowledge check?
3. Where do learners stop? (Last statement before a session ends)

## Privacy
Learner IDs are the LMS account numbers, not names. Reports to partners are aggregated.
