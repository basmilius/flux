import { type ComponentProps, useState } from 'react';
import {
    FluxForm,
    FluxFormField,
    FluxFormInput,
    FluxFormNumberInput,
    FluxFormRepeater,
    FluxFormRow,
    FluxPane,
    FluxPaneBody
} from '@flux-ui/react';
export default function Example() {
    type Line = {
        description: string;
        hours: number | null;
    };
    const [lines, setLines] = useState<Line[]>([
        { description: 'Design work', hours: 8 },
        { description: 'Development', hours: 24 },
        { description: 'Project management', hours: 4 }
    ]);
    function newLine(): Line {
        return { description: '', hours: 1 };
    }
    return (
        <>
            <FluxPane style={{ maxWidth: '480px' }}>
                <FluxForm>
                    <FluxPaneBody>
                        <FluxFormRepeater
                            value={lines}
                            onValueChange={setLines}
                            addLabel={'Add line item'}
                            isReorderable
                            rowLabel={'Line item'}
                            newRow={newLine}
                            children={({ row }) => (
                                <>
                                    <FluxFormRow>
                                        <FluxFormField label={'Description'}>
                                            <FluxFormInput
                                                value={row.description}
                                                onValueChange={(next) =>
                                                    setLines((current) =>
                                                        current.map((item) =>
                                                            item === row
                                                                ? {
                                                                      ...item,
                                                                      description: String(
                                                                          next ?? ''
                                                                      )
                                                                  }
                                                                : item
                                                        )
                                                    )
                                                }
                                                placeholder={'E.g. Design work'}
                                            ></FluxFormInput>
                                        </FluxFormField>
                                        <FluxFormField label={'Hours'}>
                                            <FluxFormNumberInput
                                                value={row.hours}
                                                onValueChange={(next) =>
                                                    setLines((current) =>
                                                        current.map((item) =>
                                                            item === row
                                                                ? {
                                                                      ...item,
                                                                      hours: Number(next ?? 0)
                                                                  }
                                                                : item
                                                        )
                                                    )
                                                }
                                                min={0}
                                            ></FluxFormNumberInput>
                                        </FluxFormField>
                                    </FluxFormRow>
                                </>
                            )}
                        ></FluxFormRepeater>
                    </FluxPaneBody>
                </FluxForm>
            </FluxPane>
        </>
    );
}
