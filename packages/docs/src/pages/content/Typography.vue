<template>
    <FluxStack>
        <PageTitle
            section="Content"
            title="Typography"/>

        <ApiSection>
            <p>
                Typography is a critical element of any user interface, and in Flux, we understand the importance of creating
                clear, consistent, and visually appealing typography in our components. This documentation provides you with
                everything you need to know about typography in Flux, including font families, sizes, weights, and spacing.
                By the end of this documentation, you'll have a solid understanding of typography in Flux and be able to
                create beautiful and readable text throughout your Vue application. So let's dive in!
            </p>
        </ApiSection>

        <ApiSection>
            <ApiExample
                :code="headingsCode"
                title="Headings"
                title-tag="h2"/>

            <ApiExample
                :code="paragraphsCode"
                title="Paragraph"
                title-tag="h2"/>

            <ApiExample
                :code="listsCode"
                title="Lists"
                title-tag="h2"/>

            <ApiExample
                :code="imageCode"
                title="Image"
                title-tag="h2"/>

            <ApiExample
                :code="blockquoteCode"
                title="Blockquote"
                title-tag="h2"/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@fancee/flux';
    import { ApiExample, ApiSection, PageTitle } from '@docs/components';
    import blockquoteCode from '@docs/code/content/typography/blockquote.html?raw';
    import headingsCode from '@docs/code/content/typography/headings.html?raw';
    import imageCode from '@docs/code/content/typography/image.html?raw';
    import listsCode from '@docs/code/content/typography/lists.html?raw';
    import paragraphsCode from '@docs/code/content/typography/paragraphs.html?raw';
</script>
