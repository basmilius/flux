import type { FluxColor, FluxIconName } from '@flux-ui/types';
import type { BillingModel, ClientStatus, DealStage, GoalStatus, InvoiceStatus, ProjectStatus, TaskPriority, TaskStatus } from '@/types';

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
});

const compact = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
});

export function formatCurrency(value: number): string {
    return currency.format(value);
}

export function formatCompact(value: number): string {
    return compact.format(value);
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number): string {
    return `${Math.round(value)}%`;
}

export function formatHours(value: number): string {
    return `${value.toFixed(value % 1 === 0 ? 0 : 1)}h`;
}

export type StatusMeta = {
    readonly label: string;
    readonly color: FluxColor;
    readonly icon: FluxIconName;
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
    'backlog': 'Backlog',
    'todo': 'To do',
    'in-progress': 'In progress',
    'review': 'Review',
    'done': 'Done'
};

export const TASK_STATUS_COLORS: Record<TaskStatus, FluxColor> = {
    'backlog': 'gray',
    'todo': 'info',
    'in-progress': 'primary',
    'review': 'warning',
    'done': 'success'
};

export const TASK_STATUS_ICONS: Record<TaskStatus, FluxIconName> = {
    'backlog': 'circle-dot',
    'todo': 'circle',
    'in-progress': 'circle-half-stroke',
    'review': 'eye',
    'done': 'circle-check'
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'urgent': 'Urgent'
};

export const TASK_PRIORITY_COLORS: Record<TaskPriority, FluxColor> = {
    'low': 'gray',
    'medium': 'info',
    'high': 'warning',
    'urgent': 'danger'
};

export const TASK_PRIORITY_ICONS: Record<TaskPriority, FluxIconName> = {
    'low': 'arrow-down',
    'medium': 'minus',
    'high': 'arrow-up',
    'urgent': 'fire'
};

export const PROJECT_STATUS: Record<ProjectStatus, StatusMeta> = {
    'planning': {label: 'Planning', color: 'info', icon: 'clipboard-list'},
    'active': {label: 'Active', color: 'success', icon: 'bolt'},
    'on-hold': {label: 'On hold', color: 'warning', icon: 'clock'},
    'completed': {label: 'Completed', color: 'gray', icon: 'circle-check'}
};

export const CLIENT_STATUS: Record<ClientStatus, StatusMeta> = {
    'lead': {label: 'Lead', color: 'info', icon: 'sparkles'},
    'active': {label: 'Active', color: 'success', icon: 'circle-check'},
    'churned': {label: 'Churned', color: 'danger', icon: 'circle-xmark'}
};

export const INVOICE_STATUS: Record<InvoiceStatus, StatusMeta> = {
    'draft': {label: 'Draft', color: 'gray', icon: 'file-lines'},
    'sent': {label: 'Sent', color: 'info', icon: 'paper-plane'},
    'paid': {label: 'Paid', color: 'success', icon: 'circle-check'},
    'overdue': {label: 'Overdue', color: 'danger', icon: 'triangle-exclamation'}
};

export const DEAL_STAGE: Record<DealStage, StatusMeta> = {
    'lead': {label: 'Lead', color: 'gray', icon: 'circle-dot'},
    'qualified': {label: 'Qualified', color: 'info', icon: 'magnifying-glass'},
    'proposal': {label: 'Proposal', color: 'primary', icon: 'file-lines'},
    'negotiation': {label: 'Negotiation', color: 'warning', icon: 'comments'},
    'won': {label: 'Won', color: 'success', icon: 'circle-check'},
    'lost': {label: 'Lost', color: 'danger', icon: 'circle-xmark'}
};

export const BILLING_MODEL_LABELS: Record<BillingModel, string> = {
    'fixed': 'Fixed price',
    'hourly': 'Hourly',
    'retainer': 'Retainer'
};

export const GOAL_STATUS: Record<GoalStatus, StatusMeta> = {
    'on-track': {label: 'On track', color: 'success', icon: 'bolt'},
    'at-risk': {label: 'At risk', color: 'warning', icon: 'triangle-exclamation'},
    'off-track': {label: 'Off track', color: 'danger', icon: 'circle-xmark'},
    'completed': {label: 'Completed', color: 'primary', icon: 'circle-check'}
};
