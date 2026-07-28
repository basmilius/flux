<template>
    <FluxProse
        :class="$style.playground"
        container
        tag="article">
        <h1>Application playground</h1>
        <p>Every component of <code>@flux-ui/application</code> in one page, in the only setting where these components say anything: a running shell. Each scenario below is a route of its own, rendered in an iframe that can be resized. That detour is the point. Almost every breakpoint in this package is a viewport media query, and <code>FluxApplication</code> reads <code>window.innerWidth</code> through <code>useBreakpoints</code>, so resizing a <code>div</code> would tell them nothing. An iframe has a viewport of its own, and answers as if the browser window had changed.</p>
        <p>Pick a width above a frame or drag the handle on its right edge. The handle takes the keyboard too: the arrow keys step 30px, with <kbd>Shift</kbd> 90px, and <kbd>Home</kbd> and <kbd>End</kbd> jump to the narrowest width and back to full. Only the width of the frame changes, never the <code>src</code>, so nothing reloads while you drag: the open menu, the archived conversation and the scroll position all survive a sweep from full width down to 321px. The theme follows this page, because VitePress keeps the preference in <code>localStorage</code> and every document on the origin listens for the <code>storage</code> event, so the switch in the header repaints every frame at once.</p>
        <p>One state that could never fire before now does. The shadow under the top bar comes from <code>useScrollPosition()</code> without an element, which listens on the document and reads its scrolling element. In a framed shell the scroller was a nested <code>div</code> and scroll does not bubble out of one, so the bar stayed flat forever. In an iframe the document is the scroller, so scrolling any shell below raises the border and the shadow. It is a cheap state to break and an easy one to miss.</p>
        <p>The frames are interactive on purpose. Menu items switch pages, the notice dismisses and comes back, and the rail slides between menu levels. A static screenshot of these components is worth very little.</p>

        <h2>A dashboard</h2>
        <p>The full stack: rail with an account switcher and a promo, a dismissable notice, a sticky top bar with tabs, and a content area that swaps between a hero page and a page header page.</p>
        <PlaygroundViewport
            :height="840"
            path="/application/playground/dashboard"
            title="dashboard"/>
        <p>What to look at. The tab bar in the top bar uses the same width formula as the content area, so its first tab has to line up with the hero title, the section headings and the table below it: that gutter is the one thing here that is easy to get wrong and easy to see, at every width. Now walk the rail down. At 1024 and up the shell reserves the rail's width and the collapse toggle folds it to 69px; between 1024 and 768 the shell stops reserving that width while the rail is still on screen at full width, which is the one band where the two queries do not meet; below 768 the rail becomes an overlay drawer with a backdrop, and closing it is a tap outside. Below 768 the top bar also drops the page icon and picks up the safe area inset, the page header stacks its actions under the title, the section headers stack, and below 640 the footer stacks as well. The search field in the top bar is a <code>FluxAdaptiveSlot</code>, so it hands over to an icon button the moment it no longer fits, which happens long before any of those breakpoints. The notice sits above the top bar in normal flow, so it scrolls away while the bar keeps sticking, and neither reaches across the rail; close it and a restore button appears in the top bar. A shell-wide announcement is a <code>FluxNotice</code> with <code>is-fluid</code>, exactly as the production applications do it. Open the overview and then the orders page: the overview leads with an <code>ApplicationHero</code> and the orders page with an <code>ApplicationPageHeader</code>, never both, because each renders the <code>h1</code>. The tabs change per page and filter the order table, so the tab bar is real navigation and not decoration. Pick <em>Customers</em> for a page short enough to prove that the footer is pushed down by <code>margin-top: auto</code> rather than pinned. This rail starts collapsed, because a shell with a desktop toggle remembers that state under one key for the whole site, and every frame on this page reads that same key when it loads. The last button in the top bar toggles the side panel. It stays mounted and slides out rather than unmounting, so the panel and the 300px the shell gives back travel over the same duration instead of one snapping while the other eases; a hidden panel is <code>inert</code>, so Tab walks straight past it. Below 1280 there is no room for it beside the content, so it stops pushing and starts covering, with a scrim that closes it on tap, exactly as the menu does at its own breakpoint. The shell gives its 300px back at that same width; it used to hold on to them until 768 and leave a strip of nothing behind.</p>



        <h2>Menu contexts</h2>
        <p>Three of these components only do something with a router: the context, the stack that renders one menu per matched route, and the switcher that jumps between levels. This route therefore runs a memory router of its own.</p>
        <PlaygroundViewport
            :height="690"
            path="/application/playground/contexts"
            title="menu contexts"/>
        <p>What to look at. The route deep links two levels in, so the rail opens on the rates menu rather than sliding there from the main menu. The back control at the top of a context menu walks one level up without changing the route, and the switcher in the rail header jumps straight to any level, including back to the main menu. Both stay in step with the header, which keeps the account row and the switcher above the sliding track. Note the rail here carries its own collapse toggle next to the account, on top of the one the top bar renders: the top bar always renders one, so an application that wants the control in the rail ends up with two at every width, this shell included. Narrow the frame past 768 and the whole sliding track moves into the drawer, where the levels still slide over each other with the header pinned.</p>


        <h2>Status pages</h2>
        <p>The four variants, in a frame of their own because they need no shell at all: they inject nothing, measure nothing and center themselves in whatever box they get.</p>
        <PlaygroundViewport
            :height="720"
            path="/application/playground/status"
            title="status pages"/>
        <p>What to look at. Each variant carries its own icon, accent color and copy, and every one of them is replaceable: the maintenance page overrides the title, the error page the description, the offline page the whole body. The status code sits above the heading as decoration and is hidden from screen readers, so the accessible name of the page stays the title. Below 1008px the grid drops to one column and below 768 each page trims its vertical padding, which is the only responsive move these have. Compare the four accents against each other in both themes; they are the clearest read of the intent colors on a large neutral surface anywhere in the library.</p>

        <h2>Where each component lives</h2>
        <ul>
            <li><strong>Dashboard</strong>: Application, ApplicationContent, ApplicationFooter, ApplicationHero, ApplicationMenu, ApplicationMenuAccount, ApplicationMenuPromo, ApplicationPageHeader, ApplicationSection, ApplicationSide, ApplicationTop.</li>
            <li><strong>Menu contexts</strong>: ApplicationMenuContext, ApplicationMenuContextStack, ApplicationMenuContextSwitcher, ApplicationMenuToggle.</li>
            <li><strong>Status pages</strong>: ApplicationStatusPage.</li>
        </ul>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxProse } from '@flux-ui/components';
    import PlaygroundViewport from './playground/PlaygroundViewport.vue';
</script>

<style
    lang="scss"
    module>
    .playground {
        padding-block: 60px;
        max-width: 1800px;
        margin-inline: auto;
    }

    .playground > :global([data-prose-full]) {
        margin-inline: 30px;
    }
</style>
