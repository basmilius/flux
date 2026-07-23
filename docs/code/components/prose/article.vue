<template>
    <FluxProse tag="article">
        <h1>Designing with type</h1>
        <p>Typography is the craft of arranging text so it is <a href="#">legible, readable and appealing</a> when displayed. Good type sets a rhythm the reader can follow without conscious effort, and it is the single biggest lever you have over how <strong>trustworthy</strong> an interface feels.</p>

        <h2>The vertical rhythm</h2>
        <p>Every block of content, whether a paragraph, a list, an image or a table, sits on a consistent baseline. Spacing scales with the weight of the element: a new section gets more room above it than the next paragraph does.</p>

        <blockquote>Typography is the detail and the presentation of a story. It represents the voice of an atmosphere, or a historical setting of some kind.</blockquote>

        <h3>Working with lists</h3>
        <p>Lists break dense information into scannable chunks. Reach for an unordered list when order does not matter:</p>
        <ul>
            <li>Keep the measure between 45 and 75 characters.
                <ul>
                    <li>Narrower for captions.</li>
                    <li>Wider for long form reading.</li>
                </ul>
            </li>
            <li>Set a generous line height for body copy.</li>
            <li>Limit the number of distinct type sizes.</li>
        </ul>

        <p>Use an ordered list when the sequence itself is the point:</p>
        <ol>
            <li>Establish a base font size.</li>
            <li>Derive a modular scale from it.</li>
            <li>Assign each level a single, clear role.</li>
        </ol>

        <h3>Code and keys</h3>
        <p>Wrap identifiers such as <code>--font-sans</code> in inline code, and show a full snippet in a block:</p>
        <pre><code>:root {
    --font-sans: inter-variable, sans-serif;
}</code></pre>
        <p>Document shortcuts with the keyboard element: press <kbd>Cmd</kbd> + <kbd>B</kbd> to toggle bold.</p>

        <FluxPane>
            <FluxPaneHeader
                icon="circle-info"
                subtitle="Dropped straight into the article"
                title="Embedded component"/>
            <FluxPaneBody>
                This pane keeps its own styling. Prose only styles its own HTML elements, so an embedded component is left untouched, yet it still flows in the article rhythm just like a paragraph or a heading.
            </FluxPaneBody>
        </FluxPane>

        <h2>A quick reference</h2>
        <p>The scale below summarises the default roles.</p>
        <table>
            <thead>
                <tr>
                    <th>Element</th>
                    <th>Size</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Heading 1</td>
                    <td>27px</td>
                    <td>Page title</td>
                </tr>
                <tr>
                    <td>Heading 2</td>
                    <td>21px</td>
                    <td>Section heading</td>
                </tr>
                <tr>
                    <td>Body</td>
                    <td>15px</td>
                    <td>Paragraphs and lists</td>
                </tr>
            </tbody>
        </table>

        <hr/>

        <p>Finally, imagery breaks up long stretches of text and gives the eye a place to rest.</p>
        <img src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""/>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxProse } from '@flux-ui/components';
</script>
