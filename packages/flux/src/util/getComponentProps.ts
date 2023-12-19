export default function <T extends object>(component: any): T {
    return component.props ?? {} as T;
}
