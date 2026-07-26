<template>
    <div
        v-for="group of GROUPS"
        :key="group.title"
        :class="$style.tokenTableGroup">
        <h3 :class="$style.tokenTableGroupTitle">{{ group.title }}</h3>
        <p
            v-if="group.description"
            :class="$style.tokenTableGroupDescription">{{ group.description }}</p>

        <div :class="$style.tokenTable">
            <div :class="$style.tokenTableHead">Token</div>
            <div :class="$style.tokenTableHead">Light</div>
            <div :class="$style.tokenTableHead">Dark</div>

            <template
                v-for="token of group.tokens"
                :key="token.name">
                <code :class="$style.tokenTableName">--{{ token.name }}</code>

                <div
                    v-for="scheme of SCHEMES"
                    :key="scheme"
                    :light="scheme === 'light' || undefined"
                    :dark="scheme === 'dark' || undefined"
                    :class="$style.tokenTableScope">
                    <div :class="$style.tokenTableCell">
                        <div :class="token.kind === 'shadow' ? $style.tokenTableShadowSwatch : $style.tokenTableSwatch">
                            <div
                                :ref="element => register(element, token, scheme)"
                                :class="token.kind === 'shadow' ? $style.tokenTableShadowChip : $style.tokenTableSwatchInk"
                                :style="token.kind === 'shadow'
                                    ? {boxShadow: reference(token)}
                                    : {background: reference(token)}"/>
                        </div>
                        <span :class="$style.tokenTableValue">{{ resolved[`${scheme}:${token.name}`] ?? '' }}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, reactive } from 'vue';

    type Kind = 'color' | 'shadow';
    type Scheme = 'light' | 'dark';

    // `fallback` is for the one token that is not declared on `:root`: an elevation
    // level publishes `--surface-current` itself, so outside a level it has no value
    // at all and the swatch would render as nothing.
    type Token = {
        readonly name: string;
        readonly kind: Kind;
        readonly fallback?: string;
    };

    const SCHEMES: Scheme[] = ['light', 'dark'];

    const INTENT_ROLES = ['solid', 'solid-hover', 'solid-active', 'on-solid', 'muted', 'soft', 'soft-hover', 'border', 'text'];
    const INTENTS = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];

    function colors(...names: string[]): Token[] {
        return names.map(name => ({name, kind: 'color'}));
    }

    function shadows(...names: string[]): Token[] {
        return names.map(name => ({name, kind: 'shadow'}));
    }

    const GROUPS: { title: string; description?: string; tokens: Token[] }[] = [
        {
            title: 'Elevation',
            description: 'How high a layer sits. Light keeps every raised level white and lets the shadow carry the height; dark cannot, so there the lightness of the layer does the work. The last one is the odd one out: it is not a value on its own but what a layer publishes about itself, so its contents can read the surface they actually sit on. Outside a layer it has nothing to report, so the swatch here shows the fallback a consumer would write.',
            tokens: [
                ...colors('surface-canvas', 'background', 'surface-sunken', 'surface', 'surface-raised', 'surface-inverse', 'surface-loader'),
                {name: 'surface-current', kind: 'color', fallback: 'var(--surface)'}
            ]
        },
        {
            title: 'Interaction',
            description: 'The opaque states are for a control on the plain surface. The ink pair is translucent, for a control whose background is already tinted.',
            tokens: colors('surface-hover', 'surface-active', 'surface-disabled', 'ink-hover', 'ink-active')
        },
        {
            title: 'Text',
            description: 'Subtle is decoration only: chevrons, separators, the places that used to reach for opacity. Body copy uses secondary or stronger.',
            tokens: colors(
                'foreground-prominent', 'foreground', 'foreground-secondary', 'foreground-subtle', 'foreground-disabled',
                'foreground-inverse-prominent', 'foreground-inverse', 'foreground-inverse-secondary'
            )
        },
        {
            title: 'Lines',
            description: 'Stroke is the opaque separator and input border. Stroke-out is the translucent hairline around a floating surface, and highlight the inset sheen that makes a dark raised layer read as raised.',
            tokens: colors('surface-stroke-muted', 'surface-stroke', 'surface-stroke-hover', 'surface-stroke-out', 'surface-stroke-out-hover')
        },
        {
            title: 'Focus and selection',
            description: 'The transparent ring is the focus ring at zero alpha, so an outline can fade in on its own hue instead of through gray. It is invisible by design, which is why its swatch reads empty.',
            tokens: colors('focus-ring', 'focus-ring-transparent', 'selection')
        },
        {
            title: 'Scrims and effects',
            tokens: colors('overlay', 'overlay-secondary', 'overlay-strong', 'shimmer')
        },
        ...INTENTS.map(intent => ({
            title: `Intent: ${intent}`,
            tokens: colors(...INTENT_ROLES.map(role => `${intent}-${role}`))
        })),
        {
            title: 'Shadow',
            description: 'One geometry for both themes; only the color differs. The first one is a bare color rather than a shadow, for a component that composes a shadow of its own.',
            tokens: [
                ...colors('shadow-color'),
                ...shadows('shadow-px', 'shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl')
            ]
        }
    ];

    const resolved = reactive<Record<string, string>>({});
    const probes: { element: HTMLElement; key: string; kind: Kind }[] = [];

    function reference(token: Token): string {
        return token.fallback ? `var(--${token.name}, ${token.fallback})` : `var(--${token.name})`;
    }

    function register(element: unknown, token: Token, scheme: Scheme): void {
        if (element instanceof HTMLElement) {
            probes.push({element, key: `${scheme}:${token.name}`, kind: token.kind});
        }
    }

    // A custom property holding a `light-dark()` reads back verbatim through
    // getPropertyValue, so the resolved color has to come off a real property
    // that the engine has already computed for this scheme.
    onMounted(() => {
        for (const {element, key, kind} of probes) {
            const style = getComputedStyle(element);

            resolved[key] = kind === 'shadow' ? style.boxShadow : style.backgroundColor;
        }
    });
</script>

<style
    lang="scss"
    module>
    .tokenTableGroup {
        margin-block: 36px;
    }

    .tokenTableGroupTitle {
        margin-block: 0 6px;
        font-size: 16px;
    }

    .tokenTableGroupDescription {
        max-width: 66ch;
        margin-block: 0 15px;
        color: var(--foreground-secondary);
        font-size: 14px;
    }

    .tokenTable {
        display: grid;
        grid-template-columns: minmax(210px, 1fr) 1fr 1fr;
        align-items: center;
        gap: 3px 18px;
        overflow-x: auto;
    }

    .tokenTableHead {
        padding-bottom: 6px;
        border-bottom: 1px solid var(--surface-stroke);
        color: var(--foreground-secondary);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .5px;
        text-transform: uppercase;
    }

    /* No box of its own, so the two theme scopes drop straight into the grid
       while still handing their color-scheme down to the swatches. */
    .tokenTableScope {
        display: contents;
    }

    .tokenTableName {
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 12px;
    }

    .tokenTableCell {
        display: flex;
        min-height: 33px;
        min-width: 0;
        padding: 6px 9px;
        align-items: center;
        gap: 9px;
        background: var(--background);
        border-radius: var(--radius-half);
    }

    /* The swatch sits on a surface so translucent tokens show what they actually
       do rather than blending into the page. */
    .tokenTableSwatch {
        flex-shrink: 0;
        height: 24px;
        width: 24px;
        background: var(--surface);
        border-radius: var(--radius-half);
        box-shadow: inset 0 0 0 1px var(--surface-stroke);
        overflow: hidden;
    }

    .tokenTableSwatchInk {
        height: 100%;
        width: 100%;
    }

    .tokenTableShadowSwatch {
        display: flex;
        flex-shrink: 0;
        height: 27px;
        width: 42px;
        align-items: center;
        justify-content: center;
    }

    .tokenTableShadowChip {
        height: 18px;
        width: 30px;
        background: var(--surface);
        border-radius: var(--radius-half);
    }

    /* Wraps rather than truncates: an alpha value cut off at the closing paren
       reads as a different color than it is. */
    .tokenTableValue {
        min-width: 0;
        color: var(--foreground-secondary);
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 11px;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }
</style>
