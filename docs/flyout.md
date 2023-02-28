# <flux-flyout/>

A flyout is a hidden element with another element that can open it. The contents of
a flyout can be for example a menu, that is hidden under three dots. It can also
contain other ui elements such as more elements.

### Props

| Name            | Type               | Description                                             |
|-----------------|--------------------|---------------------------------------------------------|
| `axis`          | `string`           | The position of the flyout.                             |
| `is-auto-width` | `boolean`          | If the flyout should have the same width as the opener. |
| `margin`        | `number`           | Margin from the opener that the flyout should have.     |
| `width`         | `number \| string` | The width of the flyout.                                |

### Slots

| Name    | Context                                                                                       |
|---------|-----------------------------------------------------------------------------------------------|
| default | { paneX: number; paneY: number; close: Function; openerWidth: number; openerHeight: number; } |
| opener  | { close: Function; open: Function; toggle: Function; }                                        |
