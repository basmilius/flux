<template>
    <div class="flux-form-input-group">
        <slot/>
    </div>
</template>

<style lang="scss">
    @layer component {
        .flux-form-input-group {
            display: flex;
        }
    }

    @layer cosy {
        .flux-form-input-group > :where(.flux-button, .flux-form-input, .flux-form-input-addition) {
            &:not(:first-child) {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }

            &:not(:last-child) {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            + & {
                margin-left: -1px;
            }
        }
    }
</style>
