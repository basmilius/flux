<template>
    <table :class="$style.apiTable">
        <thead>
        <slot name="head">
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </slot>
        </thead>
        <tbody>
        <slot name="body"/>
        </tbody>
    </table>
</template>

<style
    lang="scss"
    module>
    .apiTable {
        margin: -1px;
        width: calc(100% + 2px);
        border-collapse: collapse;
        font-size: 14px;
        overflow: hidden;

        td, th {
            padding: 15px 21px;
            border: 1px solid rgb(var(--gray-3));
            vertical-align: top;
            text-align: left;
        }

        th {
            padding: 9px 21px;
            background: rgb(var(--gray-1) / .5);
            color: var(--foreground-secondary);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;

            &:first-child {
                width: 240px;
            }
        }

        td code {
            display: block;

            &:first-child {
                color: var(--foreground-prominent);
                font-weight: 500;
            }

            &:last-child {
                margin-top: 1px;
                font-size: 11px;
            }
        }
    }
</style>
