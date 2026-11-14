# Vendor build guide: Dual Literacy digital lessons (Mandarin–English)

For vendors and freelancers building screens from approved storyboards. The same structure is used for Spanish–English programs, with the language-specific rules swapped.

## Before you build
- Build only from the approved storyboard version named in the work order. Send questions to the designer in the tracker.
- Every screen ID in the build matches the storyboard (POND-B1, M1, C1…).

## Text
- Chinese: Simplified characters; full-width punctuation (。，！？); no spaces between characters except between interactive word buttons.
- Pinyin: tone marks in place of tone numbers (write qīngwā for qing1wa1); sentence-initial capital; checked against the storyboard, word by word.
- English: sentence case; straight-forward K–2 vocabulary from the program word list.

## Audio
- File names: `{lang}-{screen or word}.mp3`, for example `zh-p1.mp3`, `en-frog.mp3`.
- Every speaker button plays the file for the language on screen. In “Both” mode, each line has its own button.
- Native-speaker narration, child-friendly pace; no background music under words.

## Feedback
- Feedback appears in the selected language first, then the other (“真棒！ Great job!”).
- Incorrect answers: a gentle shake and a retry, never a fail screen.

## Accessibility
- Alt text on every meaningful image, in both languages; decorative images marked.
- Touch targets at least 44 × 44 px; everything works by keyboard; visible focus.
- Color is never the only signal (pair color with a label or shape).
- Text contrast at WCAG 2.1 AA.

## Delivery
- Build number on every review link (v0.1, v0.2…).
- Self-check with the QC checklist before submitting.
