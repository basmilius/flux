---
next: false
---

# Font Awesome

Flux uses [Font Awesome](https://fontawesome.com) as its icon library, giving you access to a large collection of icons for your UI. Icons must be registered before use.

## Register icons

Icons must be registered before use so they are available throughout your application. Import the icons you need from [Font Awesome](https://fontawesome.com) and register them with the `fluxRegisterIcons` function.

::: code-group

```ts [icons.ts]
export {
    faCircleCheck,
    faCircleExclamation
} from '@fortawesome/pro-regular-svg-icons';
```

```ts [register.ts]
import { fluxRegisterIcons  } from '@flux-ui/components';
import * as icons from './icons.ts';

fluxRegisterIcons(icons);
```

```vue [Page.vue]
<template>
    <FluxIcon
        name="circle-check"
        :size="24"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
</script>
```

:::

## Required icons

Below is a list of all the icons that Flux uses throughout the library.

```ts [icons.ts]
export {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAnglesUpDown,
    faArrowDown19,
    faArrowDownAZ,
    faArrowDownShortWide,
    faArrowUp91,
    faArrowUpAZ,
    faArrowUpArrowDown,
    faArrowUpWideShort,
    faCalendar,
    faCheck,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faCircleXmark,
    faCloud,
    faEllipsis,
    faEllipsisH,
    faEye,
    faEyeSlash,
    faFilter,
    faMagnifyingGlass,
    faMinus,
    faPlus,
    faRotateLeft,
    faSlashForward,
    faSlidersSimple,
    faStar,
    faTrash,
    faUser,
    faXmark
} from '@fortawesome/pro-regular-svg-icons';
```
