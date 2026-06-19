import { reactive } from 'vue';
import { createSeed } from '@/data/seed';

// Single in-memory source of truth. All edits mutate this reactive object and
// are intentionally not persisted — a reload restores the initial seed.
export const db = reactive(createSeed());

export function resetData(): void {
    const fresh = createSeed();
    db.members = fresh.members;
    db.clients = fresh.clients;
    db.projects = fresh.projects;
    db.tasks = fresh.tasks;
    db.events = fresh.events;
    db.files = fresh.files;
    db.activity = fresh.activity;
    db.invoices = fresh.invoices;
    db.deals = fresh.deals;
    db.goals = fresh.goals;
    db.notifications = fresh.notifications;
    db.timeEntries = fresh.timeEntries;
}
