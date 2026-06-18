# Contact profile

A detail screen for a single entity — a contact, a customer, a user — pulls together identity, metadata, history and contextual actions. This recipe combines the persona, description-list, timeline and action components into one profile.

::: render
render=../../code/guide/patterns/profile/preview.vue
:::

A `FluxPersona` heads the card, with quick actions in a `FluxActionStack` and labels in a `FluxTagStack`. The body switches between an editable `FluxDescriptionList`, a team `FluxAvatarGroup` and an activity `FluxTimeline` through `FluxTabs`.

## Examples

::: example Action bar & promo || A `FluxActionBar` with primary, filter, search and export slots, link buttons, and a `FluxActionPane` upsell.
example=../../code/guide/patterns/profile/actions.vue
:::

::: example Collapsible sections || A `FluxExpandableGroup` that keeps secondary detail — personal info, security, integrations — tucked away until needed.
example=../../code/guide/patterns/profile/details.vue
:::

## Used components

`FluxPersona`, `FluxAvatar`, `FluxAvatarGroup`, `FluxActionStack`, `FluxAction`, `FluxActionBar`, `FluxActionPane`, `FluxTagStack`, `FluxTag`, `FluxChip`, `FluxBadge`, `FluxDescriptionList`, `FluxDescriptionItem`, `FluxInlineEdit`, `FluxLink`, `FluxTabs`, `FluxTab`, `FluxTimeline`, `FluxTimelineItem`, `FluxExpandable`, `FluxExpandableGroup`, `FluxPrimaryButton`, `FluxSecondaryButton`, `FluxPrimaryLinkButton`, `FluxSecondaryLinkButton`, `FluxButtonStack`, `FluxFormInput`, `FluxSeparator`, `FluxSpacer`, `FluxFlex`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`.
