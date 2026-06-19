import { computed } from 'vue';
import type { Client, Id, Project } from '@/types';
import { db } from './state';

export function useClientsStore() {
    const clients = computed(() => db.clients);

    function getClient(id: Id | null | undefined): Client | undefined {
        if (id === null || id === undefined) {
            return undefined;
        }

        return db.clients.find(client => client.id === id);
    }

    function projectsForClient(clientId: Id): Project[] {
        return db.projects.filter(project => project.clientId === clientId);
    }

    return {
        clients,
        getClient,
        projectsForClient
    };
}
