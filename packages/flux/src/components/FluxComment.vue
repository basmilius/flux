<template>
    <div
        class="flux-comment"
        :class="{
            'is-flipped': isFlipped,
            'is-received': isReceived
        }">
        <flux-avatar
            class="flux-comment-avatar"
            fallback-initials="BM"
            :size="42"/>

        <div class="flux-comment-body">
            <div class="flux-comment-header">
                <strong>Bas Milius</strong>
                <time>13:03</time>
            </div>

            <div class="flux-comment-message">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ipsum nihil quia vero? Et eveniet ex hic id impedit ipsa necessitatibus perferendis quibusdam totam ut? Assumenda deleniti dolorum recusandae tenetur?
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar } from '.';

    export interface Props {
        readonly isFlipped?: boolean;
        readonly isReceived?: boolean;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-comment {
        display: flex;
        gap: 21px;

        &-avatar {
            flex-shrink: 0;
        }

        &-body {
            display: flex;
            align-items: flex-start;
            flex-flow: column;
            gap: 9px;
        }

        &-header {
            display: flex;
            padding: 3px 15px 0;
            align-items: center;
            align-self: stretch;
            gap: 15px;
            justify-content: space-between;

            strong {
                color: var(--foreground-prominent);
            }

            time {
                color: var(--foreground-secondary);
                font-size: 14px;
            }
        }

        &.is-flipped &-header {
            padding-right: 0;
        }

        &:not(.is-flipped) &-header {
            padding-left: 0;
        }

        &-message {
            padding: 12px 15px;
            background: linear-gradient(to bottom, rgb(var(--gray-0)), rgb(var(--gray-2)));
            border: 1px solid rgb(var(--gray-4));
            border-radius: calc(var(--radius) * 1.5);
            box-shadow: var(--shadow-md);
        }

        &.is-flipped &-message {
            border-top-right-radius: calc(var(--radius) * .5);
        }

        &:not(.is-flipped) &-message {
            border-top-left-radius: calc(var(--radius) * .5);
        }

        &.is-received &-message {
            background: linear-gradient(to bottom, rgb(var(--primary-6)), rgb(var(--primary-8)));
            border-color: rgb(var(--primary-9));
            color: rgb(var(--primary-0));
        }

        &.is-flipped &-avatar {
            order: 1;
        }

        &.is-flipped &-body {
            margin-left: auto;
            align-items: flex-end;
        }
    }
</style>
