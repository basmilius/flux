# Dark mode

Flux includes full support for both light and dark mode, with a color system that adapts to each. Toggle dark mode by setting the `dark` attribute on the document element, as shown below.

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
