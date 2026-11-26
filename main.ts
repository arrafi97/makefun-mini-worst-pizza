// The Worst Pizza Topping — a make.fun Mini entry.
//
// The brief asks for the worst pizza topping. This program runs the
// specials board: it lists the topping's ingredients, the crust it sits
// on, and the chef's verdict, then pitches the whole disaster in one
// line. It checks the line against the bounty's gate (one line, 1–200
// characters) and writes it to entry.txt.
//
// Node 22, standard library only, no network, no dependencies.
import { closeSync, fsyncSync, mkdirSync, openSync, readFileSync, writeSync } from "node:fs";
import { resolve } from "node:path";

// The special, as the board would list it. Gummy bears, pickles and one
// very confused olive — three things that should never share a pizza —
// served on a crust of broken promises. The chef has already quit, which
// is the review that sells the topping better than any adjective.
const TOPPINGS = ["gummy bears", "pickles", "one very confused olive"];
const CRUST = "a crust of broken promises";
const CHEF_NOTE = "The chef has already quit.";

// Pitch the special: "Introducing our worst topping yet: <toppings>, on
// <crust>. <chef note>" The topping list joins with commas and "and"
// before the last item, the way a menu reads aloud.
function describeSpecial(toppings: string[], crust: string, note: string): string {
  const listed =
    toppings.slice(0, -1).join(", ") + ` and ${toppings[toppings.length - 1]}`;
  return `Introducing our worst topping yet: ${listed}, on ${crust}. ${note}`;
}

const LINE = describeSpecial(TOPPINGS, CRUST, CHEF_NOTE);

// The special needs exactly three toppings, and the last one must be
// the confused olive — it is the topping the whole pitch hangs on.
if (TOPPINGS.length !== 3 || !TOPPINGS[2].includes("confused olive")) {
  throw new Error("special must list three toppings ending in the confused olive");
}
if (!LINE.includes(CRUST) || !LINE.includes(CHEF_NOTE)) {
  throw new Error("pitch is missing the crust or the chef's note");
}

// Weigh the line: how many characters (Unicode code points) and how many
// bytes it takes as UTF-8. The gate cares about characters; the byte
// count is reported so the log says what actually landed on disk.
interface Weighing {
  chars: number;
  bytes: number;
}

function weigh(text: string): Weighing {
  return { chars: [...text].length, bytes: Buffer.byteLength(text, "utf8") };
}

// The bounty's gate: UTF-8 text, exactly one line, 1–200 characters,
// not blank. Returns the weighing when the line passes.
function passGate(text: string): Weighing {
  const result = weigh(text);
  if (text.trim() === "") {
    throw new Error("special must not be blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("special must fit on a single line");
  }
  if (result.chars < 1 || result.chars > 200) {
    throw new Error(`special must be 1-200 characters, got ${result.chars}`);
  }
  return result;
}

// Where the sealed scorer looks: $MAKEFUN_OUTPUT_DIR when set, /output
// otherwise. The directory is created when it is missing.
function serve(text: string): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const target = resolve(dir, "entry.txt");
  // Exactly the line and nothing else — no trailing newline — so two
  // runs always produce byte-identical files. The descriptor is fsynced
  // before it closes, so the bytes are on disk, not just buffered.
  const fd = openSync(target, "w");
  try {
    const bytes = Buffer.from(text, "utf8");
    if (writeSync(fd, bytes) !== bytes.length) {
      throw new Error("short write while serving the special");
    }
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  return target;
}

const { chars, bytes } = passGate(LINE);
const target = serve(LINE);
// Read the file back: the sealed scorer reads this file, so a mismatch
// must fail loudly instead of passing silently.
if (readFileSync(target, "utf8") !== LINE) {
  throw new Error("entry.txt does not match the checked special");
}
console.log(
  `special served: ${TOPPINGS.length} toppings, ${chars} chars, ${bytes} bytes -> ${target}`,
);
