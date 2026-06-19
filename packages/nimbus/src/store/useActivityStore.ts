import { DateTime } from 'luxon';
import { computed } from 'vue';
import type { ActivityEntry, Id } from '@/types';
import { uid } from '@/util/id';
import { db } from './state';

export function useActivityStore() {
    const activity = computed(() => db.activity);

    function activityForProject(projectId: Id): ActivityEntry[] {
        return db.activity.filter(entry => entry.projectId === projectId);
    }

    function recent(limit = 8): ActivityEntry[] {
        return [...db.activity]
            .sort((a, b) => b.postedAt.toMillis() - a.postedAt.toMillis())
            .slice(0, limit);
    }

    function addComment(projectId: Id, authorId: Id, message: string): ActivityEntry {
        const entry: ActivityEntry = {
            id: uid('a'),
            projectId,
            authorId,
            message: `commented: "${message}"`,
            postedAt: DateTime.now()
        };

        db.activity = [entry, ...db.activity];

        return entry;
    }

    return {
        activity,
        activityForProject,
        addComment,
        recent
    };
}
