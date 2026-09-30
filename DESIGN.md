---
name: Arena Quiz
description: Desafio de perguntas entre grupos, com placar ao vivo, feito para o telão da sala.
colors:
  studio-navy: "hsl(222 72% 10%)"
  panel-navy: "hsl(221 62% 15%)"
  raised-navy: "hsl(219 55% 22%)"
  hairline-navy: "hsl(219 42% 25%)"
  broadcast-ink: "hsl(216 45% 96%)"
  caption-steel: "hsl(219 30% 74%)"
  live-yellow: "hsl(50 100% 50%)"
  correct-green: "hsl(150 72% 46%)"
  wrong-red: "hsl(355 100% 64%)"
  team-red: "#ff4757"
  team-blue: "#2e86ff"
  team-green: "#1fd17a"
  team-orange: "#ff8a1f"
  team-violet: "#a66bff"
  team-pink: "#ff5fb4"
  team-teal: "#19d3c5"
  team-lime: "#b8e62e"
typography:
  broadcast:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 850
    fontVariation: "'wdth' 70"
    letterSpacing: "-0.01em"
  stage-question:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 0.8rem + 2vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  stage-choice:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 0.7rem + 1.15vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "5px"
  lg: "6px"
components:
  button-live:
    backgroundColor: "{colors.live-yellow}"
    textColor: "{colors.studio-navy}"
    typography: "{typography.broadcast}"
    height: "56px"
    padding: "0 40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.broadcast-ink}"
    rounded: "{rounded.md}"
  panel:
    backgroundColor: "{colors.panel-navy}"
    textColor: "{colors.broadcast-ink}"
    rounded: "{rounded.lg}"
  choice-row:
    backgroundColor: "{colors.panel-navy}"
    textColor: "{colors.broadcast-ink}"
    typography: "{typography.stage-choice}"
  choice-row-correct:
    backgroundColor: "{colors.correct-green}"
    textColor: "{colors.studio-navy}"
  choice-row-wrong:
    backgroundColor: "{colors.wrong-red}"
    textColor: "#ffffff"
---

# Design System: Arena Quiz

## Overview

A live sports broadcast in a night studio. The match screen is projected to a room, so every surface is built like TV sports graphics: a skewed lower-third for the group on turn, a standings board that is always on screen, and a full-screen standings graphic between rounds. One dark theme only; the use scene (projector, room read from the back) decided it, and there is no light variant.

## Colors

- **Studio navy** is the ground everywhere. Panels step up in lightness (panel, raised) instead of casting shadows.
- **Live yellow** is the single accent and means "now": the group on turn, the primary action, the current nav item, focus rings, text selection. Never decorative.
- **Correct green / wrong red** are reserved for answer outcomes and always travel with an icon (check / X) and a word.
- **Team colors** (8) identify groups. A team color never appears without the group's letter mark and name next to it. Light team colors (green, orange, pink, teal, lime) carry navy ink; dark ones carry white.

## Typography

One family, Archivo (variable, self-hosted), in two voices:

- **Broadcast voice**: narrow width (70%), weight 850, italic, uppercase for captions. Used for titles, team names in tarjas, scores, position numbers, and the primary button.
- **Reading voice**: normal width, weight 500-600, upright. Used for question prompts, choices, and all admin text.

Stage sizes scale with viewport width (`text-stage-sm/md/lg/xl`) so the match reads at the same proportion on a laptop and a projector. Every number that changes (scores, counts) is tabular.

## Layout

- Match screen: fixed `100dvh` grid. Guide strip on top (live indicator, subject, "Pergunta N de M", "Rodada R de T", tools), stage on the left, standings rail on the right (`clamp(20rem, 30vw, 34rem)`), mediator bar at the bottom with the primary action at the far right. Below `lg` the rail becomes a horizontal score strip above the mediator bar.
- Other screens: `max-w-6xl` (admin `max-w-4xl`) with a sticky top bar; big broadcast title top-left, content below.

## Elevation & Depth

Flat. Depth is tonal (navy steps) plus the active ring (2px inset yellow). No card shadows; dialogs sit on a dimmed, lightly blurred overlay.

## Shapes

- Broadcast elements are parallelograms cut at the ends with `clip-path` (`.slant`, `.slant-left`, `.slant-right`, slant set by `--slant`): turn tarja, points chip, team letter marks, the live button, the brand mark.
- Everything else uses small radii (4-6px). No pills except tiny status marks.

## Components

- **TurnBanner**: team-colored tarja (letter + "Na vez" + name) and a points chip; wipes in from the left on every new question (`animate-wipe`).
- **Choice row**: full-width row with a lettered block (A-D) on the left; chosen gets the yellow ring, reveal turns the correct row green with a check and a wrong pick red with an X and a shake; the rest dims.
- **StandingsList**: rows with position, letter mark, name, recent answer marks, and score; rows re-order with a spring layout animation and the scoring team's number pops in yellow. `board` size is used for round standings and the final table.
- **Button `live`**: yellow slanted, broadcast voice, the one primary action per screen, with the `Enter` hint on desktop.
- **Podium**: three team-colored columns in 2-1-3 order, height by position (ties share height), rising from the bottom.

## Do's and Don'ts

- Do keep exactly one yellow primary action per screen.
- Do pair every team color with the letter mark and the name.
- Do keep the standings visible during play (rail or strip).
- Don't add colored side stripes to rows or cards; the letter mark carries team identity.
- Don't use gradients or glow; projectors wash them out.
- Don't put small uppercase labels above section headings.
