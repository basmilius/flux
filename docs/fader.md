# <flux-fader/>

Fades through its `<flux-fader-item/>` children one by one. Can be used as a header.

### Props

| Name       | Type     | Description                           |
|------------|----------|---------------------------------------|
| `interval` | `number` | The interval between each item in ms. |

### Props

| Name     | Type                    | Description                                    |
|----------|-------------------------|------------------------------------------------|
| `update` | `(index: number): void` | Triggered when the fader activates a new item. |

### Slots

| Name    | Context                                                  |
|---------|----------------------------------------------------------|
| default | { current: number; next: Function; previous: Function; } |
