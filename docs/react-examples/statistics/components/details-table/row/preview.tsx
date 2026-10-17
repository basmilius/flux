import { FluxPane, FluxPaneBody, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow } from '@flux-ui/react';
import { ReactPreview } from '../../../../../../.vitepress/react/Preview';
export default function Example() {
    return (<><ReactPreview><FluxPane style={{ "minWidth": "300px" }}><FluxPaneBody><FluxStatisticsDetailsTable title=""><FluxStatisticsDetailsTableRow label={"Status"} value={"Paid"}></FluxStatisticsDetailsTableRow><FluxStatisticsDetailsTableRow label={"Total"} value={"€ 149.99"}></FluxStatisticsDetailsTableRow></FluxStatisticsDetailsTable></FluxPaneBody></FluxPane></ReactPreview></>);
}
