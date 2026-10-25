import { useState } from 'react';
import { FluxBackToTop } from '@flux-ui/react';
import './scroll-container-0.scss';
export default function Example() {
    const [scroller, setScroller] = useState<HTMLElementTagNameMap['div'] | null>(null);
    return (
        <>
            <div className="react-example-fcr03lnlqe92" style={{ width: '100%' }}>
                <div className={'frame'}>
                    <div ref={setScroller} className={'scroller'} tabIndex={-1}>
                        <p>{'This panel scrolls on its own, the page underneath does not move.'}</p>
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((index) => (
                            <p key={index}>
                                {' Release note '}
                                {index}
                                {' with a short summary of what changed. '}
                            </p>
                        ))}
                    </div>
                    <FluxBackToTop offset={60} target={scroller} position={'start'}></FluxBackToTop>
                </div>
            </div>
        </>
    );
}
