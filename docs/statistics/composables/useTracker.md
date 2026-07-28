# useTracker

Draws every line of a [Tracker](../components/tracker/) as a single SVG overlay. Rows register their marker and step groups register their steps; the lines are measured from the elements that are actually rendered and drawn as segments between them, leaving a gap around each marker. Nothing is masked against a background, so a tracker works on any surface.

The tracker measures again whenever a registration changes and whenever its container resizes.

## Usage

```ts
import { useTracker } from '@flux-ui/statistics';
import { ref } from 'vue';

const container = ref<HTMLElement | null>(null);
const {dashPath, linePath, registerGroup, registerMarker} = useTracker(container);
```

The two paths are meant to be bound straight onto an SVG: `linePath` holds the rail and the branches into and out of a group, `dashPath` the dashed run between the steps inside one group.

Registration is what an [Entry](../components/tracker/entry) and a [Steps](../components/tracker/steps) group do through the injection keys, so you rarely call these yourself:

```ts
import { FluxStatisticsTrackerInjectionKey } from '@flux-ui/statistics';
import { inject, onUnmounted } from 'vue';

const tracker = inject(FluxStatisticsTrackerInjectionKey, null);
const unregister = tracker?.registerMarker(markerRef);

onUnmounted(() => unregister?.());
```

## Type declarations

```ts
import type { InjectionKey, Ref } from 'vue';

declare function useTracker(container: ElementRef): UseTrackerReturn;

declare const FluxStatisticsTrackerInjectionKey: InjectionKey<TrackerContext>;
declare const FluxStatisticsTrackerGroupInjectionKey: InjectionKey<TrackerGroupContext>;

type ElementRef = Readonly<Ref<HTMLElement | null>>;

type UseTrackerReturn = {
    readonly dashPath: Ref<string>;
    readonly linePath: Ref<string>;
    readonly registerGroup: () => TrackerGroupContext;
    readonly registerMarker: (element: ElementRef) => () => void;
};

type TrackerContext = {
    readonly registerMarker: (element: ElementRef) => () => void;
    readonly registerGroup: () => TrackerGroupContext;
};

type TrackerGroupContext = {
    readonly registerStep: (element: ElementRef) => () => void;
    readonly dispose: () => void;
};
```

## Used by

- [Tracker](../components/tracker/)
