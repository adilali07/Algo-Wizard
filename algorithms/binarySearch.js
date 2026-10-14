export function binarySearch(arr, target) {
    let steps = [];

    let low = 0;
    let high = arr.length - 1;

    while(low <= high) {
        let mid = Math.floor((low + high) / 2);

        steps.push({
            type: "compare",
            i: mid,
            j: mid
        });

        if(arr[mid] === target) {
            steps.push({
                type: "found",
                i: mid
            });

            return steps;
        }

        if(arr[mid] < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }

    steps.push({
        type: "notFound"
    });

    return steps;
}