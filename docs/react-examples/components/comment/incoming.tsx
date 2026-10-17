import {useEffect, useState} from 'react';
import { FluxComment } from '@flux-ui/react';
import { DateTime } from 'luxon';
export default function Example() {
    const [postedOn, setPostedOn] = useState<DateTime>();
    useEffect(() => setPostedOn(DateTime.now().minus({seconds: 45})), []);
    return (
        <>
            <FluxComment
                avatarFallback={'neutral'}
                avatarFallbackIcon={'gear'}
                postedBy={'System'}
                postedOn={postedOn}
                isReceived
            >
                {
                    ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio ducimus earum sed tenetur. Amet at dicta explicabo facere, fuga id itaque nisi quam quisquam tempore. Alias asperiores ea odio perspiciatis? '
                }
            </FluxComment>
        </>
    );
}
