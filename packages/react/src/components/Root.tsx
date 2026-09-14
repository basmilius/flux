import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import rootStyles from "../../../components/src/css/component/Root.module.scss";
import { FluxDialogProvider, FluxSnackbarProvider, useFluxStore } from "./Notifications";

export function FluxRoot({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    const { inertMain } = useFluxStore();
    return (
        <>
            <div {...props} className={clsx(rootStyles.root, className)} inert={inertMain || undefined} />
            <FluxDialogProvider />
            <FluxSnackbarProvider />
        </>
    );
}
