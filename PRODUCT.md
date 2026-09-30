# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: a mediator (teacher, monitor, or event host) running a live quiz for a room split into groups. The mediator drives the app on one computer projected to a TV or projector screen; the groups answer out loud on their turn and the mediator records the answer. The audience reads the screen from across a room.

## Product Purpose

A group-challenge quiz platform. Groups take turns answering questions from a chosen subject; a correct answer scores points and a live ranking shows who is winning. The match ends when the subject's questions run out, ending on a podium. Success: the room follows whose turn it is, what the question is, and the standings at every moment, and the mediator never fights the interface.

## Positioning

Built for the projected classroom moment, not for solo study: one operator, many spectators, turn order and ranking always visible. Content is managed inside the app (subjects, questions, import/export), not locked to a fixed deck.

## Operating Context

- Projected screen, typically 16:9, read at a distance; the mediator also uses the same screen at arm's length (laptop). Mouse and keyboard, sometimes a presenter clicker.
- Default of 5 groups; the mediator can rename them and adjust the count.
- Offline-capable PWA; data lives in the browser (localStorage) behind the `QuizRepository` interface so a real backend can be swapped in later.

## Capabilities and Constraints

- Scoring rule (confirmed): simple. Correct answer earns points, wrong earns nothing, and the turn passes to the next group either way. Points follow the question difficulty (easy 10, medium 20, hard 30).
- Match end (confirmed): plays until the subject's questions run out; the mediator can also end early. Ends with a final ranking/podium.
- Question types: single-correct multiple choice, multiple-correct, true/false, open (discursive; the mediator judges right/wrong).
- Admin area stays: subjects, questions (rich text), JSON/CSV import, backup/export, reset to seed.
- The previous Ludo board, dice, pieces, and printable kit are retired.
- No login, no multi-device sync.

## Brand Commitments

None binding. The product name is open; the old "Ludo Reprodutor" name and green header are retired with the Ludo concept.

## Evidence on Hand

- 93 seed questions on "Sistema Reprodutor" (25 easy, 33 medium, 35 hard), all multiple choice, in `src/data/seed.ts`.
- No real group names, logos, or event branding exist; group names are user-entered.

## Product Principles

1. The room must always know whose turn it is.
2. The mediator's next action is always one obvious control away.
3. Legible from the back of the room: scale and contrast over density.
4. Scores are derived from recorded answers, never edited by hand silently.

## Accessibility & Inclusion

Projected at distance: high contrast, large type, color never the only carrier of group identity (names and marks alongside color).
