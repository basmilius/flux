import { computed } from 'vue';
import type { Deal, DealStage, Id } from '@/types';
import { db } from './state';

export function useDealsStore() {
    const deals = computed(() => db.deals);

    function getDeal(id: Id): Deal | undefined {
        return db.deals.find(deal => deal.id === id);
    }

    function dealsByStage(stage: DealStage): Deal[] {
        return db.deals.filter(deal => deal.stage === stage);
    }

    function totalForStage(stage: DealStage): number {
        return dealsByStage(stage).reduce((sum, deal) => sum + deal.value, 0);
    }

    function moveDeal(dealId: Id, toStage: DealStage, beforeDealId?: Id): void {
        const moved = db.deals.find(deal => deal.id === dealId);

        if (!moved) {
            return;
        }

        const probabilityByStage: Record<DealStage, number> = {
            'lead': 10,
            'qualified': 30,
            'proposal': 55,
            'negotiation': 75,
            'won': 100,
            'lost': 0
        };

        const updated = db.deals.filter(deal => deal.id !== dealId);
        moved.stage = toStage;
        moved.probability = probabilityByStage[toStage];

        if (beforeDealId === undefined) {
            updated.push(moved);
        } else {
            const beforeIndex = updated.findIndex(deal => deal.id === beforeDealId);
            updated.splice(beforeIndex === -1 ? updated.length : beforeIndex, 0, moved);
        }

        db.deals = updated;
    }

    const wonValue = computed(() => totalForStage('won'));
    const openValue = computed(() => db.deals
        .filter(deal => deal.stage !== 'won' && deal.stage !== 'lost')
        .reduce((sum, deal) => sum + deal.value, 0));

    return {
        deals,
        dealsByStage,
        getDeal,
        moveDeal,
        openValue,
        totalForStage,
        wonValue
    };
}
