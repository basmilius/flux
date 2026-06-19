import { DateTime } from 'luxon';
import { computed } from 'vue';
import type { Id, Invoice, InvoiceLine, InvoiceStatus } from '@/types';
import { uid } from '@/util/id';
import { db } from './state';

export type InvoiceInput = {
    clientId: Id;
    projectId: Id | null;
    issueDate: DateTime;
    dueDate: DateTime;
    status: InvoiceStatus;
    lines: InvoiceLine[];
    notes: string;
    tags: string[];
};

export function invoiceTotal(invoice: Invoice): number {
    return invoice.lines.reduce((sum, line) => sum + line.quantity * line.rate, 0);
}

export function useInvoicesStore() {
    const invoices = computed(() => db.invoices);

    function getInvoice(id: Id): Invoice | undefined {
        return db.invoices.find(invoice => invoice.id === id);
    }

    function invoicesForClient(clientId: Id): Invoice[] {
        return db.invoices.filter(invoice => invoice.clientId === clientId);
    }

    function invoicesForProject(projectId: Id): Invoice[] {
        return db.invoices.filter(invoice => invoice.projectId === projectId);
    }

    function markAsPaid(id: Id): void {
        const invoice = getInvoice(id);

        if (invoice) {
            invoice.status = 'paid';
            invoice.paidAt = DateTime.now();
        }
    }

    function send(id: Id): void {
        const invoice = getInvoice(id);

        if (invoice && invoice.status === 'draft') {
            invoice.status = 'sent';
        }
    }

    function createInvoice(input: InvoiceInput): Invoice {
        const invoice: Invoice = {
            id: uid('inv'),
            number: `INV-2026-${String(db.invoices.length + 1).padStart(3, '0')}`,
            clientId: input.clientId,
            projectId: input.projectId,
            status: input.status,
            issueDate: input.issueDate,
            dueDate: input.dueDate,
            paidAt: input.status === 'paid' ? DateTime.now() : null,
            lines: input.lines,
            notes: input.notes,
            tags: input.tags
        };

        db.invoices = [invoice, ...db.invoices];

        return invoice;
    }

    function updateInvoice(id: Id, patch: Partial<Omit<Invoice, 'id'>>): void {
        const invoice = getInvoice(id);

        if (invoice) {
            Object.assign(invoice, patch);
        }
    }

    const totalByStatus = computed(() => {
        const totals: Record<InvoiceStatus, number> = {draft: 0, sent: 0, paid: 0, overdue: 0};

        for (const invoice of db.invoices) {
            totals[invoice.status] += invoiceTotal(invoice);
        }

        return totals;
    });

    const outstanding = computed(() => db.invoices
        .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + invoiceTotal(invoice), 0));

    const paidTotal = computed(() => db.invoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoiceTotal(invoice), 0));

    return {
        createInvoice,
        invoices,
        getInvoice,
        invoicesForClient,
        invoicesForProject,
        markAsPaid,
        outstanding,
        paidTotal,
        send,
        totalByStatus,
        updateInvoice
    };
}
