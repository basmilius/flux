# fluxRegisterIcons

Registers FontAwesome icon definitions into the internal Flux icon registry. This function must be called during your application setup to make icons available to Flux components.

## Usage

```ts
import { fluxRegisterIcons } from '@flux-ui/components';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Register all solid icons
fluxRegisterIcons(fas);
```

```ts
import { fluxRegisterIcons } from '@flux-ui/components';
import { faCheck, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Register specific icons
fluxRegisterIcons({ faCheck, faXmark, faChevronDown });
```

## Type declarations

```ts
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

type Icons = Record<string, IconDefinition>;

declare function fluxRegisterIcons(icons: Icons): void;
```

::: tip
For more information about configuring icons, see the [Font Awesome](../introduction/font-awesome) guide.
:::
