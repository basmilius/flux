import {FluxVisualHighlighter, FluxVisualHighlighterGroup} from '@flux-ui/react';
export default function Example() {
    return <p style={{maxWidth: 429, fontSize: 21, lineHeight: 1.9, textAlign: 'center'}}>
        <FluxVisualHighlighterGroup whenInView>
            This <FluxVisualHighlighter>cascade</FluxVisualHighlighter> starts <FluxVisualHighlighter variant="underline" color="var(--primary-solid)">only</FluxVisualHighlighter> once it scrolls into view.
        </FluxVisualHighlighterGroup>
    </p>;
}
