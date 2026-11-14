# Storyline 360 build guide: Discovery Call with Rosa

The web version of this scenario (`demos/ads-seller-scenario.html`) was built in HTML on the same model as an Articulate Storyline 360 project. This guide maps every part to Storyline so the scenario can be rebuilt there and published to an LMS.

## Project setup
- Slide size: 16:9 (960 × 540)
- Player: Modern player, sidebar menu on, seekbar on (read-only), Previous and Next buttons, Resources tab
- Menu navigation: Restricted (learners can revisit slides they have already seen)
- Theme colors: navy #1C4587, blue #3878BC, orange #F28A26, white
- Character: Rosa, built from a Storyline illustrated character or a custom character with three states: Normal, Happy, Skeptical

## Variables
| Variable | Type | Default | Use |
|---|---|---|---|
| Trust | Number | 40 | Client trust, shown on a progress-style text box and a bar |
| FirstTry | Number | 0 | Moments where the best reply was chosen first |
| Tried_M1 … Tried_M6 | True/False | False | Whether the learner has already answered that moment |

## Slides
| # | Slide | Main objects | Timeline |
|---|---|---|---|
| 1 | Welcome | Title, subtitle, Rosa, Start button | Fly-in and fade entrances; Start button appears last with a pulse emphasis |
| 2 | Meet Rosa | Scene background, Rosa, call goals card, trust meter | Rosa slides in; goals appear one by one; Next enabled when the timeline ends |
| 3–8 | Moments 1–6 | Rosa’s line (callout), 2–3 reply buttons, trust meter, stage label | Callout zooms in; reply buttons fly in one after another |
| 9 | Results | Trust score, first-try badges, message, CRM note button, Replay button | Score counts up; badges zoom in |

## Layers on each moment slide
- Feedback_Good: what you said, Rosa’s reply, green coach note, Continue button
- Feedback_Try: what you said, Rosa’s reply, orange coach note, Try again button
- Options on both layers: Hide other slide layers; Prevent clicking on the base layer

## Button states
Normal, Hover, Down, Visited (strikethrough and dimmed for a reply already tried), Disabled.

## Triggers (moment slide, best reply)
1. Adjust variable Trust = Trust + 12 when the user clicks Reply A
2. Adjust variable FirstTry = FirstTry + 1 when the user clicks Reply A, if Tried_M1 = False
3. Adjust variable Tried_M1 = True when the user clicks Reply A
4. Change state of Rosa to Happy when the user clicks Reply A
5. Show layer Feedback_Good when the user clicks Reply A
6. Jump to next slide when the user clicks Continue (on Feedback_Good)

## Triggers (moment slide, weaker reply)
1. Adjust variable Trust = Trust − 15 when the user clicks Reply B (amount set per reply)
2. Adjust variable Tried_M1 = True when the user clicks Reply B
3. Change state of Reply B to Visited, and to Disabled when the timeline starts on this slide, if Reply B was tried
4. Change state of Rosa to Skeptical when the user clicks Reply B
5. Show layer Feedback_Try when the user clicks Reply B
6. Hide layer when the user clicks Try again (Rosa returns to Normal when the timeline starts on the base layer)

Trust is kept between 0 and 100 with two extra triggers: set Trust to 0 when the variable changes, if Trust < 0; set Trust to 100 if Trust > 100.

## Results slide
- Show text “Rosa agreed to a dated next step” if Trust ≥ 70; otherwise show “Rosa stayed guarded”
- Change state of Rosa to Happy or Skeptical with the same condition
- Show layer CRM_Note when the user clicks View CRM note
- Reset results and jump to slide 1 when the user clicks Replay

## Accessibility
- Alt text on Rosa and the scene; decorative shapes hidden from screen readers
- Focus order set on every slide and layer (callout, replies, then buttons)
- Closed captions for Rosa’s lines if voice-over is added
- Text contrast checked against the navy and orange colors

## Publishing and tracking
- Preview and review rounds in Review 360 with the sales manager and a product expert
- Publish to LMS as SCORM 2004
- Tracking: using triggers. On the Results slide, a Complete course trigger reports Passed if Trust ≥ 70, otherwise Failed

## Build status
The HTML version is complete. The Storyline version is the next build, following this guide.
