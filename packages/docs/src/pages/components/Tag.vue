<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Tag"/>

        <Preview>
            <FluxTagStack>
                <FluxTag label="Tag"/>

                <FluxTag
                    color="danger"
                    dot
                    label="Tag"/>

                <FluxTag
                    color="success"
                    icon="circle-check"
                    label="Tag"/>

                <FluxTag
                    is-loading
                    label="Tag"/>

                <FluxTag
                    is-deletable
                    label="Tag"/>
            </FluxTagStack>
        </Preview>

        <ApiSection>
            <p>
                Tags are used as labels for a more specific element in the UI. This, for example, may be used to
                display the status of an order.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['xmark']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Tag">
                <template #props>
                    <tr>
                        <td><code>color</code><code>'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color used within the tag.</td>
                    </tr>
                    <tr>
                        <td><code>dot</code><code>boolean</code></td>
                        <td>Adds a colored dot to the tag.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon used within the icon.</td>
                    </tr>
                    <tr>
                        <td><code>is-clickable</code><code>boolean</code></td>
                        <td>Allows the tag to be clicked.</td>
                    </tr>
                    <tr>
                        <td><code>is-deletable</code><code>boolean</code></td>
                        <td>Allows the tag to be deleted.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Enables the loading state of the tag.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the tag.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>[MouseEvent]</code></td>
                        <td>Triggered when the tag is clicked. This only works when the is-clickable prop is set.</td>
                    </tr>
                    <tr>
                        <td><code>delete</code><code>[]</code></td>
                        <td>Triggered when the delete button within the tag is clicked. This only works when the is-deletable prop is set.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic tag can be used to show additional information about something else."/>

            <ApiExample
                :code="dotCode"
                :component="dot"
                title="Dot"
                description="A tag with a dot can be used to indicate status of something. For example the status of a server or the payment status of an order."/>

            <ApiExample
                :code="iconCode"
                :component="icon"
                title="Icon"
                description="Icons within tags can be used to improve the meaning of the tag. This can for example be used to display features of something."/>

            <ApiExample
                :code="loadingCode"
                :component="loading"
                title="Loading"
                description="Tags with a loading state can be used to indicate that a row within a table is doing something, such as saving a particular row."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxTag, FluxTagStack, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/tag/basic.vue';
    import basicCode from '@/code/components/tag/basic.vue?raw';
    import dot from '@/code/components/tag/dot.vue';
    import dotCode from '@/code/components/tag/dot.vue?raw';
    import icon from '@/code/components/tag/icon.vue';
    import iconCode from '@/code/components/tag/icon.vue?raw';
    import loading from '@/code/components/tag/loading.vue';
    import loadingCode from '@/code/components/tag/loading.vue?raw';
</script>
