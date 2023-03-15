<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Toggle"/>

        <preview>
            <flux-stack axis="horizontal">
                <flux-toggle v-model="toggle1"/>

                <flux-toggle
                    v-model="toggle2"
                    is-switch
                    icon-off="sun-alt"
                    icon-on="moon"/>
            </flux-stack>
        </preview>

        <section>
            <p>
                A toggle component is a type of user interface element that allows the user to switch between two
                states, such as "on" and "off." It is often represented as a switch or button that can be flipped
                to change the state. Toggles are commonly used in settings menus or options pages, allowing users
                to enable or disable specific features or settings. They provide a simple and intuitive way for
                users to interact with the interface and control the behavior of the application.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>icon-off</code><code>IconNames</code></td>
                        <td>An icon for the off-state of the toggle.</td>
                    </tr>
                    <tr>
                        <td><code>icon-on</code><code>IconNames</code></td>
                        <td>An icon for the on-state of the toggle.</td>
                    </tr>
                    <tr>
                        <td><code>is-switch</code><code>boolean</code></td>
                        <td>Applies a switch style to the toggle. This means that the toggle won't change color when it's activated.</td>
                    </tr>
                    <tr>
                        <td><code>model-value</code><code>boolean</code></td>
                        <td>The value of the toggle.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>update:model-value</code><code>(value: boolean): void;</code></td>
                        <td>Triggered when the toggle is updated.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack, FluxToggle } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiTable, PageTitle, Preview } from '@/components';

    const toggle1 = ref(true);
    const toggle2 = ref(false);
</script>
