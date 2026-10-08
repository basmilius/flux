import {useEffect, useMemo, useState} from 'react';
import {faker} from '@faker-js/faker';
import {ReactPreview} from '../../../../.vitepress/react/Preview';
import { FluxComment, FluxFlex } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    const [incoming, outgoing] = useMemo(() => {
        faker.seed(4501);
        return [faker.lorem.sentences(2), faker.lorem.sentences(3)];
    }, []);
    const [incomingPostedOn, setIncomingPostedOn] = useState<DateTime>();
    const [outgoingPostedOn, setOutgoingPostedOn] = useState<DateTime>();
    useEffect(() => {
        setIncomingPostedOn(DateTime.now().minus({minutes: 15}));
        setOutgoingPostedOn(DateTime.now());
    }, []);
    return (
        <>
            <ReactPreview>
                <FluxFlex direction={'vertical'} gap={18}>
                    <FluxComment
                        avatarAlt={'Profile picture of Bas Milius'}
                        avatarSrc={'https://avatars.githubusercontent.com/u/978257?v=4'}
                        postedBy={'Bas Milius'}
                        postedOn={incomingPostedOn}
                        isReceived
                    >
                        {incoming}
                    </FluxComment>
                    <FluxComment
                        avatarFallbackIcon={'user'}
                        postedBy={'You'}
                        postedOn={outgoingPostedOn}
                    >
                        {outgoing}
                    </FluxComment>
                </FluxFlex>
            </ReactPreview>
        </>
    );
}
