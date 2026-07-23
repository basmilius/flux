<template>
    <FluxFlow
        axis="horizontal"
        background="dots"
        interactive
        :padding="32">
        <FluxFlowNode id="src-web" :x="0" :y="0">
            <FluxFlowTriggerCard title="Web storefront"/>
        </FluxFlowNode>

        <FluxFlowNode id="src-mobile" :x="0" :y="220">
            <FluxFlowTriggerCard title="Mobile app"/>
        </FluxFlowNode>

        <FluxFlowNode id="src-partner" :x="0" :y="440">
            <FluxFlowTriggerCard title="Partner API"/>
        </FluxFlowNode>

        <FluxFlowNode id="src-pos" :x="0" :y="660">
            <FluxFlowTriggerCard title="In-store POS"/>
        </FluxFlowNode>

        <FluxFlowNode id="src-market" :x="0" :y="880">
            <FluxFlowTriggerCard title="Marketplace sync"/>
        </FluxFlowNode>

        <FluxFlowNode id="edge-cdn" :x="520" :y="0">
            <FluxFlowActionCard>CDN edge cache</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="edge-waf" :x="520" :y="220">
            <FluxFlowActionCard>WAF and bot filter</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="edge-gw" :x="520" :y="440">
            <FluxFlowActionCard>API gateway</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="edge-authz" :x="520" :y="660">
            <FluxFlowConditionCard>Session valid?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ord-validate" :x="1040" :y="220">
            <FluxFlowActionCard>Validate cart</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ord-price" :x="1040" :y="440">
            <FluxFlowActionCard>Price and tax engine</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ord-promo" :x="1040" :y="660">
            <FluxFlowActionCard>Apply promotions</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ord-fraud" :x="1040" :y="880">
            <FluxFlowConditionCard>Fraud score OK?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-rejected-auth" :x="1560" :y="0">
            <FluxFlowTerminal label="Rejected" icon="circle-xmark" color="danger"/>
        </FluxFlowNode>

        <FluxFlowNode id="ord-review" :x="1560" :y="1100">
            <FluxFlowActionCard>Manual review queue</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="pay-tokenize" :x="2080" :y="440">
            <FluxFlowActionCard>Tokenize card</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="pay-auth" :x="2080" :y="660">
            <FluxFlowConditionCard>Authorize payment?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-cancelled-review" :x="2080" :y="1100">
            <FluxFlowTerminal label="Cancelled" icon="ban" color="danger"/>
        </FluxFlowNode>

        <FluxFlowNode id="pay-3ds" :x="2600" :y="220">
            <FluxFlowActionCard>3-D Secure challenge</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="pay-capture" :x="2600" :y="440">
            <FluxFlowActionCard>Capture funds</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="pay-retry" :x="2600" :y="660">
            <FluxFlowActionCard>Fallback PSP</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="pay-ledger" :x="3120" :y="440">
            <FluxFlowActionCard>Post to ledger</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-cancelled-pay" :x="3120" :y="880">
            <FluxFlowTerminal label="Cancelled" icon="ban" color="danger"/>
        </FluxFlowNode>

        <FluxFlowNode id="inv-reserve" :x="3640" :y="220">
            <FluxFlowActionCard>Reserve stock</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="inv-check" :x="3640" :y="440">
            <FluxFlowConditionCard>In stock?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="inv-backorder" :x="3640" :y="660">
            <FluxFlowActionCard>Backorder</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="inv-allocate" :x="4160" :y="440">
            <FluxFlowActionCard>Allocate warehouse</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="inv-split" :x="4160" :y="660">
            <FluxFlowActionCard>Split shipment</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ful-pick" :x="4680" :y="440">
            <FluxFlowActionCard>Pick and pack</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ful-label" :x="4680" :y="660">
            <FluxFlowActionCard>Print label</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ful-carrier" :x="4680" :y="880">
            <FluxFlowConditionCard>Carrier available?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ful-manifest" :x="5200" :y="440">
            <FluxFlowActionCard>Manifest handover</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ful-track" :x="5200" :y="660">
            <FluxFlowActionCard>Emit tracking</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="del-transit" :x="5720" :y="440">
            <FluxFlowActionCard>In transit</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="del-attempt" :x="5720" :y="660">
            <FluxFlowConditionCard>Delivery attempt?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="del-signed" :x="6240" :y="220">
            <FluxFlowActionCard>Proof of delivery</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="del-locker" :x="6240" :y="440">
            <FluxFlowActionCard>Parcel locker</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="del-depot" :x="6240" :y="660">
            <FluxFlowActionCard>Return to depot</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="post-invoice" :x="6760" :y="220">
            <FluxFlowActionCard>Issue invoice</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="post-loyalty" :x="6760" :y="440">
            <FluxFlowActionCard>Award loyalty points</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-archived" :x="6760" :y="660">
            <FluxFlowTerminal label="Archived" icon="box-archive" color="info"/>
        </FluxFlowNode>

        <FluxFlowNode id="post-review" :x="7280" :y="220">
            <FluxFlowActionCard>Request review</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="post-analytics" :x="7280" :y="440">
            <FluxFlowActionCard>Stream to warehouse</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="post-notify" :x="7800" :y="220">
            <FluxFlowActionCard>Notify customer</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-delivered" :x="7894" :y="440">
            <FluxFlowTerminal label="Delivered" icon="circle-check" color="success"/>
        </FluxFlowNode>

        <FluxFlowNode id="ret-request" :x="8320" :y="660">
            <FluxFlowTriggerCard title="Return requested"/>
        </FluxFlowNode>

        <FluxFlowNode id="ret-approve" :x="8320" :y="880">
            <FluxFlowConditionCard>RMA approved?</FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-rejected-rma" :x="8840" :y="440">
            <FluxFlowTerminal label="Rejected" icon="circle-xmark" color="danger"/>
        </FluxFlowNode>

        <FluxFlowNode id="ret-label" :x="8840" :y="880">
            <FluxFlowActionCard>Return label</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ret-inspect" :x="9360" :y="880">
            <FluxFlowActionCard>Inspect item</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ret-refund" :x="9360" :y="1100">
            <FluxFlowActionCard>Refund and restock</FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="end-refunded" :x="9880" :y="1100">
            <FluxFlowTerminal label="Refunded" icon="rotate-left" color="info"/>
        </FluxFlowNode>

        <FluxFlowConnection from="src-web" to="edge-cdn" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="src-mobile" to="edge-cdn" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="src-market" to="edge-waf" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="src-partner" to="edge-gw" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="src-pos" to="edge-gw" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="edge-cdn" to="edge-waf" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="edge-waf" to="edge-gw" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="edge-gw" to="edge-authz" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="edge-authz" to="ord-validate" from-side="right" to-side="left" from-align="start" to-align="start" label="valid" color="success"/>
        <FluxFlowConnection from="edge-authz" to="end-rejected-auth" from-side="right" to-side="left" from-align="start" to-align="start" label="expired" color="danger"/>
        <FluxFlowConnection from="ord-validate" to="ord-price" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ord-price" to="ord-promo" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ord-promo" to="ord-fraud" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ord-fraud" to="ord-review" from-side="right" to-side="left" from-align="start" to-align="start" label="flagged" color="warning"/>
        <FluxFlowConnection from="ord-fraud" to="pay-tokenize" from-side="right" to-side="left" from-align="start" to-align="start" label="clear" color="success"/>
        <FluxFlowConnection from="ord-review" to="pay-tokenize" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="ord-review" to="end-cancelled-review" from-side="right" to-side="left" from-align="start" to-align="start" label="deny" color="danger"/>
        <FluxFlowConnection from="pay-tokenize" to="pay-auth" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="pay-auth" to="pay-3ds" from-side="right" to-side="left" from-align="start" to-align="start" label="challenge" color="warning"/>
        <FluxFlowConnection from="pay-auth" to="pay-capture" from-side="right" to-side="left" from-align="start" to-align="start" label="approved" color="success"/>
        <FluxFlowConnection from="pay-auth" to="pay-retry" from-side="right" to-side="left" from-align="start" to-align="start" label="declined" color="danger"/>
        <FluxFlowConnection from="pay-3ds" to="pay-capture" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="pay-retry" to="pay-capture" from-side="top" to-side="bottom"/>
        <FluxFlowConnection from="pay-retry" to="end-cancelled-pay" from-side="right" to-side="left" from-align="start" to-align="start" label="exhausted" color="danger"/>
        <FluxFlowConnection from="pay-capture" to="pay-ledger" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="pay-ledger" to="inv-check" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="inv-check" to="inv-reserve" from-side="top" to-side="bottom" label="yes" color="success"/>
        <FluxFlowConnection from="inv-check" to="inv-backorder" from-side="bottom" to-side="top" label="no" color="warning"/>
        <FluxFlowConnection from="inv-reserve" to="inv-allocate" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="inv-backorder" to="inv-allocate" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="inv-allocate" to="inv-split" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="inv-split" to="ful-pick" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="ful-pick" to="ful-label" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ful-label" to="ful-carrier" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ful-carrier" to="ful-manifest" from-side="right" to-side="left" from-align="start" to-align="start" label="yes" color="success"/>
        <FluxFlowConnection from="ful-carrier" to="inv-split" from-side="left" to-side="right" from-align="start" to-align="start" label="no" color="warning"/>
        <FluxFlowConnection from="ful-manifest" to="ful-track" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ful-track" to="del-transit" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="del-transit" to="del-attempt" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="del-attempt" to="del-signed" from-side="right" to-side="left" from-align="start" to-align="start" label="success" color="success"/>
        <FluxFlowConnection from="del-attempt" to="del-locker" from-side="right" to-side="left" from-align="start" to-align="start" label="absent" color="warning"/>
        <FluxFlowConnection from="del-attempt" to="del-depot" from-side="right" to-side="left" from-align="start" to-align="start" label="failed" color="danger"/>
        <FluxFlowConnection from="del-locker" to="del-signed" from-side="top" to-side="bottom"/>
        <FluxFlowConnection from="del-depot" to="del-transit" from-side="left" to-side="right" from-align="start" to-align="start" label="retry" color="warning"/>
        <FluxFlowConnection from="del-signed" to="post-invoice" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="del-signed" to="end-archived" from-side="right" to-side="left" from-align="start" to-align="start" color="info"/>
        <FluxFlowConnection from="post-invoice" to="post-loyalty" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="post-loyalty" to="post-review" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="post-review" to="post-analytics" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="post-analytics" to="post-notify" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="post-notify" to="end-delivered" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="post-notify" to="ret-request" from-side="right" to-side="left" from-align="start" to-align="start" label="return" color="info"/>
        <FluxFlowConnection from="ret-request" to="ret-approve" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ret-approve" to="ret-label" from-side="right" to-side="left" from-align="start" to-align="start" label="yes" color="success"/>
        <FluxFlowConnection from="ret-approve" to="end-rejected-rma" from-side="right" to-side="left" from-align="start" to-align="start" label="no" color="danger"/>
        <FluxFlowConnection from="ret-label" to="ret-inspect" from-side="right" to-side="left" from-align="start" to-align="start"/>
        <FluxFlowConnection from="ret-inspect" to="ret-refund" from-side="bottom" to-side="top"/>
        <FluxFlowConnection from="ret-refund" to="end-refunded" from-side="right" to-side="left" from-align="start" to-align="start"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTerminal, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
