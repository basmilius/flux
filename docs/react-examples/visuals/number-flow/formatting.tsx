import { useState } from 'react';
import { FluxFlex, FluxSecondaryButton, FluxVisualNumberFlow } from '@flux-ui/react';
export default function Example() {
    type Metric = {
        label: string;
        value: number;
        format: Intl.NumberFormatOptions;
    };
    const [items, setItems] = useState<Metric[]>([
        {
            label: 'Revenue',
            value: 128400,
            format: { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }
        },
        {
            label: 'Conversion',
            value: 0.184,
            format: { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }
        },
        {
            label: 'Avg. rating',
            value: 4.6,
            format: { minimumFractionDigits: 1, maximumFractionDigits: 1 }
        }
    ]);
    function randomize(): void {
        setItems(
            items.map((item, index) => ({
                ...item,
                value:
                    index === 0
                        ? 80000 + Math.floor(Math.random() * 100000)
                        : index === 1
                          ? Math.random() * 0.4
                          : 3 + Math.random() * 2
            }))
        );
    }
    return (
        <>
            <FluxFlex align={'start'} direction={'vertical'} gap={18}>
                {items.map((item) => (
                    <FluxFlex key={item.label} align={'baseline'} direction={'horizontal'} gap={12}>
                        <span
                            style={{
                                width: '120px',
                                color: 'var(--foreground-secondary)',
                                fontSize: '13px',
                                fontWeight: '500'
                            }}
                        >
                            {item.label}
                        </span>
                        <FluxVisualNumberFlow
                            format={item.format}
                            value={item.value}
                            style={{ fontSize: '24px', fontWeight: '700' }}
                        ></FluxVisualNumberFlow>
                    </FluxFlex>
                ))}
                <FluxSecondaryButton
                    iconLeading={'rotate'}
                    label={'New values'}
                    onClick={randomize}
                ></FluxSecondaryButton>
            </FluxFlex>
        </>
    );
}
