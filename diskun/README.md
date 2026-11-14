# Diskun Bonus Checklist

A checklist of all 249 special bonuses in *Super Smash Bros. Melee*. Earn every one at least once to unlock the Diskun trophy.

Live at <https://wimmer.cool/diskun/>. It's a single page, `index.html`, with no build step.

## Features

- Tick bonuses off by hand. Your ticks are saved in your browser.
- Search the list, filter by category, or show only the bonuses you're missing.
- **Read a Dolphin save** to tick every bonus you've already earned. The file is read in the page and never uploaded.

## Reading your save

Click **Load save file**, or drop the file onto the page. It accepts:

- the Melee save from a GCI folder: `Dolphin Emulator\GC\USA\Card A\01-GALE-SuperSmashBros0110290334.gci`;
- a whole memory card image: `Dolphin Emulator\GC\MemoryCardA.USA.raw`;
- a `.gci` exported from Dolphin's Memory Card Manager.

### How it works

Melee stores earned bonuses as a 256-bit bitset in its save data.

1. The page finds the Melee file on the card.
2. It undoes the game's byte scrambling and checks each block's checksum.
3. It picks the newest copy of the main save block.
4. It reads the bitset.

The bonus number for each name comes from the game's Special Bonus menu order, matched to the list by point values. Minimalist and Materialist follow game version 1.02; on 1.00 and 1.01 they may come out swapped.

## Credits

- Bonus list: [SmashWiki, List of bonuses](https://www.ssbwiki.com/List_of_bonuses).
- Save format: the [Melee decompilation project](https://github.com/doldecomp/melee) and [melee-gci-compiler](https://github.com/dansalvato/melee-gci-compiler).

Super Smash Bros. Melee is a trademark of Nintendo. This is an unofficial fan project.
