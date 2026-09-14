import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
    FluxApplication,
    FluxApplicationContent,
    FluxApplicationMenu,
    FluxApplicationMenuContext,
    FluxApplicationMenuContextStack,
    FluxApplicationMenuToggle,
    FluxApplicationSide,
    FluxApplicationStatusPage,
    useApplicationMenu,
} from "./Application";

function StateProbe() {
    const menu = useApplicationMenu();
    return <output>{`${menu.layout}:${menu.isMenuCollapsed}:${menu.viewIndex}:${menu.contexts.length}`}</output>;
}

describe("application shell", () => {
    it("shares layout and menu state through the application hooks", () => {
        render(
            <FluxApplication menu={<FluxApplicationMenu><FluxApplicationMenuToggle /></FluxApplicationMenu>}>
                <FluxApplicationContent layout="dashboard"><StateProbe /></FluxApplicationContent>
            </FluxApplication>,
        );
        expect(screen.getByText("dashboard:true:0:0")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("menuitem", { name: "Toggle menu" }));
        expect(screen.getByText("dashboard:false:0:0")).toBeInTheDocument();
    });

    it("registers route contexts and renders named route views", async () => {
        const route = { fullPath: "/projects/flux", matched: [{ path: "/projects", components: { menu: () => <span>Project menu</span> } }] };
        render(
            <FluxApplication route={route}>
                <FluxApplicationMenuContext title="Projects" />
                <FluxApplicationMenuContextStack />
                <StateProbe />
            </FluxApplication>,
        );
        expect(await screen.findByText("Project menu")).toBeInTheDocument();
        expect(await screen.findByText(/default:(?:true|false):1:1/)).toBeInTheDocument();
    });

    it("controls side panels and status navigation", () => {
        const onVisibleChange = vi.fn();
        const back = vi.fn();
        render(
            <FluxApplication router={{ back }}>
                <FluxApplicationSide onVisibleChange={onVisibleChange}>Details</FluxApplicationSide>
                <FluxApplicationStatusPage variant="not-found" code={404} />
            </FluxApplication>,
        );
        fireEvent.click(screen.getByRole("button", { name: "Close panel" }));
        expect(onVisibleChange).toHaveBeenCalledWith(false);
        expect(screen.getByText("Page not found")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Back" }));
        expect(back).toHaveBeenCalledOnce();
    });
});
