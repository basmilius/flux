<template>
    <FluxAvatar
        :fallback-initials="member?.initials ?? '?'"
        :size="size"
        :status="status"
        type="none"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';
    import { computed } from 'vue';
    import type { TeamMember } from '@/types';

    const {member, size = 30} = defineProps<{
        readonly member?: TeamMember;
        readonly size?: number;
    }>();

    const status = computed<FluxColor | undefined>(() => {
        if (!member) {
            return undefined;
        }

        if (member.presence === 'online') {
            return 'success';
        }

        if (member.presence === 'away') {
            return 'warning';
        }

        return undefined;
    });
</script>
