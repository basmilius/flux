<template>
    <div :class="$style.applicationMenuPromo">
        <FluxIcon
            v-if="icon"
            :name="icon"/>

        <div :class="$style.applicationMenuPromoContent">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import $style from '$fluxApplication/css/component/ApplicationMenuPromo.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
    }>();
</script>
