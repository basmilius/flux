import {FluxFilter, FluxPane, type FluxFilterState} from '@flux-ui/react';
import {useState} from 'react';
import MyToggleFilter from './MyToggleFilter';

export default function Example() {
    const [filterState, setFilterState] = useState<FluxFilterState>({});
    return <FluxPane style={{width: 'max-content', alignSelf: 'start'}}>
        <FluxFilter value={filterState} onValueChange={setFilterState}>
            <MyToggleFilter icon="bell" label="Notifications" name="notifications" defaultValue={true} />
            <MyToggleFilter icon="moon" label="Dark mode" name="darkMode" />
        </FluxFilter>
    </FluxPane>;
}
