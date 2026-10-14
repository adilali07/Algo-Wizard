export function mergeSort(arr) {
    const steps = [];
    mergeSortHelper(arr, 0, arr.length - 1, steps);
    return steps;
}

function mergeSortHelper(arr, left, right, steps) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSortHelper(arr, left, mid, steps);
        mergeSortHelper(arr, mid + 1, right, steps);
        merge(arr, left, mid, right, steps);
    }
}

function merge(arr, left, mid, right, steps) {
    if (left >= right) return;
    let copy = [];
    let leftIdx = left;
    let rightIdx = mid + 1;
    while (leftIdx <= mid && rightIdx <= right) {
        if (arr[leftIdx] <= arr[rightIdx]) {
            copy.push(arr[leftIdx]);
            leftIdx++;
        }
        else {
            copy.push(arr[rightIdx]);
            rightIdx++;
        }
    }
    while (leftIdx <= mid) {
        copy.push(arr[leftIdx]);
        leftIdx++;
    }
    while (rightIdx <= right) {
        copy.push(arr[rightIdx]);
        rightIdx++;
    }
    for (let i = left; i <= right; i++) {
        steps.push({
            type: "overwrite",
            index: i,
            value: copy[i - left]
        });
        arr[i] = copy[i - left];
    }
}