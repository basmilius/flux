---
outline: deep

props:
    -   name: max
        description: The maximum number of avatars to display. Remaining avatars are summarized in a "+N" overflow chip.
        type: number
        optional: true

    -   name: overlap
        description: The fraction of the avatar size that each avatar overlaps the previous one.
        type: number
        optional: true
        default: 0.3

    -   name: size
        description: The size of the avatars in pixels. Avatars without their own size inherit this value.
        type: number
        optional: true
        default: 32

slots:
    -   name: default
        description: The avatars to stack. Place FluxAvatar components here.
---

# Avatar group

The Avatar group component stacks multiple avatars into an overlapping row, optionally collapsing the overflow into a "+N" chip. It is useful for showing the members of a team, the participants of a conversation, or the assignees of a task. Avatars placed in the default slot inherit the group's `size`, so they are sized uniformly without extra configuration. Avatars stack from left to right, and the gap between them is cut out rather than painted, so the group blends into any background.

::: render
render=../code/components/avatar-group/preview.vue
:::

::: tip Accessibility
The group is exposed with `role="group"`; pass `aria-label` to describe it for assistive technology. When avatars overflow, the "+N" indicator carries a tooltip listing the names of the hidden avatars (taken from their `alt` or `fallback-initials`), so the collapsed members remain discoverable.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic stack of avatars.
example=../code/components/avatar-group/basic.vue
:::

::: example Overflow || A stack that collapses the overflow into a "+N" chip.
example=../code/components/avatar-group/overflow.vue
:::

::: example Labelled || A labelled group whose "+N" indicator reveals the names of the hidden members on hover.
example=../code/components/avatar-group/labelled.vue
:::

::: example On a background || The gap between avatars is cut out, so the group works on any background colour.
example=../code/components/avatar-group/on-background.vue
:::

## Used components

- [Avatar](./avatar)
