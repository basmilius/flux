<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Statistic"/>

        <preview>
            <flux-stack style="width: 360px">
                <flux-statistic
                    color="primary"
                    icon="circle"
                    label="Label"
                    value="Value"/>

                <flux-statistic
                    color="danger"
                    change-color="danger"
                    change-icon="arrow-down"
                    change-value="10%"
                    icon="user"
                    label="Users this month"
                    value="750"/>

                <flux-statistic
                    color="primary"
                    change-color="success"
                    change-icon="arrow-trend-up"
                    change-value="1.250"
                    icon="star"
                    label="Leads"
                    value="16.500"/>
            </flux-stack>
        </preview>

        <section>
            <p>
                <em>Todo</em>
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>Controls the grid of the statistic. The default is horizontal, which sets the icon at the start.</td>
                    </tr>
                    <tr>
                        <td><code>change-color</code><code>'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color of the statistic change.</td>
                    </tr>
                    <tr>
                        <td><code>change-icon</code><code>IconNames</code></td>
                        <td>The icon used for the statistic change. A good example can be arrow-trend-up or arrow-trend-down.</td>
                    </tr>
                    <tr>
                        <td><code>change-value</code><code>string</code></td>
                        <td>The change value.</td>
                    </tr>
                    <tr>
                        <td><code>color</code><code>'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The icon color of the statistic.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon of the statistic.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>Label used for the statistic.</td>
                    </tr>
                    <tr>
                        <td><code>value</code><code>string</code></td>
                        <td>The statistic value.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack, FluxStatistic } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
