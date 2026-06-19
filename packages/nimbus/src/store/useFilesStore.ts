import type { FluxTreeViewOption } from '@flux-ui/types';
import type { FileNode, Id } from '@/types';
import { db } from './state';

function toOption(node: FileNode): FluxTreeViewOption {
    return {
        id: node.id,
        label: node.label,
        icon: node.icon,
        children: node.children?.map(toOption)
    };
}

export function useFilesStore() {
    function filesForProject(projectId: Id): FluxTreeViewOption[] {
        return (db.files[projectId] ?? []).map(toOption);
    }

    return {
        filesForProject
    };
}
