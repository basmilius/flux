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
                :key="token">
                <code :class="$style.tokenTableName">--{{ token }}</code>

                <div
                    v-for="scheme of SCHEMES"
                    :key="scheme"
                    :light="scheme === 'light' || undefined"
                    :dark="scheme === 'dark' || undefined"
                    :class="$style.tokenTableScope">
                    <div :class="$style.tokenTableCell">
                        <div :class="group.kind === 'shadow' ? $style.tokenTableShadowSwatch : $style.tokenTableSwatch">
                            <div
                                :ref="element => register(element, token, scheme, group.kind)"
                                :class="group.kind === 'shadow' ? $style.tokenTableShadowChip : $style.tokenTableSwatchInk"
                                :style="group.kind === 'shadow'
                                    ? {boxShadow: `var(--${token})`}
                                    : {background: `var(--${token})`}"/>
                        </div>
                        <span :class="$style.tokenTableValue">{{ resolved[`${scheme}:${token}`] ?? '' }}</span>
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

    const SCHEMES: Scheme[] = ['light', 'dark'];

    const INTENT_ROLES = ['solid', 'solid-hover', 'solid-active', 'on-solid', 'soft', 'soft-hover', 'border', 'text'];
    const INTENTS = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];

    const GROUPS: { title: string; description?: string; kind: Kind; tokens: string[] }[] = [
        {
            title: 'Elevation',
            description: 'How high a layer sits. Light keeps every raised level white and lets the shadow carry the height; dark cannot, so there the lightness of the layer does the work.',
            kind: 'color',
            tokens: ['surface-canvas', 'background', 'surface-sunken', 'surface', 'surface-raised', 'surface-inverse', 'surface-loader']
        },
        {
            title: 'Interaction',
            description: 'The opaque states are for a control on the plain surface. The ink pair is translucent, for a control whose background is already tinted.',
            kind: 'color',
            tokens: ['surface-hover', 'surface-active', 'surface-disabled', 'ink-hover', 'ink-active']
        },
        {
            title: 'Text',
            description: 'Subtle is decoration only: chevrons, separators, the places that used to reach for opacity. Body copy uses secondary or stronger.',
            kind: 'color',
            tokens: [
                'foreground-prominent', 'foreground', 'foreground-secondary', 'foreground-subtle', 'foreground-disabled',
                'foreground-inverse-prominent', 'foreground-inverse', 'foreground-inverse-secondary'
            ]
        },
        {
            title: 'Lines',
            description: 'Stroke is the opaque separator and input border. Stroke-out is the translucent hairline around a floating surface, and highlight the inset sheen that makes a dark raised layer read as raised.',
            kind: 'color',
            tokens: ['surface-stroke-muted', 'surface-stroke', 'surface-stroke-hover', 'surface-stroke-out', 'surface-stroke-out-hover', 'surface-highlight']
        },
        {
            title: 'Focus and selection',
            kind: 'color',
            tokens: ['focus-ring', 'selection']
        },
        {
            title: 'Scrims and effects',
            kind: 'color',
            tokens: ['overlay', 'overlay-secondary', 'overlay-strong', 'shimmer']
        },
        ...INTENTS.map(intent => ({
            title: `Intent: ${intent}`,
            kind: 'color' as const,
            tokens: INTENT_ROLES.map(role => `${intent}-${role}`)
        })),
        {
            title: 'Shadow',
            description: 'One geometry for both themes; only the colour differs.',
            kind: 'shadow',
            tokens: ['shadow-px', 'shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl']
        }
    ];

    const resolved = reactive<Record<string, string>>({});
    const probes: { element: HTMLElement; key: string; kind: Kind }[] = [];

    function register(element: unknown, token: string, scheme: Scheme, kind: Kind): void {
        if (element instanceof HTMLElement) {
            probes.push({element, key: `${scheme}:${token}`, kind});
        }
    }

    // A custom property holding a `light-dark()` reads back verbatim through
    // getPropertyValue, so the resolved colour has to come off a real property
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
       reads as a different colour than it is. */
    .tokenTableValue {
        min-width: 0;
        color: var(--foreground-secondary);
        font-family: var(--vp-font-family-mono), monospace;
        font-size: 11px;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }
</style>
