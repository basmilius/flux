import {ReactPreview} from '../../../../../.vitepress/react/Preview';
import { type ComponentProps, useState } from 'react';
import {
    FluxForm,
    FluxFormField,
    FluxFormInput,
    FluxFormRepeater,
    FluxFormRow,
    FluxPane,
    FluxPaneBody
} from '@flux-ui/react';
export default function Example() {
    type Contact = {
        name: string;
        email: string;
    };
    const [contacts, setContacts] = useState<Contact[]>([
        { name: 'John Doe', email: 'john@example.com' }
    ]);
    function newContact(): Contact {
        return { name: '', email: '' };
    }
    return (
        <>
            <ReactPreview>
                <FluxPane style={{ maxWidth: '480px' }}>
                    <FluxForm>
                        <FluxPaneBody>
                            <FluxFormRepeater
                                value={contacts}
                                onValueChange={setContacts}
                                addLabel={'Add contact'}
                                rowLabel={'Contact'}
                                newRow={newContact}
                                children={({ row }) => (
                                    <>
                                        <FluxFormRow>
                                            <FluxFormField label={'Name'}>
                                                <FluxFormInput
                                                    value={row.name}
                                                    onValueChange={(next) =>
                                                        setContacts((current) =>
                                                            current.map((item) =>
                                                                item === row
                                                                    ? {
                                                                          ...item,
                                                                          name: String(next ?? '')
                                                                      }
                                                                    : item
                                                            )
                                                        )
                                                    }
                                                    placeholder={'E.g. John Doe'}
                                                ></FluxFormInput>
                                            </FluxFormField>
                                            <FluxFormField label={'Email address'}>
                                                <FluxFormInput
                                                    value={row.email}
                                                    onValueChange={(next) =>
                                                        setContacts((current) =>
                                                            current.map((item) =>
                                                                item === row
                                                                    ? {
                                                                          ...item,
                                                                          email: String(next ?? '')
                                                                      }
                                                                    : item
                                                            )
                                                        )
                                                    }
                                                    type={'email'}
                                                    placeholder={'E.g. john@example.com'}
                                                ></FluxFormInput>
                                            </FluxFormField>
                                        </FluxFormRow>
                                    </>
                                )}
                            ></FluxFormRepeater>
                        </FluxPaneBody>
                    </FluxForm>
                </FluxPane>
            </ReactPreview>
        </>
    );
}
