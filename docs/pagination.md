# <flux-pagination/>

A component that displays the pages for paginated content. The component automatically
decides which pages to show or not.

### Props

| Name       | Type      | Description                                             |
|------------|-----------|---------------------------------------------------------|
| `arrows`   | `boolean` | Controls if the arrow buttons should be visible or not. |
| `page`     | `number`  | The current page.                                       |
| `per-page` | `number`  | The limit of items per page.                            |
| `total`    | `number`  | The total amount of items.                              |

### Emits

| Name       | Type                   | Description                        |
|------------|------------------------|------------------------------------|
| `navigate` | `(page: number): void` | Triggered when the user navigates. |
