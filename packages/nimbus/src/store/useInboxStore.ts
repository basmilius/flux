import { computed } from 'vue';
import type { Id, Notification } from '@/types';
import { db } from './state';

export function useInboxStore() {
    const notifications = computed(() => db.notifications);

    const unreadCount = computed(() => db.notifications.filter(notification => !notification.read).length);

    function getNotification(id: Id): Notification | undefined {
        return db.notifications.find(notification => notification.id === id);
    }

    function markRead(id: Id, read = true): void {
        const notification = getNotification(id);

        if (notification) {
            notification.read = read;
        }
    }

    function markAllRead(): void {
        for (const notification of db.notifications) {
            notification.read = true;
        }
    }

    return {
        getNotification,
        markAllRead,
        markRead,
        notifications,
        unreadCount
    };
}
