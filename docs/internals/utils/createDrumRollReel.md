# createDrumRollReel

Creates a cell that rolls between strings with [drumRoll](./drumRoll). The cell is appended to the parent and returns a setter. The setter returns whether the text changed, which makes it easy to stagger only the cells that actually roll.

The glyphs sit absolutely positioned inside the cell, so the class has to give the cell a height and position its direct `span` children absolutely. The cell width follows the glyph; a CSS transition on `width` animates it.

## Usage

```ts
import { createDrumRollReel } from '@flux-ui/internals';

const cells = Array.from('1294', char => {
    const cell = createDrumRollReel(label, $style.cell);
    cell(char, 0);

    return cell;
});

// Roll every changed character up, 40ms apart.
let rolled = 0;

Array.from('1301').forEach((char, i) => {
    if (cells[i](char, 1, rolled * 40)) {
        rolled++;
    }
});
```

```scss
.cell {
    position: relative;
    display: inline-block;
    height: 1lh;
    vertical-align: top;
    transition: width .52s cubic-bezier(.4, 0, .2, 1);

    > span {
        position: absolute;
        top: 0;
        left: 0;
    }
}
```

A direction of `0` swaps the text without a roll, which is how a cell gets its first value.

## Type declarations

```ts
declare function createDrumRollReel(
    parent: HTMLElement,
    className: string
): (text: string, direction: number, delay?: number) => boolean;
```

## Used by

- [FluxVisualDrumRoll](/visuals/components/drum-roll)
- [FluxDateScrubber](/components/date-scrubber)
