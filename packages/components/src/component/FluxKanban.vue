<template>
    <div :class="$style.kanban">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxKanbanMoveEvent } from '@flux-ui/types';
    import { provide } from 'vue';
    import { FluxKanbanInjectionKey } from '$flux/data/di';
    import { useKanban } from '$flux/composable/private/useKanban';
    import $style from '$flux/css/component/FluxKanban.module.scss';

    const emit = defineEmits<{
        move: [FluxKanbanMoveEvent];
    }>();

    defineSlots<{
        default?(): any;
    }>();

    provide(FluxKanbanInjectionKey, useKanban(event => emit('move', event)));
</script>
