export function bubbleSort(arr) {

    let steps = [];
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                type: "compare",
                i: j,
                j: j + 1
            });

            if (arr[j] > arr[j + 1]) {
                steps.push({
                    type: "swap",
                    i: j,
                    j: j + 1
                });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return steps;
}