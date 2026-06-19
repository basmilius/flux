import { computed } from 'vue';
import type { Id, TeamMember } from '@/types';
import { db } from './state';

export function useTeamStore() {
    const members = computed(() => db.members);

    function getMember(id: Id | null | undefined): TeamMember | undefined {
        if (id === null || id === undefined) {
            return undefined;
        }

        return db.members.find(member => member.id === id);
    }

    function membersByIds(ids: Id[]): TeamMember[] {
        return ids
            .map(id => getMember(id))
            .filter((member): member is TeamMember => member !== undefined);
    }

    return {
        members,
        getMember,
        membersByIds
    };
}
