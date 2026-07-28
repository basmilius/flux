---
outline: deep
---

# Configuration

How the components in `@flux-ui/ai` behave comes from one place. `configureAi`
writes to it. Call it once while your app boots, before anything renders.

```ts
import { configureAi } from '@flux-ui/ai';

configureAi({
    streaming: {
        fadeDuration: 150
    }
});
```

Every section is merged into what is already there, so naming one option leaves the
others as they are, and calling `configureAi` twice adds to the first call rather
than replacing it.

What the components *say* is not configured here but translated:
[Translations](./translations) lists every string and the key behind it.

## Streaming

```ts
configureAi({
    streaming: {
        hasFade: true,
        fadeDuration: 300
    }
});
```

| Option         | Default | Description                                                                     |
|----------------|---------|---------------------------------------------------------------------------------|
| `hasFade`      | `true`  | Fades each word in as it arrives. Turn it off to have a response simply appear. |
| `fadeDuration` | `300`   | How long one word takes to fade in, in milliseconds.                            |

The fade never plays for a reader who asked for reduced motion; that preference is
honored regardless of what is configured here.

## Tool calls

```ts
configureAi({
    toolCall: {
        resultLimit: 900
    }
});
```

| Option        | Default | Description                                                                           |
|---------------|---------|---------------------------------------------------------------------------------------|
| `resultLimit` | `900`   | How many characters of a tool result are shown before the rest moves behind a button. |
