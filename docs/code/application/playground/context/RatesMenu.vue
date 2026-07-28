<template>
    <FluxApplicationMenuContext
        icon="money-bill"
        subtitle="Lane RTM-HAM"
        title="Rates"/>

    <FluxMenuGroup>
        <FluxMenuSubHeader label="Rate cards"/>

        <FluxMenuItem
            v-for="card of cards"
            :key="card.id"
            :icon-leading="card.icon"
            :is-active="card.id === activeCardId"
            :label="card.label"
            @click="activeCardId = card.id"/>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationMenuContext } from '@flux-ui/application';
    import { FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { ref } from 'vue';

    const cards = [
        {icon: 'box-archive', id: 'pallet', label: 'Pallet freight'},
        {icon: 'truck', id: 'ftl', label: 'Full truck load'},
        {icon: 'cart-shopping', id: 'ltl', label: 'Part load'}
    ] satisfies readonly {
        readonly icon: FluxIconName;
        readonly id: string;
        readonly label: string;
    }[];

    const activeCardId = ref('pallet');
</script>
