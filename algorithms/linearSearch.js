export function linearSearch(arr, target) {
    let steps = [];
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            type: "compare",
            i: i,
            j: i
        });
        if (arr[i] === target) {
            steps.push({
                type: "found",
                i: i
            });
            return steps;
        }
    }
    steps.push({
        type: "notFound"
    });
    return steps;
}