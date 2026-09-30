---
version: 1
slug: "src-pages-matchpage-tsx"
primary_target: "src/pages/MatchPage.tsx"
related_targets: []
---

# Surface brief: match screen (and the app shell it sets)

Scope: the live match screen projected to the room, plus setup, final podium, home and admin inheriting the same world. Mode: operate (mediator) with spectators reading at distance.
Audience/task: mediator runs turns for 5 groups; room must read whose turn, the question, the choices and the standings from the back of the room.
Constraints: 16:9 projection first, laptop second, phone only for admin; keyboard driven (1-9 pick, Enter advance, Z undo).

## Direction contract

THESIS: The match is a live sports broadcast: the group on turn gets a skewed lower-third that wipes in, the score bug is always on screen, and the standings table is the between-rounds broadcast graphic. Refuses the Kahoot arrangement of four colored shape tiles on purple.

OWN-WORLD: Night-studio navy ground, broadcast yellow as the single live accent (turn + primary action only), off-white ink. Heavy condensed italic numerals and captions (Archivo at narrow width, 800-900 italic), normal-width Archivo for question text. Skewed parallelogram tarjas, hard straight edges, 45deg slant cuts, team color bars. Groups identified by letter mark + name + color.

STORY: The room sees whose turn it is, reads the question huge, the group answers aloud, the mediator clicks the choice, the reveal flashes certo/errado with +points flying into the score bug, the table reorders. After each full round a standings graphic. At the end a podium.

FIRST VIEWPORT: Top guide strip (subject, pergunta N de M, rodada R de T). Left 2/3: turn tarja (team color, "Vez do" + team name huge italic), question prompt at 40-56px, choices as full-width slanted rows lettered A-D. Right 1/3: live standings rail, position, letter mark, name, points in tabular italic numerals, last-answers marks. Bottom-right primary action in yellow.

FORM: Broadcast sports graphics (TV score bug, lower-thirds, standings board); position 1 on the ordered list, chosen as the pick card; seed key 43c3f405.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
