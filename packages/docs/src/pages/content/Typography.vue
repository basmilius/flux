<template>
    <flux-stack>
        <page-title
            section="Content"
            title="Typography"/>

        <section>
            <p>
                Typography is a critical element of any user interface, and in Flux, we understand the importance of creating
                clear, consistent, and visually appealing typography in our components. This documentation provides you with
                everything you need to know about typography in Flux, including font families, sizes, weights, and spacing.
                By the end of this documentation, you'll have a solid understanding of typography in Flux and be able to
                create beautiful and readable text throughout your Vue application. So let's dive in!
            </p>

            <h2>Headings</h2>
            <code-preview
                html
                :code="headingsCode"/>

            <h2>Paragraph</h2>
            <code-preview
                html
                :code="paragraphsCode"/>

            <h2>Lists</h2>
            <code-preview
                html
                :code="listsCode"/>

            <h2>Image</h2>
            <code-preview
                html
                :code="imageCode"/>

            <h2>Blockquote</h2>
            <code-preview
                html
                :code="blockquoteCode"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@fancee/flux';
    import { CodePreview, PageTitle } from '@/components';
    import blockquoteCode from '@/code/content/typography/blockquote.html?raw';
    import headingsCode from '@/code/content/typography/headings.html?raw';
    import imageCode from '@/code/content/typography/image.html?raw';
    import listsCode from '@/code/content/typography/lists.html?raw';
    import paragraphsCode from '@/code/content/typography/paragraphs.html?raw';
</script>
