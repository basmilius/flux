<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Toggle"/>

        <Preview>
            <FluxStack axis="horizontal">
                <FluxToggle v-model="toggle1"/>

                <FluxToggle
                    v-model="toggle2"
                    is-switch
                    icon-off="sun-alt"
                    icon-on="moon"/>
            </FluxStack>
        </Preview>

        <ApiSection>
            <p>
                A toggle component is a type of user interface element that allows the user to switch between two
                states, such as "on" and "off." It is often represented as a switch or button that can be flipped
                to change the state. Toggles are commonly used in settings menus or options pages, allowing users
                to enable or disable specific features or settings. They provide a simple and intuitive way for
                users to interact with the interface and control the behavior of the application.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Toggle">
                <template #props>
                    <tr>
                        <td><code>icon-off</code><code>IconNames</code></td>
                        <td>An icon for the off-state of the toggle.</td>
                    </tr>
                    <tr>
                        <td><code>icon-on</code><code>IconNames</code></td>
                        <td>An icon for the on-state of the toggle.</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Indicates that the toggle is disabled.</td>
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

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(value: boolean): void;</code></td>
                        <td>Triggered when the toggle is updated.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack, FluxToggle } from '@basmilius/flux';
    import { ref } from 'vue';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';

    const toggle1 = ref(true);
    const toggle2 = ref(false);
</script>
