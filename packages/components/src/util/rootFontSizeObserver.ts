const callbacks = new Set<() => void>();

let observer: ResizeObserver | null = null;

export function subscribeToRootFontSize(callback: () => void): () => void {
    if (typeof ResizeObserver === 'undefined') {
        return () => {
        };
    }

    callbacks.add(callback);

    if (!observer) {
        observer = new ResizeObserver(() => {
            for (const subscriber of callbacks) {
                subscriber();
            }
        });

        observer.observe(document.documentElement);
    }

    return () => {
        callbacks.delete(callback);

        if (callbacks.size === 0 && observer) {
            observer.disconnect();
            observer = null;
        }
    };
}
