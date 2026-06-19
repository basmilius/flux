import type { FluxColor, FluxIconName } from '@flux-ui/types';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import type { ActivityEntry, BillingModel, CalendarEvent, Client, Deal, DealStage, EventType, FileNode, Goal, Id, Invoice, Notification, NotificationType, Project, ProjectStatus, Task, TaskPriority, TaskStatus, TeamMember, TimeEntry } from '@/types';

const NOW = DateTime.now();

const MEMBER_COLORS: FluxColor[] = ['primary', 'info', 'success', 'warning', 'danger'];
const PROJECT_COLORS: FluxColor[] = ['primary', 'info', 'success', 'warning', 'danger'];
const PROJECT_ICONS: FluxIconName[] = ['rocket', 'diagram-project', 'briefcase', 'bolt', 'lightbulb', 'palette', 'code', 'globe', 'seedling', 'chart-line'];
const ROLES = ['Product Designer', 'Frontend Engineer', 'Backend Engineer', 'Project Lead', 'QA Engineer', 'UX Researcher', 'DevOps Engineer', 'Account Manager'];
const INDUSTRIES = ['Fintech', 'Healthcare', 'Retail', 'Logistics', 'Media', 'Education', 'Travel', 'Energy', 'Real estate', 'Gaming'];
const TASK_TAGS = ['frontend', 'backend', 'design', 'bug', 'feature', 'research', 'docs', 'ux', 'infra', 'a11y'];
const TASK_STATUSES: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'review', 'done'];
const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];
const PROJECT_STATUSES: ProjectStatus[] = ['planning', 'active', 'active', 'active', 'on-hold', 'completed'];
const PROJECT_LABELS = ['web', 'mobile', 'branding', 'campaign', 'retainer', 'priority', 'internal', 'maintenance', 'r&d', 'rush'];
const BILLING_MODELS: BillingModel[] = ['fixed', 'hourly', 'retainer'];
const INVOICE_TAGS = ['design', 'development', 'consultancy', 'hosting', 'support', 'retainer'];

function initials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() ?? '')
        .join('');
}

function makeMembers(count: number): TeamMember[] {
    return Array.from({length: count}, (_, index) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const name = `${firstName} ${lastName}`;

        return {
            id: `m${index + 1}`,
            name,
            email: faker.internet.email({firstName, lastName}).toLowerCase(),
            role: ROLES[index % ROLES.length],
            initials: initials(name),
            presence: faker.helpers.arrayElement(['online', 'online', 'away', 'offline'] as const),
            color: MEMBER_COLORS[index % MEMBER_COLORS.length],
            capacity: faker.helpers.arrayElement([32, 36, 40, 40, 40])
        };
    });
}

function makeClients(count: number): Client[] {
    return Array.from({length: count}, (_, index) => {
        const contactName = faker.person.fullName();

        return {
            id: `c${index + 1}`,
            name: faker.company.name(),
            contactName,
            email: faker.internet.email({firstName: contactName.split(' ')[0]}).toLowerCase(),
            phone: faker.phone.number(),
            city: faker.location.city(),
            country: faker.location.country(),
            industry: faker.helpers.arrayElement(INDUSTRIES),
            status: faker.helpers.arrayElement(['lead', 'active', 'active', 'active', 'churned'] as const),
            since: NOW.minus({months: faker.number.int({min: 1, max: 48})}),
            color: faker.helpers.arrayElement(PROJECT_COLORS)
        };
    });
}

function makeProjects(count: number, clients: Client[], members: TeamMember[]): Project[] {
    const memberIds = members.map(member => member.id);

    return Array.from({length: count}, (_, index) => {
        const name = `${faker.commerce.productAdjective()} ${faker.commerce.product()}`;
        const budget = faker.number.int({min: 20, max: 250}) * 1000;
        const startDate = NOW.minus({days: faker.number.int({min: 10, max: 180})});

        return {
            id: `p${index + 1}`,
            name,
            key: name.slice(0, 3).toUpperCase(),
            description: faker.company.catchPhrase(),
            clientId: faker.helpers.arrayElement(clients).id,
            status: faker.helpers.arrayElement(PROJECT_STATUSES),
            color: PROJECT_COLORS[index % PROJECT_COLORS.length],
            icon: PROJECT_ICONS[index % PROJECT_ICONS.length],
            progress: faker.number.int({min: 5, max: 100}),
            budget,
            spent: Math.round(budget * faker.number.float({min: 0.1, max: 0.95})),
            startDate,
            dueDate: NOW.plus({days: faker.number.int({min: 5, max: 120})}),
            memberIds: faker.helpers.arrayElements(memberIds, {min: 2, max: 5}),
            labels: faker.helpers.arrayElements(PROJECT_LABELS, {min: 1, max: 3}),
            billingModel: faker.helpers.arrayElement(BILLING_MODELS),
            health: faker.number.int({min: 2, max: 5})
        };
    });
}

function makeTasks(projects: Project[]): Task[] {
    const tasks: Task[] = [];
    let counter = 1;

    for (const project of projects) {
        const total = faker.number.int({min: 9, max: 18});

        for (let index = 0; index < total; index++) {
            const status = faker.helpers.arrayElement(TASK_STATUSES);

            tasks.push({
                id: `t${counter++}`,
                projectId: project.id,
                title: faker.helpers.arrayElement([
                    `Implement ${faker.hacker.noun()} ${faker.hacker.noun()}`,
                    `Fix ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
                    `Design ${faker.commerce.productName()} flow`,
                    `Review ${faker.hacker.noun()} integration`,
                    `Write tests for ${faker.hacker.noun()}`
                ]),
                description: faker.lorem.sentence(),
                status,
                priority: faker.helpers.arrayElement(TASK_PRIORITIES),
                assigneeId: faker.helpers.maybe(() => faker.helpers.arrayElement(project.memberIds), {probability: 0.8}) ?? null,
                dueDate: faker.helpers.maybe(() => NOW.plus({days: faker.number.int({min: -10, max: 60})}), {probability: 0.7}) ?? null,
                tags: faker.helpers.arrayElements(TASK_TAGS, {min: 0, max: 3})
            });
        }
    }

    return tasks;
}

function makeEvents(projects: Project[]): CalendarEvent[] {
    const types: EventType[] = ['meeting', 'deadline', 'review', 'release'];
    const typeColor: Record<EventType, FluxColor> = {
        meeting: 'primary',
        deadline: 'danger',
        review: 'info',
        release: 'success'
    };

    const monthStart = NOW.startOf('month');

    return Array.from({length: 48}, (_, index) => {
        const type = faker.helpers.arrayElement(types);

        return {
            id: `e${index + 1}`,
            projectId: faker.helpers.maybe(() => faker.helpers.arrayElement(projects).id, {probability: 0.7}) ?? null,
            title: faker.helpers.arrayElement([
                'Stand-up', 'Sprint planning', 'Client call', 'Design review',
                'Retrospective', 'Demo', 'Release', 'Workshop', 'Deadline', 'Sync'
            ]),
            date: monthStart.plus({days: faker.number.int({min: 0, max: 55}), hours: faker.number.int({min: 8, max: 17})}),
            durationMinutes: faker.helpers.arrayElement([30, 45, 60, 90, 120]),
            type,
            color: typeColor[type]
        };
    });
}

function makeFiles(projects: Project[]): Record<Id, FileNode[]> {
    const result: Record<Id, FileNode[]> = {};
    let counter = 1;

    for (const project of projects) {
        const file = (label: string, icon: FluxIconName): FileNode => ({id: `f${counter++}`, label, icon});

        result[project.id] = [
            {
                id: `f${counter++}`,
                label: 'Design',
                icon: 'palette',
                children: [
                    file('wireframes.fig', 'image'),
                    file('design-system.fig', 'image'),
                    file('brand-guide.pdf', 'file-pdf')
                ]
            },
            {
                id: `f${counter++}`,
                label: 'Development',
                icon: 'code',
                children: [
                    {
                        id: `f${counter++}`,
                        label: 'src',
                        icon: 'folder',
                        children: [
                            file('index.ts', 'file-lines'),
                            file('router.ts', 'file-lines'),
                            file('store.ts', 'file-lines')
                        ]
                    },
                    file('README.md', 'file-lines'),
                    file('package.json', 'file-lines')
                ]
            },
            {
                id: `f${counter++}`,
                label: 'Documents',
                icon: 'folder',
                children: [
                    file('proposal.pdf', 'file-pdf'),
                    file('contract.pdf', 'file-pdf'),
                    file('invoice-001.pdf', 'file-pdf')
                ]
            }
        ];
    }

    return result;
}

function makeActivity(projects: Project[]): ActivityEntry[] {
    const entries: ActivityEntry[] = [];
    let counter = 1;

    for (const project of projects) {
        const total = faker.number.int({min: 5, max: 12});

        for (let index = 0; index < total; index++) {
            entries.push({
                id: `a${counter++}`,
                projectId: project.id,
                authorId: faker.helpers.arrayElement(project.memberIds),
                message: faker.helpers.arrayElement([
                    `moved a task to ${faker.helpers.arrayElement(TASK_STATUSES)}`,
                    'uploaded a new file',
                    `commented: "${faker.lorem.sentence()}"`,
                    'updated the project description',
                    'completed a milestone',
                    'invited a new member'
                ]),
                postedAt: NOW.minus({hours: faker.number.int({min: 1, max: 240})})
            });
        }
    }

    return entries.sort((a, b) => b.postedAt.toMillis() - a.postedAt.toMillis());
}

function makeInvoices(count: number, clients: Client[], projects: Project[]): Invoice[] {
    return Array.from({length: count}, (_, index) => {
        const client = faker.helpers.arrayElement(clients);
        const clientProjects = projects.filter(project => project.clientId === client.id);
        const project = clientProjects.length > 0 ? faker.helpers.arrayElement(clientProjects) : null;
        const issueDate = NOW.minus({days: faker.number.int({min: 2, max: 120})});
        const dueDate = issueDate.plus({days: 30});
        const status = faker.helpers.arrayElement(['draft', 'sent', 'sent', 'paid', 'paid', 'paid', 'overdue'] as const);
        const lineCount = faker.number.int({min: 1, max: 4});

        return {
            id: `inv${index + 1}`,
            number: `INV-2026-${String(index + 1).padStart(3, '0')}`,
            clientId: client.id,
            projectId: project?.id ?? null,
            status: status === 'overdue' && dueDate > NOW ? 'sent' : status,
            issueDate,
            dueDate,
            paidAt: status === 'paid' ? issueDate.plus({days: faker.number.int({min: 3, max: 28})}) : null,
            lines: Array.from({length: lineCount}, () => ({
                description: faker.helpers.arrayElement([
                    'Design sprint', 'Frontend development', 'Backend development',
                    'UX research', 'QA & testing', 'Project management', 'Consultancy', 'DevOps & hosting'
                ]),
                quantity: faker.number.int({min: 4, max: 60}),
                rate: faker.helpers.arrayElement([85, 95, 110, 125, 140])
            })),
            notes: faker.helpers.maybe(() => 'Thank you for your business.', {probability: 0.5}) ?? '',
            tags: faker.helpers.arrayElements(INVOICE_TAGS, {min: 0, max: 2})
        };
    });
}

function makeDeals(count: number, clients: Client[], members: TeamMember[]): Deal[] {
    const probabilityByStage: Record<DealStage, number> = {
        'lead': 10,
        'qualified': 30,
        'proposal': 55,
        'negotiation': 75,
        'won': 100,
        'lost': 0
    };

    return Array.from({length: count}, (_, index) => {
        const stage = faker.helpers.arrayElement(['lead', 'lead', 'qualified', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] as const);

        return {
            id: `d${index + 1}`,
            title: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
            clientId: faker.helpers.arrayElement(clients).id,
            ownerId: faker.helpers.arrayElement(members).id,
            stage,
            value: faker.number.int({min: 8, max: 180}) * 1000,
            probability: probabilityByStage[stage],
            closeDate: NOW.plus({days: faker.number.int({min: -20, max: 90})})
        };
    });
}

function makeGoals(members: TeamMember[]): Goal[] {
    const presets: { title: string; category: string; color: FluxColor }[] = [
        {title: 'Grow recurring revenue', category: 'Revenue', color: 'success'},
        {title: 'Improve client retention', category: 'Clients', color: 'primary'},
        {title: 'Ship the new design system', category: 'Product', color: 'info'},
        {title: 'Reduce average project overrun', category: 'Delivery', color: 'warning'},
        {title: 'Expand the engineering team', category: 'People', color: 'danger'},
        {title: 'Raise team utilisation', category: 'Operations', color: 'primary'}
    ];

    return presets.map((preset, index) => {
        const keyResults = Array.from({length: faker.number.int({min: 2, max: 4})}, () => ({
            label: faker.company.catchPhrase(),
            progress: faker.number.int({min: 0, max: 100})
        }));

        const progress = Math.round(keyResults.reduce((sum, kr) => sum + kr.progress, 0) / keyResults.length);
        const status = progress >= 100 ? 'completed' : progress >= 65 ? 'on-track' : progress >= 40 ? 'at-risk' : 'off-track';

        return {
            id: `g${index + 1}`,
            title: preset.title,
            description: faker.company.catchPhrase(),
            category: preset.category,
            quarter: 'Q2 2026',
            ownerId: members[index % members.length].id,
            status,
            progress,
            color: preset.color,
            keyResults
        };
    });
}

function makeNotifications(count: number, members: TeamMember[], projects: Project[], invoices: Invoice[], deals: Deal[]): Notification[] {
    const types: NotificationType[] = ['mention', 'assignment', 'comment', 'invoice', 'deal', 'system'];

    return Array.from({length: count}, (_, index) => {
        const type = faker.helpers.arrayElement(types);
        const author = type === 'system' ? null : faker.helpers.arrayElement(members);
        const project = faker.helpers.arrayElement(projects);
        const invoice = faker.helpers.arrayElement(invoices);
        const deal = faker.helpers.arrayElement(deals);

        const byType: Record<NotificationType, { title: string; body: string; to: Notification['to'] }> = {
            mention: {title: 'You were mentioned', body: `${author?.name} mentioned you in ${project.name}.`, to: {name: 'project-activity', params: {id: project.id}}},
            assignment: {title: 'New task assigned', body: `${author?.name} assigned you a task in ${project.name}.`, to: {name: 'project-board', params: {id: project.id}}},
            comment: {title: 'New comment', body: `${author?.name} commented on ${project.name}.`, to: {name: 'project-activity', params: {id: project.id}}},
            invoice: {title: 'Invoice update', body: `Invoice ${invoice.number} is ${invoice.status}.`, to: {name: 'invoice', params: {id: invoice.id}}},
            deal: {title: 'Deal moved', body: `“${deal.title}” advanced in the pipeline.`, to: {name: 'deals'}},
            system: {title: 'Welcome to Nimbus', body: 'Your demo workspace is ready. Everything resets on reload.', to: null}
        };

        const content = byType[type];

        return {
            id: `n${index + 1}`,
            type,
            title: content.title,
            body: content.body,
            authorId: author?.id ?? null,
            read: faker.datatype.boolean({probability: 0.45}),
            createdAt: NOW.minus({hours: faker.number.int({min: 1, max: 120})}),
            to: content.to
        };
    }).sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
}

function makeTimeEntries(members: TeamMember[], projects: Project[], tasks: Task[]): TimeEntry[] {
    const entries: TimeEntry[] = [];
    let counter = 1;
    const weekStart = NOW.startOf('week');

    // Two weeks of logged time across the team for a believable timesheet.
    for (let week = 0; week < 2; week++) {
        for (const member of members.slice(0, 6)) {
            const memberProjects = faker.helpers.arrayElements(projects, {min: 1, max: 3});

            for (let day = 0; day < 5; day++) {
                const date = weekStart.minus({weeks: week}).plus({days: day});

                for (const project of memberProjects) {
                    if (!faker.datatype.boolean({probability: 0.7})) {
                        continue;
                    }

                    const projectTasks = tasks.filter(task => task.projectId === project.id);

                    entries.push({
                        id: `te${counter++}`,
                        memberId: member.id,
                        projectId: project.id,
                        taskId: projectTasks.length > 0 ? faker.helpers.arrayElement(projectTasks).id : null,
                        date,
                        hours: faker.helpers.arrayElement([1, 1.5, 2, 2.5, 3, 4]),
                        note: faker.helpers.arrayElement(['Implementation', 'Meeting', 'Review', 'Design', 'Bugfixing', 'Planning']),
                        billable: faker.datatype.boolean({probability: 0.8})
                    });
                }
            }
        }
    }

    return entries;
}

export type Seed = {
    members: TeamMember[];
    clients: Client[];
    projects: Project[];
    tasks: Task[];
    events: CalendarEvent[];
    files: Record<Id, FileNode[]>;
    activity: ActivityEntry[];
    invoices: Invoice[];
    deals: Deal[];
    goals: Goal[];
    notifications: Notification[];
    timeEntries: TimeEntry[];
};

export function createSeed(): Seed {
    // Re-seed on every call so a "reset" reproduces the exact initial data set.
    faker.seed(20260619);

    const members = makeMembers(8);
    const clients = makeClients(12);
    const projects = makeProjects(10, clients, members);
    const tasks = makeTasks(projects);
    const events = makeEvents(projects);
    const files = makeFiles(projects);
    const activity = makeActivity(projects);
    const invoices = makeInvoices(18, clients, projects);
    const deals = makeDeals(14, clients, members);
    const goals = makeGoals(members);
    const notifications = makeNotifications(14, members, projects, invoices, deals);
    const timeEntries = makeTimeEntries(members, projects, tasks);

    return {members, clients, projects, tasks, events, files, activity, invoices, deals, goals, notifications, timeEntries};
}
