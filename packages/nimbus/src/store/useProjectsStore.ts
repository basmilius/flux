import type { FluxColor, FluxIconName } from '@flux-ui/types';
import { DateTime } from 'luxon';
import { computed } from 'vue';
import type { Id, Project, ProjectStatus, Task, TaskStatus } from '@/types';
import { uid } from '@/util/id';
import { db } from './state';

const NEW_PROJECT_ICONS: FluxIconName[] = ['rocket', 'diagram-project', 'bolt', 'lightbulb', 'palette', 'code'];

export type NewProjectInput = {
    name: string;
    key: string;
    clientId: Id;
    description: string;
    status: ProjectStatus;
    color: FluxColor;
    budget: number;
    memberIds: Id[];
    labels: string[];
};

export function useProjectsStore() {
    const projects = computed(() => db.projects);
    const tasks = computed(() => db.tasks);

    function getProject(id: Id): Project | undefined {
        return db.projects.find(project => project.id === id);
    }

    function tasksForProject(projectId: Id): Task[] {
        return db.tasks.filter(task => task.projectId === projectId);
    }

    function tasksByStatus(projectId: Id, status: TaskStatus): Task[] {
        return db.tasks.filter(task => task.projectId === projectId && task.status === status);
    }

    function moveTask(taskId: Id, toStatus: TaskStatus, beforeTaskId?: Id): void {
        const moved = db.tasks.find(task => task.id === taskId);

        if (!moved) {
            return;
        }

        const updated = db.tasks.filter(task => task.id !== taskId);
        moved.status = toStatus;

        if (beforeTaskId === undefined) {
            updated.push(moved);
        } else {
            const beforeIndex = updated.findIndex(task => task.id === beforeTaskId);
            updated.splice(beforeIndex === -1 ? updated.length : beforeIndex, 0, moved);
        }

        db.tasks = updated;
    }

    function createTask(projectId: Id, patch: Partial<Omit<Task, 'id' | 'projectId'>> = {}): Task {
        const task: Task = {
            id: uid('t'),
            projectId,
            title: patch.title ?? 'New task',
            description: patch.description ?? '',
            status: patch.status ?? 'todo',
            priority: patch.priority ?? 'medium',
            assigneeId: patch.assigneeId ?? null,
            dueDate: patch.dueDate ?? null,
            tags: patch.tags ?? []
        };

        db.tasks = [...db.tasks, task];

        return task;
    }

    function updateTask(taskId: Id, patch: Partial<Omit<Task, 'id' | 'projectId'>>): void {
        const task = db.tasks.find(entry => entry.id === taskId);

        if (task) {
            Object.assign(task, patch);
        }
    }

    function deleteTask(taskId: Id): void {
        db.tasks = db.tasks.filter(task => task.id !== taskId);
    }

    function createProject(input: NewProjectInput): Project {
        const project: Project = {
            id: uid('p'),
            name: input.name,
            key: input.key || input.name.slice(0, 3).toUpperCase(),
            description: input.description || 'A brand new project.',
            clientId: input.clientId || db.clients[0]?.id || '',
            status: input.status,
            color: input.color,
            icon: NEW_PROJECT_ICONS[db.projects.length % NEW_PROJECT_ICONS.length],
            progress: 0,
            budget: input.budget,
            spent: 0,
            startDate: DateTime.now(),
            dueDate: DateTime.now().plus({months: 2}),
            memberIds: input.memberIds.length > 0 ? input.memberIds : db.members.slice(0, 3).map(member => member.id),
            labels: input.labels,
            billingModel: 'fixed',
            health: 3
        };

        db.projects = [project, ...db.projects];

        return project;
    }

    function updateProject(id: Id, patch: Partial<Omit<Project, 'id'>>): void {
        const project = getProject(id);

        if (project) {
            Object.assign(project, patch);
        }
    }

    function deleteProject(id: Id): void {
        db.projects = db.projects.filter(project => project.id !== id);
        db.tasks = db.tasks.filter(task => task.projectId !== id);
    }

    return {
        projects,
        tasks,
        createProject,
        createTask,
        deleteProject,
        deleteTask,
        getProject,
        moveTask,
        tasksByStatus,
        tasksForProject,
        updateProject,
        updateTask
    };
}
