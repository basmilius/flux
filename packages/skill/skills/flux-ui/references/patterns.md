# Idiomatic patterns (end-to-end)

These skeletons are distilled from a **production Flux app** (latest 3.x). They
show how the pieces fit — the wrappers, slot shapes, and common prop combinations,
which matters more than any single prop. (App-specific helpers — i18n, validation
wrappers, data services — are stripped to plain English placeholders.)

## 1. Application shell

The root of a Flux app: `FluxRoot` (dialogs/tooltips) wraps `FluxApplication`
(chrome) from `@flux-ui/application`. Pages render through `RouterView` inside a
`FluxRouteTransition`; deep-linkable overlays/slide-overs ride **named router
views** rather than `v-if` toggles.

```vue
<template>
  <FluxRoot>
    <FluxApplication>
      <template #menu>
        <AppMenu />
      </template>

      <!-- app-level banners -->
      <FluxNotice
        v-if="!hasActivePlan"
        color="danger"
        icon="triangle-exclamation"
        is-center
        is-fluid
        message="Your plan is inactive." />

      <RouterView v-slot="{ Component }">
        <FluxRouteTransition>
          <component :is="Component" :key="route.matched[1]?.path" />
        </FluxRouteTransition>
      </RouterView>

      <!-- deep-linkable dialogs as named router views -->
      <RouterView name="over" />     <!-- render inside a FluxSlideOver -->
      <RouterView name="overlay" />  <!-- render inside a FluxOverlay -->
    </FluxApplication>
  </FluxRoot>
</template>

<script lang="ts" setup>
  import { FluxApplication } from '@flux-ui/application';
  import { FluxNotice, FluxRouteTransition, FluxRoot } from '@flux-ui/components';
  import { useRoute } from 'vue-router';

  const route = useRoute();
</script>
```

## 2. CRUD / settings form

Wrap the page in `FluxApplicationContent layout="narrow"`. A `FluxForm` owns the
submit (and an optional form-wide `:disabled`). Group fields with
`FluxFormSection`; put side-by-side fields in a `FluxFormRow`; wrap each control
in a `FluxFormField`. The submit is a `FluxPrimaryButton is-submit` at the end of
the form.

```vue
<template>
  <FluxApplicationContent layout="narrow">
    <FluxForm :disabled="!canEdit" @submit="submit">
      <FluxFormSection title="Details">
        <FluxFormField label="Name">
          <FluxFormInput v-model="form.name" :max-length="64" />
        </FluxFormField>

        <FluxFormRow>
          <FluxFormField label="Phone">
            <FluxFormInput v-model="form.phone" :max-length="64" />
          </FluxFormField>
          <FluxFormField label="Website">
            <FluxFormInput v-model="form.url" :max-length="128" />
          </FluxFormField>
        </FluxFormRow>

        <FluxFormField label="Plan">
          <FluxFormSelect v-model="form.plan" :options="planOptions" />
        </FluxFormField>
      </FluxFormSection>

      <FluxPrimaryButton label="Save" icon-leading="circle-check" is-submit />
    </FluxForm>
  </FluxApplicationContent>
</template>

<script lang="ts" setup>
  import { FluxApplicationContent } from '@flux-ui/application';
  import { FluxForm, FluxFormField, FluxFormInput, FluxFormRow, FluxFormSection, FluxFormSelect, FluxPrimaryButton } from '@flux-ui/components';
  import { reactive } from 'vue';

  const form = reactive({ name: '', phone: '', url: '', plan: null });
  const canEdit = true;

  async function submit(): Promise<void> {
    await api.save(form);
  }
</script>
```

> Apps commonly wrap `FluxFormField` in their own validation component (passing
> `label`, `error`, `current-length`/`max-length` through to it) and provide
> select options via the `FluxFormSelectEntry` shape. The Flux part is unchanged.

### Image upload via FluxDropZone

`FluxDropZone` exposes `showPicker` through its scoped slots, so you trigger the
file dialog from your own button:

```vue
<FluxDropZone accept="image/png,image/jpeg" @select="upload">
  <template #default="{ showPicker }">
    <FluxAspectRatio :aspect-ratio="3 / 2" style="width: 210px">
      <img v-if="logo" :src="logo" alt="" />
      <FluxPlaceholder v-else is-button title="Add a logo" variant="small" @click="showPicker()" />
    </FluxAspectRatio>
  </template>
  <template #actions="{ showPicker }">
    <FluxButtonStack>
      <FluxSecondaryButton icon-leading="arrow-up" label="Upload" @click="showPicker()" />
      <FluxDestructiveButton label="Remove" @click="removeLogo()" />
    </FluxButtonStack>
  </template>
</FluxDropZone>
```

## 3. Data-table page

`FluxDataTable` is **data-driven**: feed it `:items` plus pagination props, define
columns in the `#header` slot with `FluxTableHeader`, and render each column
through a **named scoped slot** that returns a `FluxTableCell`. Row actions go in
an `#actions` slot via `FluxTableActions` › `FluxTooltip` › `FluxAction`.

```vue
<template>
  <FluxDataTable
    is-filled
    is-hoverable
    is-sticky
    :is-loading="isLoading"
    :items="items"
    :limits="[10, 25, 50]"
    :page="page"
    :per-page="perPage"
    :total="total"
    @limit="setPerPage"
    @navigate="setPage">
    <template #header>
      <FluxTableHeader>Code</FluxTableHeader>
      <FluxTableHeader>Validity</FluxTableHeader>
      <FluxTableHeader is-shrinking>Status</FluxTableHeader>
      <FluxTableHeader is-shrinking />
    </template>

    <template #code="{ item }">
      <FluxTableCell><code>{{ item.code }}</code></FluxTableCell>
    </template>

    <template #validity="{ item }">
      <FluxTableCell content-direction="column">
        <span>{{ formatDate(item.validFrom) }}</span>
        <small>Until {{ formatDate(item.validUntil) }}</small>
      </FluxTableCell>
    </template>

    <template #status="{ item }">
      <FluxTableCell>
        <!-- Badges pair a FluxColor with a matching icon + label (see note below). -->
        <FluxBadge v-if="item.isActive" color="success" icon="circle-check" label="Active" />
        <FluxBadge v-else color="gray" icon="circle-stop" label="Inactive" />
      </FluxTableCell>
    </template>

    <template #actions="{ item }">
      <FluxTableCell>
        <FluxTableActions>
          <FluxTooltip content="Edit">
            <FluxAction icon="pencil" type="route" :to="{ name: 'code-edit', params: { id: item.id } }" />
          </FluxTooltip>
          <FluxTooltip content="Delete">
            <FluxAction icon="trash" is-destructive :is-loading="removingId === item.id" @click="remove(item)" />
          </FluxTooltip>
        </FluxTableActions>
      </FluxTableCell>
    </template>
  </FluxDataTable>
</template>

<script lang="ts" setup>
  import { FluxAction, FluxBadge, FluxDataTable, FluxTableActions, FluxTableCell, FluxTableHeader, FluxTooltip } from '@flux-ui/components';
</script>
```

`FluxDataTable` **requires** `items`, `limits` (a `number[]` of page-size
options, e.g. `[10, 25, 50]`), `page`, `per-page` and `total` — omitting `limits`
is a type error. **Sticky headers are a table-level prop:** set `is-sticky` on
`FluxDataTable` (or `FluxTable`) and every header freezes on scroll via injection
— do **not** put `is-sticky` on individual `FluxTableHeader`s (older code did; this
version moved it to the table). Common `FluxTableHeader` props: `is-shrinking`
(size to content — use for icon/status/action columns), `is-sortable` (+ `:sort` /
`@sort`), and column sizing via `:width` (fixed px), `:min-width` (grows from a
floor) and `:max-width` (capped). `FluxTableCell` takes `content-direction="column"` to stack
a label over a sub-label. For an empty state, render an empty/placeholder splash
with a `FluxPrimaryButton type="route"` instead of the table when there are no
items.

**Overview-page wrapper (real apps).** In an `@flux-ui/application` app, wrap the
*list/overview page* in `FluxApplicationContent layout="full"`. `layout="full"` is
**specifically for a table or calendar**: its edge-to-edge, full-height,
internally-scrolling CSS (so sticky headers work) only kicks in when the
`FluxDataTable`/`FluxTable`/`FluxCalendar` is a **direct child**. So:

- **Don't wrap the table** in `FluxApplicationSection` / `FluxPane` — it breaks the
  direct-child selector (you lose full-height + sticky). A dedicated table
  *component* works only if **its root element is the table** (no wrapping `<div>`).
- `layout="full"` is **not** for card grids or KPI dashboards — use
  `layout="default"` / `"dashboard"` there.
- **No hero on a full table page** — the page title and actions come from the top
  bar, not the page (see §6).
- **Set `is-filled` on full-height tables.** With few rows, `is-filled` renders a
  filler row so the column dividers reach the bottom (no half-drawn grid). It
  replaces the old `fill-columns` prop — the table knows its own column count.

```vue
<!-- OrdersPage.vue — table is the DIRECT child of FluxApplicationContent -->
<template>
  <FluxApplicationContent layout="full">
    <FluxDataTable is-sticky :items="items" :limits="[10, 25, 50]" :page="page"
      :per-page="perPage" :total="total" @limit="setPerPage" @navigate="setPage">
      <!-- #filter / #header / column slots … -->
    </FluxDataTable>
  </FluxApplicationContent>
</template>
```

**Badge convention.** Real apps almost always give a `FluxBadge` a **`color`
(a `FluxColor`) *and* a matching `icon`**, plus a `label` — a bare badge is rare.
Status badges map each state to a `{ color, icon, label }` triple via a small
helper, e.g. active → `success` + `circle-check`, inactive → `gray` +
`circle-stop`, pending → `warning` + `clock`, error → `danger` +
`circle-exclamation`. The full palette is `gray | primary | danger | info |
success | warning`.

### Filterable data table

Put filters in the table's **`#filter`** slot: a `FluxTableBar` wrapping a
`FluxFilterBar`. The bar owns the filter state (`v-model="filters"`) and an
optional search (`v-model:search`); each child filter has a `name` (the filter
key), `label` and `icon`. Feed `filters` + `search` into the loader as reactive
deps so the table reloads on change.

```vue
<FluxDataTable :items="items" :limits="[10, 25, 50]" :page="page" :per-page="perPage"
  :total="total" :is-loading="isLoading" @limit="setPerPage" @navigate="setPage">
  <template #filter>
    <FluxTableBar>
      <FluxFilterBar v-model="filters" v-model:search="search" is-searchable
        search-placeholder="Search orders…">
        <!-- sync options: FluxFilterOptionItem[] = { icon?, label, value } -->
        <FluxFilterOption name="status" label="Status" icon="circle-check" is-searchable
          :options="statusOptions" />
        <!-- async-loaded options -->
        <FluxFilterOptionAsync name="event_id" label="Event" icon="calendar"
          :fetch-options="fetchEventOptions" :fetch-relevant="fetchRelevantEvents"
          :fetch-search="fetchSearchEvents" />
        <FluxFilterDateRange name="created_between" label="Created" icon="calendar" />
      </FluxFilterBar>
    </FluxTableBar>
  </template>

  <template #header><!-- … --></template>
  <!-- column slots … -->
</FluxDataTable>
```

```ts
import { FluxDataTable, FluxFilterBar, FluxFilterDateRange, FluxFilterOption, FluxFilterOptionAsync, FluxTableBar } from '@flux-ui/components';
import type { FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterValue } from '@flux-ui/types';

const statusOptions: FluxFilterOptionItem[] = [
  { icon: 'circle-check', label: 'Paid', value: 'paid' },
  { icon: 'circle-exclamation', label: 'Pending', value: 'pending' },
];
// async fetchers return FluxFilterOptionRow[]:
async function fetchEventOptions(ids: FluxFilterValue[]) { /* … */ }
```

Build reusable filters with `defineFilter`; custom controls read context via
`useFilterInjection`. Full filter list + per-type `v-model` value shapes:
`references/data-and-navigation.md`. Docs' worked example:
`https://flux-ui.dev/guide/patterns/filterable-data-table`.

## 4. Destructive action (confirm → act → snackbar)

The dominant feedback loop in real apps: `showConfirm` gates the action,
`showSnackbar` reports success. `showConfirm` resolves to a boolean — bail on
`false`.

```ts
import { showConfirm, showSnackbar } from '@flux-ui/components';

async function remove(item: Item): Promise<void> {
  const confirmed = await showConfirm({
    icon: 'circle-exclamation',
    title: 'Delete code',
    message: `Delete "${item.code}"? This cannot be undone.`
  });
  if (!confirmed) return;

  removingId.value = item.id;
  try {
    await api.delete(item.id);
    showSnackbar({ icon: 'circle-check', color: 'success', message: `Deleted "${item.code}".` });
    await reload();
  } finally {
    removingId.value = null;
  }
}
```

## 5. Pane composition

`FluxPane` is the surface for grouped content; most content lives in a
`FluxPaneBody`, with `FluxPaneHeader`/`FluxPaneFooter` for chrome and
`FluxButtonStack` for footer actions.

```vue
<FluxPane>
  <FluxPaneHeader title="Members" />
  <FluxPaneBody>
    <!-- content, often a FluxTable or fields -->
  </FluxPaneBody>
  <FluxPaneFooter>
    <FluxSpacer />
    <FluxButtonStack>
      <FluxSecondaryButton label="Cancel" @click="close" />
      <FluxPrimaryButton label="Save" @click="save" />
    </FluxButtonStack>
  </FluxPaneFooter>
</FluxPane>
```

### List rows — the `FluxItem` set

For a row with media + text + trailing chrome (a member, a project, an event),
compose the **item family** rather than hand-rolling a flex row: `FluxItem` ›
`FluxItemMedia` (avatar/icon, `:size`), `FluxItemContent` (`<strong>` title +
`<span>` subtitle), `FluxItemActions` (badge/buttons). Add `is-center` to vertically
center a part. Stack rows with `FluxItemStack`, which paints the dividers between
items for you — so keep `FluxItem`s as its **direct** children (a wrapper element
breaks the divider/padding selectors).

```vue
<FluxPane>
  <FluxItemStack>
    <FluxItem v-for="m in members" :key="m.id">
      <FluxItemMedia is-center :size="40">
        <FluxAvatar :alt="m.name" fallback-icon="user" :size="40" />
      </FluxItemMedia>
      <FluxItemContent is-center>
        <strong>{{ m.name }}</strong>
        <span>{{ m.role }}</span>
      </FluxItemContent>
      <FluxItemActions is-center>
        <FluxBadge :color="m.color" :label="m.status" />
      </FluxItemActions>
    </FluxItem>
  </FluxItemStack>
</FluxPane>
```

### Static list vs. clickable rows (pick by navigation)

The list's container depends on whether rows navigate — these are two different
patterns, don't mix them:

- **Static rows** → `FluxPane` › `FluxItemStack` › `FluxItem` (as above). Shared
  card, dividers between rows.
- **Clickable/navigating rows** → repeat **`FluxClickablePane`** (`type="route"` +
  `:to`, or `type="button"` + `@click`), each wrapping one `FluxItem`. Each pane is
  its own pressable surface with hover — so they **cannot** sit inside a single
  `FluxItemStack` (the wrapper would break its `.item + .item` divider rule). Drop
  them straight into a `FluxLayerPane` (next) or a `:gap` flex column.

### Grouped block — `FluxLayerPane` + `FluxPaneHeader`

To give a list a titled, bordered "block" (dashboard widgets, grouped sections),
wrap it in a `FluxLayerPane`: a `FluxPaneHeader` on top, then the content pane.
The header's `#after` slot is the spot for a right-aligned action (e.g. a
"View all" link button — no `size` needed, the header sizes it). Consecutive
pane structures inside a `FluxLayerPane` get their borders merged into one group
automatically — so **never put a `FluxPaneGroup` inside a `FluxLayerPane`**; the
layer pane already groups its panes. Reach for `FluxPaneGroup` only to group
standalone panes that aren't already in a layer pane.

```vue
<!-- Static list block -->
<FluxLayerPane>
  <FluxPaneHeader icon="calendar-days" title="Upcoming">
    <template #after>
      <FluxSecondaryButton icon-trailing="arrow-right" label="View all"
        type="route" :to="{ name: 'calendar' }" />
    </template>
  </FluxPaneHeader>
  <FluxPane>
    <FluxItemStack> <!-- FluxItem rows --> </FluxItemStack>
  </FluxPane>
</FluxLayerPane>

<!-- Clickable list block: clickable panes are direct children, no inner FluxPane -->
<FluxLayerPane>
  <FluxPaneHeader icon="diagram-project" title="Active projects">
    <template #after>
      <FluxSecondaryButton icon-trailing="arrow-right" label="View all"
        type="route" :to="{ name: 'projects' }" />
    </template>
  </FluxPaneHeader>
  <FluxClickablePane v-for="p in projects" :key="p.id" type="route" variant="flat"
    :to="{ name: 'project', params: { id: p.id } }">
    <FluxItem> <!-- media / content / actions --> </FluxItem>
  </FluxClickablePane>
</FluxLayerPane>
```

A `FluxItem` can also stand in for the header — e.g. a **profile/entity card**:
a `FluxItem` (avatar + name + status) as the tinted top, a `FluxPane` for the
details, and a `FluxPaneFooter` for actions. Two LayerPane details:

- ⚠ A `FluxLayerPane` only pads its pane structures / `FluxPaneHeader` /
  `FluxLayerPaneSecondary` — a bare `FluxItem` placed directly in it gets **no
  padding**, so give it its own (e.g. `15px 18px`).
- Put the **`FluxPaneFooter` as a direct child of the `FluxLayerPane`** (a sibling
  of the `FluxPane`), not inside it: as a direct layer-pane child the footer loses
  its own background/border and blends into the tinted layer, sitting flush at the
  bottom. Inside a `FluxPane` it keeps the standard grey footer chrome instead.

```vue
<FluxLayerPane>
  <FluxItem class="card-header"> <!-- needs padding: e.g. 15px 18px -->
    <FluxItemMedia is-center :size="48"><MemberAvatar :member="m" :size="48" /></FluxItemMedia>
    <FluxItemContent is-center><strong>{{ m.name }}</strong><span>{{ m.role }}</span></FluxItemContent>
    <FluxItemActions is-center><FluxBadge :color="presenceColor(m.presence)" :label="m.presence" /></FluxItemActions>
  </FluxItem>
  <FluxPane>
    <FluxPaneBody><!-- details --></FluxPaneBody>
  </FluxPane>
  <FluxPaneFooter> <!-- direct child of the layer pane → blends in, no chrome -->
    <FluxButtonStack><FluxSecondaryButton icon-leading="pen" label="Edit role" @click="…" /></FluxButtonStack>
  </FluxPaneFooter>
</FluxLayerPane>
```

## 6. Dashboard (use `@flux-ui/application`)

**Building a dashboard or any full, multi-page app with a sidebar + top bar?
Reach for `@flux-ui/application` for the shell** — don't hand-roll it from bare
`@flux-ui/components` layout primitives. Pair it with `@flux-ui/statistics` for
KPIs and charts. (For a single-screen widget, the plain `FluxContainer`/`FluxFlex`
layout of §1's alternatives is fine; the application shell is for real apps.)

> **Setup first (or it renders broken):** add the `fluxApplication()` /
> `fluxStatistics()` Vite plugins, install their peers, and register vue-i18n with
> `globalInjection: false` — see `references/conventions.md`. Skipping these gives
> an unstyled shell and raw `flux.*` i18n keys.

**Shell** — `FluxApplication` (inside `FluxRoot`, see §1) gets a `FluxApplicationMenu`
in its `#menu` slot and a `FluxApplicationTop` for the bar:

```vue
<FluxApplicationMenu>
  <template #logo><img src="/logo.svg" alt="" height="36" width="36" /></template>
  <template #header>
    <FluxMenuGroup is-horizontal>
      <FluxApplicationMenuAccount label="Acme" image-src="/logo.svg" image-alt="" />
    </FluxMenuGroup>
  </template>

  <FluxMenuGroup>
    <FluxMenuItem icon-leading="grid-2" label="Overview" :is-active="isActive('overview')"
      :to="{ name: 'overview' }" type="route" />
  </FluxMenuGroup>
  <FluxDivider />
  <FluxMenuGroup>
    <FluxMenuItem icon-leading="chart-simple" label="Statistics" :is-active="isActive('statistics')"
      :to="{ name: 'statistics' }" type="route" />
  </FluxMenuGroup>

  <template #footer>
    <FluxMenuGroup>
      <FluxMenuItem icon-leading="gear" label="Settings" :to="{ name: 'settings' }" type="route" />
    </FluxMenuGroup>
  </template>
</FluxApplicationMenu>
```
`FluxApplicationTop` carries `icon` + `title` and an `#end` slot for
search/notifications/profile (and an optional `#tabs` slot). The nav items are
plain `@flux-ui/components` `FluxMenuGroup` › `FluxMenuItem`.

**Page title & per-page actions live in the top bar — not a page hero.** Drive
`icon`/`title` from the active route (a `defineTitle(icon, title)` composable that
writes a UI store the shell reads, set in each page's `setup`; detail pages set the
entity name). For **page-specific actions** (Create, Edit, Download), render a
**named `top` router-view** in `FluxApplicationTop`'s `#end` and let each route
supply its own `Top.vue` — this keeps actions in the bar without a per-page hero.
A `FluxApplicationHero` is for marketing/landing-style headers, not standard
app pages.

```vue
<!-- shell -->
<FluxApplicationTop :icon="ui.icon" :title="ui.title ?? 'Nimbus'">
  <template #end>
    <RouterView name="top" />  <!-- route supplies Top.vue (or nothing) -->
    <CommandPalette /> <ProfileMenu />
  </template>
</FluxApplicationTop>

<!-- router: a page opts in by adding a `top` named component -->
{ path: 'calendar', name: 'calendar', components: {
  default: () => import('@/view/calendar/Page.vue'),
  top: () => import('@/view/calendar/Top.vue') } }
```

**Top bar (`#end`): search, icon buttons, profile.** The `#end` slot is a row of
right-aligned chrome. Three real building blocks:

```vue
<FluxApplicationTop icon="bolt" title="Nimbus">
  <template #end>
    <!-- 1) Search field with a ⌘K hint -->
    <FluxFormInputGroup is-secondary style="width: 30ch; align-self: center;">
      <FluxFormInputAddition icon="magnifying-glass" />
      <FluxFormInput type="search" placeholder="Search for anything…" />
      <FluxFormInputAddition label="⌘K" />
    </FluxFormInputGroup>

    <!-- 2) Icon button → flyout panel (notifications) -->
    <FluxFlyout>
      <template #opener="{ open }">
        <FluxSecondaryLinkButton icon-leading="bell" size="small" @click="open()" />
      </template>
      <FluxPane style="width: min(420px, 100dvw - 60px)">
        <FluxPaneHeader icon="bell" title="Notifications" />
        <FluxPaneBody><p>You have no notifications.</p></FluxPaneBody>
      </FluxPane>
    </FluxFlyout>

    <!-- 3) Profile menu: avatar opener → windowed multi-level menu -->
    <FluxFlyout>
      <template #opener="{ open }">
        <FluxAvatar :fallback-initials="user.initials" :src="user.avatar" :size="36" is-clickable @click="open()" />
      </template>
      <template #default="{ close }">
        <FluxWindow style="min-width: 240px">
          <template #default="{ navigate }">
            <FluxMenu>
              <FluxMenuGroup>
                <FluxPersona :avatar-fallback-initials="user.initials" :avatar-size="54"
                  :name="user.fullName" title="Owner" style="pointer-events: none" />
              </FluxMenuGroup>
              <FluxSeparator />
              <FluxMenuGroup>
                <FluxMenuItem icon-leading="right-left" command-icon="angle-right"
                  label="Switch workspace" @click="navigate('workspace')" />
                <FluxMenuItem icon-leading="gear" label="Settings" :to="{ name: 'settings' }" type="route" @click="close()" />
              </FluxMenuGroup>
              <FluxSeparator />
              <FluxMenuGroup>
                <FluxMenuItem icon-leading="right-to-bracket" is-destructive label="Log out" @click="close(); logout();" />
              </FluxMenuGroup>
            </FluxMenu>
          </template>
          <!-- a sub-view; navigate('workspace') opens it, back() returns -->
          <template #workspace="{ back }"><!-- FluxMenu with a back item using @click="back()" --></template>
        </FluxWindow>
      </template>
    </FluxFlyout>
  </template>
</FluxApplicationTop>
```

Notes: `FluxFlyout`'s `#opener="{ open }"` slot wires any trigger; the flyout body
gets `{ close }`. **`FluxWindow`** is the multi-level popover-menu container — its
`#default="{ navigate }"` is the root view and each named slot (`#workspace="{ back }"`,
…) is a sub-view, so a profile menu can drill into "switch workspace" and back.
`FluxAvatar` takes `fallback-initials`, `src`, `size`, `is-clickable`;
`FluxMenuItem` supports a trailing `command-icon`.

**Search field → command palette.** That `#end` search field is usually a
*non-typeable opener* for a `FluxCommandPalette`, not a live input: keep the
`FluxFormInputGroup is-secondary` look, but mark the `FluxFormInput` `is-readonly`
(+ `tabindex="-1"`, `pointer-events: none`) and open the palette from the group's
`@click` (give the group `role="button"`, `tabindex="0"`, `@keydown.enter/space`).
Bind the shortcut with `useHotKey('mod+k', () => palette.open(), { preventDefault:
true })` from **`@basmilius/common`** (`mod` = ⌘ on macOS, Ctrl elsewhere; it's a
peer the Flux packages already pull in). When you wire ⌘K yourself, **don't** also
pass `has-keyboard-shortcut` to `FluxCommandPalette` — the key would fire twice.
The top-bar icon buttons (notifications/help) are `FluxSecondaryLinkButton
size="small"` (in a `FluxTooltip`), not plain `FluxSecondaryButton`s.

**`FluxSplitButton`: both halves must be the same button variant.** The split
component renders the dropdown arrow as a `FluxSecondaryButton` internally, so the
`#button` slot must hold a **`FluxSecondaryButton`** too — never a
`FluxPrimaryButton` (a primary + secondary split is wrong). `#button` gets
`{ open, close, toggle }`; the `#flyout` menu gets `{ close }`.

**Dashboard page** — wrap in `FluxApplicationContent layout="dashboard"`, split
into `FluxApplicationSection`s, and lay KPIs/charts out in a `FluxStatisticsGrid`:

```vue
<template>
  <FluxApplicationContent layout="dashboard">
    <FluxApplicationSection>
      <FluxStatisticsGrid :sm="2" :md="3" :xl="5">
        <FluxStatisticsKpi icon="qrcode-read" title="Total scans" :value="formatNumber(scans)" />
        <FluxStatisticsKpi icon="user-check" title="Attendance" :value="formatPercent(rate)" />
        <!-- … -->
      </FluxStatisticsGrid>
    </FluxApplicationSection>

    <FluxApplicationSection title="Performance" :info="periodLabel">
      <FluxStatisticsGrid :lg="2">
        <FluxStatisticsChartPane icon="chart-line" title="Scans over time" :aspect-ratio="21 / 9">
          <template #info><p>Daily scan volume for the selected period.</p></template>
          <FluxStatisticsLineChart :series="scansSeries" />
        </FluxStatisticsChartPane>
      </FluxStatisticsGrid>
    </FluxApplicationSection>
  </FluxApplicationContent>
</template>

<script lang="ts" setup>
  import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
  import { FluxStatisticsChartPane, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLineChart } from '@flux-ui/statistics';
</script>
```

`FluxApplicationContent` `layout`: `default | dashboard | full | medium | narrow`
(use `narrow` for settings/forms, `dashboard` for this). `FluxStatisticsGrid`
takes responsive column counts (`:xs`/`:sm`/`:md`/`:lg`/`:xl`). See
`references/ecosystem.md` for the full application + statistics surface.

### Context menus (sub-navigation for a section)

When a section has its own nested pages (e.g. a single event → details / products
/ shops), give it a **context menu** that replaces the sidebar with section-local
nav. Three pieces:

1. **Host it in the main menu.** In `FluxApplicationMenu`, the `#context` slot
   holds `<FluxApplicationMenuContextStack name="menu" />`, and `#header` holds a
   small level-switcher driven by `useApplicationMenu()` (`contexts`,
   `totalLevels`, `viewIndex`, `goToLevel`) — a horizontal `FluxMenuGroup` of
   `FluxMenuItem`s with `is-highlighted`, one per active context level.

2. **Attach the menu to a route as a `menu` named view** — this is how it gets
   into the stack (no manual registration):
   ```ts
   {
     path: '/events/:id',
     components: {
       default: () => import('./EventLayout.vue'),
       menu: () => import('./EventMenu.vue'),   // <-- the context menu
     },
     children: [ { name: 'event', /* … */ }, { name: 'event-products', /* … */ } ],
   }
   ```

3. **The context menu component** opens with `FluxApplicationMenuContext` (the
   context header — links back to the parent list) then the usual
   `FluxMenuGroup` › `FluxMenuItem` nav:
   ```vue
   <template>
     <FluxApplicationMenuContext icon="calendar" :title="event.name" subtitle="Event"
       :to="{ name: 'events' }" type="route" />
     <FluxMenuGroup>
       <FluxMenuItem icon-leading="circle-info" label="Details" :is-active="route.name === 'event'"
         :to="{ name: 'event' }" type="route" />
       <FluxMenuItem icon-leading="box" label="Products" :is-active="route.name === 'event-products'"
         :to="{ name: 'event-products' }" type="route" />
     </FluxMenuGroup>
   </template>
   ```
   Nested routes can each contribute their own `menu` view, so contexts stack
   (event → product → …) and `useApplicationMenu()` drives moving between levels.

## Notes on adapting these

- **No i18n / utility classes.** Strings are inline English; styling is via Flux
  tokens, not utility classes.
- **`FluxAction` vs buttons.** `FluxAction` is the compact, icon-first affordance
  for table rows/toolbars (`is-destructive`, `type="route"`); use the named
  buttons (`FluxPrimaryButton`, …) for primary page actions.
- **Deep-linkable dialogs** ride named router views into `FluxOverlay` /
  `FluxSlideOver`; short ephemeral ones use the `show*` functions (see
  `references/dialogs-and-feedback.md`).
- **Sibling packages** (`@flux-ui/application`, `@flux-ui/statistics`) supply the
  shell and charts — see `references/ecosystem.md`.
