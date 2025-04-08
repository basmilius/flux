---
next: false
---

# Font Awesome

In Flux, icons play a crucial role in enhancing the visual appeal and usability of the interface. Flux utilizes [Font Awesome](https://fontawesome.com) as its icon library, providing access to a vast collection of high-quality icons. These icons can be easily integrated into your UI components to improve clarity, indicate actions, and convey information intuitively. By using Font Awesome, Flux ensures that your design remains consistent and visually appealing across different contexts and applications.

## Register icons

In Flux, icons must be registered before use to ensure they are available throughout your application. This process involves importing the desired icons from [Font Awesome](https://fontawesome.com) and then registering them using the `fluxRegisterIcons` function. Proper registration ensures that the icons are efficiently integrated and made accessible throughout your UI components.

::: code-group

```ts [icons.ts]
export {
    faCircleCheck,
    faCircleExclamation
} from '@fortawesome/pro-regular-svg-icons';
```

```ts [register.ts]
import { fluxRegisterIcons  } from '@flux-ui/flux';
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
    type="ts"
    setup>
    import { FluxIcon } from '@flux-ui/flux';
</script>
```

:::
