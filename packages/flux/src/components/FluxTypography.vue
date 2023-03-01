<template>
    <div class="flux-typography">
        <slot/>
    </div>
</template>

<style lang="scss">
    .flux-typography {
        h1, h2, h3, h4, h5, h6 {
            margin: 0;
            font-weight: 700;
            line-height: 1.4;
        }

        p {
            margin: 0;
            line-height: 1.6;
        }

        h1 {
            color: var(--foreground-prominent);
            font-size: 30px;
        }

        h2 {
            color: var(--foreground-prominent);
            font-size: 21px;
        }

        h3 {
            color: var(--foreground);
            font-size: 18px;
        }

        blockquote {
            position: relative;
            margin: 0 0 0 30px;
            padding: 15px 21px;
            background: var(--gray-2);
            border-radius: var(--radius);

            &::before {
                position: absolute;
                top: 5px;
                left: -27px;
                content: '”';
                color: var(--primary-6);
                font-size: 39px;
                font-weight: 700;
            }
        }

        img {
            height: unset;
            max-width: 100%;
            border-radius: calc(var(--radius) / 2);
            outline: 1px solid rgb(0 0 0 / .025);
            outline-offset: -1px;
        }

        ul, ol {
            margin: 0;
        }

        :is(h1, h2, h3, h4, h5, h6, p, ul, ol, li, blockquote, img) + :is(h1, h2, h3) {
            margin-top: 39px;
        }

        :is(h1, h2, h3, h4, h5, h6, p, ul, ol, li, blockquote, img) + :is(h4, h5, h6, p, ul, ol, li, blockquote, img) {
            margin-top: 15px;
        }
    }
</style>
