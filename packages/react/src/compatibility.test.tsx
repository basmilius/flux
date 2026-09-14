import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { blue500, slate950 } from "./colors";
import { FluxFadeTransition, createTranslate, getFocusableElements, iban, isFluxFormSelectGroup, isFluxFormSelectOption, useBreakpoints } from "./compatibility";

describe("React compatibility APIs", () => {
    it("translates keys and interpolates parameters", () => {
        const translate = createTranslate({ greeting: "Hello {name}" })();
        expect(translate("greeting", { name: "Flux" })).toBe("Hello Flux");
        expect(translate("unknown")).toBe("unknown");
    });

    it("tracks responsive breakpoints", () => {
        Object.defineProperty(window, "innerWidth", { configurable: true, value: 800, writable: true });
        function BreakpointProbe() {
            const breakpoints = useBreakpoints();
            return <span>{breakpoints.currentBreakpoint}</span>;
        }

        render(<BreakpointProbe />);
        expect(screen.getByText("md")).toBeInTheDocument();

        act(() => {
            window.innerWidth = 1300;
            window.dispatchEvent(new Event("resize"));
        });
        expect(screen.getByText("xl")).toBeInTheDocument();
    });

    it("exposes transition, focus, form option, mask, and color helpers", () => {
        const { container, rerender } = render(
            <FluxFadeTransition>
                <button>Focusable</button>
            </FluxFadeTransition>,
        );
        expect(getFocusableElements(container)).toHaveLength(1);
        rerender(
            <FluxFadeTransition show={false}>
                <button>Focusable</button>
            </FluxFadeTransition>,
        );
        expect(screen.queryByText("Focusable")).not.toBeInTheDocument();

        expect(isFluxFormSelectGroup({ label: "Group", options: [] })).toBe(true);
        expect(isFluxFormSelectOption({ label: "One", value: 1 })).toBe(true);

        const input = document.createElement("input");
        input.value = "nl91 abna 0417 1643 00";
        const handle = iban(input);
        expect(input.value).toBe("NL91 ABNA 0417 1643 00");
        handle.destroy();

        expect(blue500).toBe("#3b82f6");
        expect(slate950).toBe("#020617");
    });
});
