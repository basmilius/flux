<template>
    <FluxAvatarGroup
        :max="max"
        :size="size">
        <FluxAvatar
            v-for="member of members"
            :key="member.id"
            :fallback-initials="member.initials"
            :size="size"
            type="none"/>
    </FluxAvatarGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxAvatarGroup } from '@flux-ui/components';
    import { computed } from 'vue';
    import { useTeamStore } from '@/store';
    import type { Id } from '@/types';

    const {ids, max = 5, size = 30} = defineProps<{
        readonly ids: Id[];
        readonly max?: number;
        readonly size?: number;
    }>();

    const {membersByIds} = useTeamStore();

    const members = computed(() => membersByIds(ids));
</script>
