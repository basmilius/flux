# Dark mode
Color plays a vital role in shaping the look and feel of any interface, and in Flux, we recognize the importance of providing a flexible and accessible color system that adapts to different environments. That’s why Flux includes full support for both light and dark mode, ensuring your application looks great no matter the user’s preference.

## Functional API

::: code-group

```ts [theme.ts]
import { useRemembered } from '@flux-ui/internals'

const darkMode = useRemembered("dark-mode", false);

function toggleMode(): void {
    darkMode.value = !darkMode.value;

    if (darkMode.value) {
        document.documentElement.setAttribute("dark", "dark");
    } else {
        document.documentElement.removeAttribute("dark");
    }
}
```

```vue [App.vue]
<template>
    <!-- Your content here -->
</template>

<script 
    lang="ts"
    setup>
    import { onMounted } from 'vue'
    import { useRemembered } from '@flux-ui/internals'
    
    const darkMode = useRemembered("dark-mode", false);
    
    onMounted(() => {
        if (darkMode.value) {
            document.documentElement.setAttribute("dark", "dark");
        }
    });
</script>
```

:::
