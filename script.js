import { bubbleSort } from "./algorithms/bubbleSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { insertionSort } from "./algorithms/insertionSort.js";
import { mergeSort } from "./algorithms/mergeSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { binarySearch } from "./algorithms/binarySearch.js";
import { linearSearch } from "./algorithms/linearSearch.js";

const algorithm = document.getElementById("algorithm");
const input = document.getElementById("input");
const visualize = document.getElementById("visualize");
const prev = document.getElementById("prev");
const playPause = document.getElementById("playPause");
const next = document.getElementById("next");
const speed = document.getElementById("speed");
const targetInput = document.getElementById("target");

let steps = [];
let currentStep = 0;
let playing = false;

function displayArray(arr) {
    const container = document.getElementById("visualization");
    container.innerHTML = "";

    arr.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 30}px`;
        bar.innerText = value;
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getSpeed() {
    return 1000 - speed.value * 90;
}

function resetBars() {
    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.background = "#3478f6";
    });
}

async function animateStep(step) {
    const bars = document.querySelectorAll(".bar");

    if (step.type === "compare") {
        bars[step.i].style.background = "orange";
        bars[step.j].style.background = "orange";
    }
    else if (step.type === "swap") {
        bars[step.i].style.background = "orange";
        bars[step.j].style.background = "orange";
        
        const tempHeight = bars[step.i].style.height;
        bars[step.i].style.height = bars[step.j].style.height;
        bars[step.j].style.height = tempHeight;

        const tempText = bars[step.i].innerText;
        bars[step.i].innerText = bars[step.j].innerText;
        bars[step.j].innerText = tempText;
    }
    else if(step.type === "overwrite") {
        bars[step.index].style.background = "orange";
        bars[step.index].style.height = `${step.value * 30}px`;
        bars[step.index].innerText = step.value;
    }
    else if(step.type === "found") {
        bars[step.i].style.background = "green";
    }
}

visualize.addEventListener("click", function() {
    playing = false;
    playPause.innerText = "▶ Play";

    const arr = input.value.trim().split(/\s+/).map(Number);
    const originalArray = [...arr];

    if (algorithm.value === "bubble") {
        steps = bubbleSort(arr);
    }
    else if (algorithm.value === "selection") {
        steps = selectionSort(arr);
    }
    else if (algorithm.value === "insertion") {
        steps = insertionSort(arr);
    }
    else if (algorithm.value === "merge") {
        steps = mergeSort(arr);
    }
    else if (algorithm.value === "quick") {
        steps = quickSort(arr);
    }
    else if(algorithm.value === "binary") {
        targetInput.style.display = "inline-block";
        arr.sort((a, b) => a - b);

        let target = Number(targetInput.value);
        steps = binarySearch(arr, target);
    }
    else if(algorithm.value === "linear") {
        targetInput.style.display = "inline-block";
        
        let target = Number(targetInput.value);
        steps = linearSearch(arr, target);
    }
    currentStep = 0;
    displayArray(originalArray);
    console.log("Steps:", steps);
});

next.addEventListener("click", async function() {
    if (currentStep >= steps.length) {
        return;
    }

    resetBars();
    await animateStep(steps[currentStep]);
    currentStep++;
});

prev.addEventListener("click", async function() {
    if (currentStep === 0) return;

    currentStep--;
    resetBars();
    await animateStep(steps[currentStep]);
});

playPause.addEventListener("click", async function() {
    if (playing) {
        playing = false;
        playPause.innerText = "▶ Play";
        return;
    }

    playing = true;
    playPause.innerText = "⏸ Pause";

    while (playing && currentStep < steps.length) {
        resetBars();
        await animateStep(steps[currentStep]);
        currentStep++;
        await sleep(getSpeed());
    }

    if (currentStep >= steps.length) {
        playing = false;
        playPause.innerText = "▶ Play";
    }
});