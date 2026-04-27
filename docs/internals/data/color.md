<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Color palette

The `@flux-ui/internals` package exports a comprehensive color palette based on the Tailwind CSS color system. Each color is available in 12 shades, from `50` (lightest) to `950` (darkest).

## Usage

```ts
import { blue500, red500, green500 } from '@flux-ui/internals';

console.log(blue500); // '#3b82f6'
```

## Available colors

Each of the following colors exports shades `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, and `950`:

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Color</FluxTableHeader>
                <FluxTableHeader>Example (500)</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><code>slate</code></FluxTableCell>
            <FluxTableCell><code>#64748b</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>gray</code></FluxTableCell>
            <FluxTableCell><code>#6b7280</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>zinc</code></FluxTableCell>
            <FluxTableCell><code>#71717a</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>neutral</code></FluxTableCell>
            <FluxTableCell><code>#737373</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>stone</code></FluxTableCell>
            <FluxTableCell><code>#78716c</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>red</code></FluxTableCell>
            <FluxTableCell><code>#ef4444</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>orange</code></FluxTableCell>
            <FluxTableCell><code>#f97316</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>amber</code></FluxTableCell>
            <FluxTableCell><code>#f59e0b</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>yellow</code></FluxTableCell>
            <FluxTableCell><code>#eab308</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>lime</code></FluxTableCell>
            <FluxTableCell><code>#84cc16</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>green</code></FluxTableCell>
            <FluxTableCell><code>#22c55e</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>emerald</code></FluxTableCell>
            <FluxTableCell><code>#10b981</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>teal</code></FluxTableCell>
            <FluxTableCell><code>#14b8a6</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>cyan</code></FluxTableCell>
            <FluxTableCell><code>#06b6d4</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>sky</code></FluxTableCell>
            <FluxTableCell><code>#0ea5e9</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>blue</code></FluxTableCell>
            <FluxTableCell><code>#3b82f6</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>indigo</code></FluxTableCell>
            <FluxTableCell><code>#6366f1</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>violet</code></FluxTableCell>
            <FluxTableCell><code>#8b5cf6</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>purple</code></FluxTableCell>
            <FluxTableCell><code>#a855f7</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>fuchsia</code></FluxTableCell>
            <FluxTableCell><code>#d946ef</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>pink</code></FluxTableCell>
            <FluxTableCell><code>#ec4899</code></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>rose</code></FluxTableCell>
            <FluxTableCell><code>#f43f5e</code></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Type declarations

```ts
// Each color exports shades as string constants, e.g.:
export declare const blue50: string;
export declare const blue100: string;
// ... through blue950
```
