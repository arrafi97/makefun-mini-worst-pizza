# The Worst Pizza Topping

[![make.fun · u-motasimfuad-the-worst-pizza-topping-062c6893](https://make.fun/badge/u-motasimfuad-the-worst-pizza-topping-062c6893.svg)](https://make.fun/bounty/u-motasimfuad-the-worst-pizza-topping-062c6893?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-the-worst-pizza-topping-062c6893)
[![rank](https://make.fun/badge/u-motasimfuad-the-worst-pizza-topping-062c6893/arrafi97/makefun-mini-worst-pizza/rank.svg)](https://make.fun/bounty/u-motasimfuad-the-worst-pizza-topping-062c6893/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-the-worst-pizza-topping-062c6893)
[![reward](https://make.fun/badge/u-motasimfuad-the-worst-pizza-topping-062c6893/arrafi97/makefun-mini-worst-pizza/reward.svg)](https://make.fun/bounty/u-motasimfuad-the-worst-pizza-topping-062c6893?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-the-worst-pizza-topping-062c6893)

An entry for the make.fun Mini
[The Worst Pizza Topping](https://make.fun/bounty/u-motasimfuad-the-worst-pizza-topping-062c6893)
— the worst pizza topping, $2 prize, 10 paid places, deadline Fri 27 Nov
2026 03:50 WIB.

## The line

> Introducing our worst topping yet: gummy bears, pickles and one very confused olive, on a crust of broken promises. The chef has already quit.

## The special

A sales pitch for the worst topping imaginable. Gummy bears, pickles and
one very confused olive — three things that should never share a pizza —
served on a crust of broken promises. And the chef has already quit, which
is the review that sells the topping better than any adjective. The pitch
stays vivid and clean: every word is doing work.

## How the program runs the board

`main.ts` keeps the special the way a specials board would: the topping
list, the crust, and the chef's note, each as its own value. A
`describeSpecial()` function pitches them in one line, joining the
toppings with commas and "and" before the last one, the way a menu reads
aloud.

`passGate()` weighs the line — characters as Unicode code points, plus
the UTF-8 byte count — and checks the bounty gate: non-blank, a single
line, 1–200 characters. `serve()` then writes exactly the line to
`entry.txt` through a file descriptor, fsyncs it so the bytes are on
disk and not just buffered, and the program reads the file straight back
to prove it matches. Two runs always produce byte-identical output.

## Running it

```sh
mkdir -p out
MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

`main.ts` is a small Node 22 program that uses only the standard library
and never touches the network. It writes `entry.txt` to
`$MAKEFUN_OUTPUT_DIR` when set, otherwise `/output`.

## What's here

- `main.ts` — lists the special, checks the gate, serves `entry.txt`.
- `README.md` — this page, with the live make.fun badges.
- `LICENSE` — MIT license.
- `.gitignore` — keeps local `out/` folders out of the repo.

Written by an AI coding agent for arrafi97. Licensed under MIT.
