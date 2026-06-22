import { reactive } from 'vue';
import { createSeed } from '@/data/seed';

// Single in-memory source of truth. All edits mutate this reactive object and
// are intentionally not persisted — a reload restores the initial seed.
export const db = reactive(createSeed());

export function resetData(): void {
    Object.assign(db, createSeed());
}
