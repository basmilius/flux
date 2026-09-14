import { fireEvent, render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import { describe, expect, it, vi } from "vitest";
import { FluxCalendar, FluxCalendarItem, FluxDatePicker, FluxFilter, FluxFilterOption, FluxFilterOptions, FluxFilterRange } from "./CalendarFilters";

describe("FluxDatePicker", () => {
    it("selects a date and respects date boundaries", () => {
        const onValueChange = vi.fn();
        render(<FluxDatePicker defaultValue={DateTime.fromISO("2025-01-15")} min={DateTime.fromISO("2025-01-10")} max={DateTime.fromISO("2025-01-25")} onValueChange={onValueChange} />);

        const day = screen.getAllByRole("button", { name: "20" }).find((button) => !button.hasAttribute("disabled"));
        fireEvent.click(day!);
        expect(onValueChange.mock.calls[0][0].toISODate()).toBe("2025-01-20");
        expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    });

    it("emits an ordered range after two selections", () => {
        const onValueChange = vi.fn();
        render(<FluxDatePicker defaultValue={DateTime.fromISO("2025-01-15")} rangeMode="range" onValueChange={onValueChange} />);

        const enabledDay = (label: string) => screen.getAllByRole("button", { name: label }).find((button) => !button.hasAttribute("disabled"))!;
        fireEvent.click(enabledDay("20"));
        fireEvent.click(enabledDay("12"));
        expect(onValueChange.mock.calls[0][0].map((date: DateTime) => date.toISODate())).toEqual(["2025-01-12", "2025-01-20"]);
    });

    it("previews only the range between the selected and hovered dates", () => {
        render(<FluxDatePicker defaultValue={DateTime.fromISO("2025-01-15")} rangeMode="range" />);
        const enabledDay = (label: string) => screen.getAllByRole("button", { name: label }).find((button) => !button.hasAttribute("disabled"))!;
        fireEvent.click(enabledDay("20"));
        fireEvent.mouseEnter(enabledDay("12"));
        expect(enabledDay("15").className).toMatch(/isSelectionEntry/);
        expect(enabledDay("10").className).not.toMatch(/isSelectionEntry/);
        expect(enabledDay("25").className).not.toMatch(/isSelectionEntry/);
    });

    it("uses roving focus and arrow keys for day selection", () => {
        render(<FluxDatePicker defaultValue={DateTime.fromISO("2025-01-15")} />);
        const day15 = screen.getAllByRole("button", { name: "15" }).find((button) => !button.hasAttribute("disabled"))!;
        const day16 = screen.getAllByRole("button", { name: "16" }).find((button) => !button.hasAttribute("disabled"))!;
        expect(day15).toHaveAttribute("tabindex", "0");
        day15.focus();
        fireEvent.keyDown(day15, { key: "ArrowRight" });
        expect(day16).toHaveFocus();
        expect(day16).toHaveAttribute("tabindex", "0");
    });
});

describe("FluxCalendar", () => {
    it("renders registered items and navigates months", () => {
        const onNavigate = vi.fn();
        render(
            <FluxCalendar initialDate={DateTime.fromISO("2025-01-15")} onNavigate={onNavigate}>
                <FluxCalendarItem id="planning" date={DateTime.fromISO("2025-01-20")}>
                    Planning
                </FluxCalendarItem>
            </FluxCalendar>,
        );

        expect(screen.getByRole("button", { name: "Planning" })).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Next" }));
        expect(screen.getByText("February 2025")).toBeInTheDocument();
        expect(onNavigate).toHaveBeenLastCalledWith(expect.objectContaining({ month: 2 }), expect.any(DateTime), expect.any(DateTime));
    });
});

describe("filter controls", () => {
    it("updates single and multiple option values", () => {
        const onValueChange = vi.fn();
        const { rerender } = render(
            <FluxFilter value={{ status: null }} onValueChange={onValueChange}>
                <FluxFilterOption name="status" label="Status" options={[{ label: "Open", value: "open" }]} />
            </FluxFilter>,
        );
        fireEvent.click(screen.getByRole("radio", { name: "Open" }));
        expect(onValueChange).toHaveBeenCalledWith({ status: "open" });

        rerender(
            <FluxFilter value={{ status: ["open"] }} onValueChange={onValueChange}>
                <FluxFilterOptions
                    name="status"
                    label="Status"
                    options={[
                        { label: "Open", value: "open" },
                        { label: "Closed", value: "closed" },
                    ]}
                />
            </FluxFilter>,
        );
        fireEvent.click(screen.getByRole("checkbox", { name: "Closed" }));
        expect(onValueChange).toHaveBeenLastCalledWith({ status: ["open", "closed"] });
    });

    it("keeps the numeric range ordered", () => {
        const onValueChange = vi.fn();
        render(
            <FluxFilter value={{ price: [20, 80] }} onValueChange={onValueChange}>
                <FluxFilterRange name="price" label="Price" min={0} max={100} />
            </FluxFilter>,
        );
        const sliders = screen.getAllByRole("slider");
        fireEvent.change(sliders[0], { target: { value: "90" } });
        expect(onValueChange).toHaveBeenCalledWith({ price: [90, 90] });
    });

    it("applies option disabled state and invokes option callbacks", () => {
        const onValueChange = vi.fn(), onChange = vi.fn(), onClear = vi.fn();
        const {rerender} = render(
            <FluxFilter value={{status: null}} onValueChange={onValueChange}>
                <FluxFilterOption disabled name="status" label="Status" options={[{label: "Open", value: "open"}]} onChange={onChange} />
            </FluxFilter>,
        );
        expect(screen.getByRole("radio", {name: "Open"})).toBeDisabled();
        fireEvent.click(screen.getByRole("radio", {name: "Open"}));
        expect(onValueChange).not.toHaveBeenCalled();

        rerender(
            <FluxFilter value={{status: ["open"]}} onValueChange={onValueChange}>
                <FluxFilterOptions name="status" label="Status" options={[{label: "Open", value: "open"}]} onChange={onChange} onClear={onClear} />
            </FluxFilter>,
        );
        fireEvent.click(screen.getByRole("checkbox", {name: "Open"}));
        expect(onChange).toHaveBeenLastCalledWith([]);
        expect(onClear).toHaveBeenCalledOnce();
    });
});
