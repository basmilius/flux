import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import {FluxLocaleProvider, type FluxLocaleProps} from '../i18n';
import rootStyles from '../../../components/src/css/component/Root.module.scss';
import { FluxDialogProvider, FluxSnackbarProvider, useFluxStore } from './Notifications';

export function FluxRoot({ className, locale, messages, translate, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'translate'> & FluxLocaleProps) {
    const { inertMain } = useFluxStore();
    return (
        <FluxLocaleProvider locale={locale} messages={messages} translate={translate}>
            <div {...props} className={clsx(rootStyles.root, className)} inert={inertMain || undefined} />
            <FluxDialogProvider />
            <FluxSnackbarProvider />
        </FluxLocaleProvider>
    );
}
