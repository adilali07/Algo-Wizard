export function selectionSort(arr) {

    let steps = [];
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minElIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: "compare",
                i: minElIdx,
                j: j
            });
            if (arr[j] < arr[minElIdx]) {
                minElIdx = j;
            }
        }

        if (arr[minElIdx] < arr[i]) {
            steps.push({
                type: "swap",
                i: i,
                j: minElIdx
            });

            [arr[i], arr[minElIdx]] = [arr[minElIdx], arr[i]];
        }
    }

    return steps;
}