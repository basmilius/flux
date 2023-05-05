<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Segmented control"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxSegmentedControl
                        v-model="viewIndex"
                        :items="['Options', 'Statistics']"/>
                </FluxPaneBody>

                <FluxSegmentedView :index="viewIndex">
                    <FluxPaneBody>
                        <p>Options</p>
                    </FluxPaneBody>

                    <FluxPaneBody>
                        <p>Statistics</p>
                    </FluxPaneBody>
                </FluxSegmentedView>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The segmented control component is a UI element that allows users to choose between multiple options, by
                selecting one of the multiple segments. Each segment is represented as a button, with a distinct label,
                and the currently selected segment is indicated visually, for example, by a highlighted background. The
                component is commonly used in navigation, forms, or settings, and provides a compact and intuitive way for
                users to make a choice.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxSegmentedControl</code></td>
                    <td>The segment switcher.</td>
                </tr>
                <tr>
                    <td><code>FluxSegmentedView</code></td>
                    <td>The view.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="SegmentedControl">
                <template #props>
                    <tr>
                        <td><code>items</code><code>string[]</code></td>
                        <td>A string array of segments.</td>
                    </tr>
                    <tr>
                        <td><code>model-value</code><code>number</code></td>
                        <td>The current active view index.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>update:model-value</code><code>(index: number): void;</code></td>
                        <td>Triggered when the view is changed.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="SegmentedView">
                <template #props>
                    <tr>
                        <td><code>index</code><code>number</code></td>
                        <td>The current active view index.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The individual segment views.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSegmentedControl, FluxSegmentedView, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';

    const viewIndex = ref(0);
</script>
