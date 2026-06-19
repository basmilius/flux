let counter = 100000;

// Monotonic id generator for client-side created entities.
export function uid(prefix: string): string {
    return `${prefix}${counter++}`;
}
