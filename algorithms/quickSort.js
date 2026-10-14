export function quickSort(arr) {
    const steps = [];
    quickSortHelper(arr, 0, arr.length - 1, steps);
    return steps;
}

function quickSortHelper(arr, start, end, steps) {
    if (start >= end) return;
    let pivotIndex = paratition(arr, start, end, steps);
    quickSortHelper(arr, start, pivotIndex - 1, steps);
    quickSortHelper(arr, pivotIndex + 1, end, steps);
}

function paratition(arr, start, end, steps) {
    let pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        steps.push({
            type: "compare",
            i: end,
            j: j
        });
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push({
                type: "swap",
                i: i,
                j: j
            });
        }
    }
    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
    steps.push({
        type: "swap",
        i: i + 1,
        j: end
    });
    return i + 1;
}