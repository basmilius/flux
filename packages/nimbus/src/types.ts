import type { FluxColor, FluxIconName } from '@flux-ui/types';
import type { DateTime } from 'luxon';

export type Id = string;

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed';
export type MemberPresence = 'online' | 'away' | 'offline';
export type ClientStatus = 'lead' | 'active' | 'churned';
export type EventType = 'meeting' | 'deadline' | 'review' | 'release';
export type BillingModel = 'fixed' | 'hourly' | 'retainer';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type GoalStatus = 'on-track' | 'at-risk' | 'off-track' | 'completed';
export type NotificationType = 'mention' | 'assignment' | 'comment' | 'invoice' | 'deal' | 'system';

export type TeamMember = {
    readonly id: Id;
    name: string;
    email: string;
    role: string;
    initials: string;
    presence: MemberPresence;
    color: FluxColor;
    capacity: number;
};

export type Client = {
    readonly id: Id;
    name: string;
    contactName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    industry: string;
    status: ClientStatus;
    since: DateTime;
    color: FluxColor;
};

export type Task = {
    readonly id: Id;
    readonly projectId: Id;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId: Id | null;
    dueDate: DateTime | null;
    tags: string[];
};

export type Project = {
    readonly id: Id;
    name: string;
    key: string;
    description: string;
    clientId: Id;
    status: ProjectStatus;
    color: FluxColor;
    icon: FluxIconName;
    progress: number;
    budget: number;
    spent: number;
    startDate: DateTime;
    dueDate: DateTime;
    memberIds: Id[];
    labels: string[];
    billingModel: BillingModel;
    health: number;
};

export type CalendarEvent = {
    readonly id: Id;
    projectId: Id | null;
    title: string;
    date: DateTime;
    durationMinutes: number;
    type: EventType;
    color: FluxColor;
};

export type FileNode = {
    readonly id: Id;
    label: string;
    icon?: FluxIconName;
    children?: FileNode[];
};

export type ActivityEntry = {
    readonly id: Id;
    readonly projectId: Id;
    authorId: Id;
    message: string;
    postedAt: DateTime;
};

export type InvoiceLine = {
    description: string;
    quantity: number;
    rate: number;
};

export type Invoice = {
    readonly id: Id;
    number: string;
    clientId: Id;
    projectId: Id | null;
    status: InvoiceStatus;
    issueDate: DateTime;
    dueDate: DateTime;
    paidAt: DateTime | null;
    lines: InvoiceLine[];
    notes: string;
    tags: string[];
};

export type Deal = {
    readonly id: Id;
    title: string;
    clientId: Id;
    ownerId: Id;
    stage: DealStage;
    value: number;
    probability: number;
    closeDate: DateTime;
};

export type KeyResult = {
    label: string;
    progress: number;
};

export type Goal = {
    readonly id: Id;
    title: string;
    description: string;
    category: string;
    quarter: string;
    ownerId: Id;
    status: GoalStatus;
    progress: number;
    color: FluxColor;
    keyResults: KeyResult[];
};

export type Notification = {
    readonly id: Id;
    type: NotificationType;
    title: string;
    body: string;
    authorId: Id | null;
    read: boolean;
    createdAt: DateTime;
    to: NotificationLink | null;
};

export type NotificationLink = {
    readonly name: string;
    readonly params?: Record<string, string>;
};

export type TimeEntry = {
    readonly id: Id;
    memberId: Id;
    projectId: Id;
    taskId: Id | null;
    date: DateTime;
    hours: number;
    note: string;
    billable: boolean;
};
