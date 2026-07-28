---
outline: deep

props:
    -   name: code
        description: A short status code shown above the title, for example 404 or 503. It is decorative and hidden from assistive technology.
        type: [ 'string', 'number' ]
        optional: true

    -   name: description
        description: The explanation below the title. Defaults to the copy of the variant.
        type: string
        optional: true

    -   name: icon
        description: Overrides the icon of the variant. Ignored when the media slot is used.
        type: FluxIconName
        optional: true

    -   name: title
        description: The heading of the page, rendered as an h1. Defaults to the copy of the variant.
        type: string
        optional: true

    -   name: variant
        description: The preset that picks the icon, the accent color and the default copy.
        type: [ '"error"', '"maintenance"', '"not-found"', '"offline"' ]
        default: error
        optional: true

slots:
    -   name: actions
        description: The actions that lead the user out of the page. Replaces the default back button.

    -   name: default
        description: Replaces the description with your own content.

    -   name: media
        description: An illustration rendered instead of the icon.

requiredIcons:
    - compass
    - screwdriver-wrench
    - triangle-exclamation
    - wifi-slash
---

# Application status page

The application status page is the full-page state an application shows instead of its content: the page was not found, the server broke, the connection dropped or the app is down for maintenance. It pairs an icon or illustration with a status code, a heading, an explanation and a way out.

::: render
render=../../code/application/status-page/preview.vue
:::

::: tip
The four variants (`error`, `maintenance`, `not-found` and `offline`) each carry their own icon, accent color and copy, so `<FluxApplicationStatusPage variant="not-found"/>` already renders a complete page. Pass `title` and `description` to replace the copy, and `code` to add the status code.
:::

::: tip
The page grows to fill its parent and centers itself in it, without ever setting a height of its own. Inside an [Application content](./content) area that means it fills the viewport. It also works standalone, outside `FluxApplication`: it injects nothing from the shell, needs no router and measures nothing, which is exactly what you want on the page a user reaches when something failed. Give it a parent that is a vertical flex container with a height if you want the same vertical centering there.
:::

The heading is an `<h1>`, because a status page replaces the content of the page and has no other heading. The `code` sits above it as decoration and is hidden from screen readers, so the accessible name of the page stays the title.

Without an `actions` slot the page renders a single back button, which uses the router when there is one and the browser history otherwise. The actions sit in a centered row that becomes a centered column on a narrow viewport, in document order, so put the action you want first at the top of the slot.

The copy of the four variants and the label of that back button are translated through `flux.application.*`; [Translations](../introduction/translations) lists them.

<FrontmatterDocs/>

## Examples

::: example Not found || A 404 page tells the user the address is wrong and offers a route back into the app.
example=../../code/application/status-page/not-found.vue
:::

::: example Error || Use the error variant for anything that broke on the server, with a retry as the first action.
example=../../code/application/status-page/error.vue
:::

::: example Maintenance || Planned downtime is not a failure, so the maintenance variant stays calm and tells the user when to come back.
example=../../code/application/status-page/maintenance.vue
:::

::: example Offline || The offline variant covers a dropped connection. The copy stays neutral, since nothing is actually broken.
example=../../code/application/status-page/offline.vue
:::

::: example Custom illustration || The media slot replaces the icon with your own artwork. The variant then only picks the accent color and is a handy way to cover codes without their own preset, such as 403.
example=../../code/application/status-page/custom-illustration.vue
:::

## Used components

- [Boxed icon](../../components/boxed-icon)
- [Secondary button](../../components/button/secondary)
