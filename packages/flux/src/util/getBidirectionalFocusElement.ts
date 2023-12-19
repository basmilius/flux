import getFocusableElements from './getFocusableElements';

export default function (container: HTMLElement, currentElement: HTMLElement, direction: 'up' | 'down' | 'left' | 'right'): HTMLElement | null {
    const elements = getFocusableElements(container);
    const currentIndex = elements.indexOf(currentElement);

    if (currentIndex === -1) {
        return null;
    }

    const elementInfos = getBidirectionalInfoForElements(elements);

    calculateBidirectionalDistances(elementInfos, currentIndex, direction);

    let candidate = determineBidirectionalCandidate(currentIndex, direction, elementInfos, elements);

    if (!candidate) {
        if (direction === 'up' || direction === 'left') {
            candidate = elements[currentIndex - 1];
        }

        if (direction === 'down' || direction === 'right') {
            candidate = elements[currentIndex + 1];
        }
    }

    return candidate;
}

function calculateBidirectionalDistances(elementInfos: BidirectionalInfo[], currentIndex: number, direction: 'up' | 'down' | 'left' | 'right'): void {
    const current = elementInfos[currentIndex];

    elementInfos.forEach(r => {
        let point = r.center;

        switch (direction) {
            case 'up':
                point = {x: point.x, y: r.top + r.height};
                break;

            case 'down':
                point = {x: point.x, y: r.top};
                break;

            case 'left':
                point = {x: r.left + r.width, y: point.y};
                break;

            case 'right':
                point = {x: r.left, y: point.y};
                break;
        }

        r.distance = Math.sqrt(Math.pow(current.center.x - point.x, 2) + Math.pow(current.center.y - point.y, 2));
    });
}

function determineBidirectionalCandidate(currentIndex: number, direction: 'up' | 'down' | 'left' | 'right', elementInfos: BidirectionalInfo[], elements: HTMLElement[]): HTMLElement | null {
    const current = elementInfos[currentIndex];
    let distances: number[] = [];

    switch (direction) {
        case 'up':
            distances = elementInfos.map((r, index) => index === currentIndex || r.top + r.height > current.top ? Number.MAX_SAFE_INTEGER : r.distance);
            break;

        case 'down':
            distances = elementInfos.map((r, index) => index === currentIndex || r.top < current.top + current.height ? Number.MAX_SAFE_INTEGER : r.distance);
            break;

        case 'left':
            distances = elementInfos.map((r, index) => index === currentIndex || r.left + r.width > current.left ? Number.MAX_SAFE_INTEGER : r.distance);
            break;

        case 'right':
            distances = elementInfos.map((r, index) => index === currentIndex || r.left < current.left + current.width ? Number.MAX_SAFE_INTEGER : r.distance);
            break;
    }

    const candidateIndex = distances.indexOf(Math.min(...distances));

    if (distances[candidateIndex] !== Number.MAX_SAFE_INTEGER) {
        return elements[candidateIndex];
    }

    return null;
}

function getBidirectionalInfoForElements(elements: HTMLElement[]): BidirectionalInfo[] {
    return elements
        .map(elm => elm.getBoundingClientRect())
        .map(rect => ({
            height: rect.height,
            width: rect.width,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            center: {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            },
            distance: 0
        }));
}

type BidirectionalInfo = Omit<DOMRect, 'x' | 'y' | 'toJSON'> & {
    center: { x: number; y: number; };
    distance: number;
}
