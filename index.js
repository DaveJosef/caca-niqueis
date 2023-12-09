
const cells = document.querySelectorAll('.cell');
const trigger = document.querySelector('.trigger');
const possibleResults = ['url(./blue.png)', 'url(./red.png)', 'url(./brown.png)'];
let playing = false;

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function applyRandomImage(cell) {
    let backgroundImage;
    const random = randomNumber(3);
    possibleResults.forEach((result, index) => {
        if ((index + 1) === random) {
            backgroundImage = result;
        }
    })
    cell.style.backgroundImage = backgroundImage;
    return random;
}

function checkResults(results) {
    let equal = true;
    results.forEach((result, index) => {
        equal = equal && (index - 1 < 0 ? true : (results[index] === results[index - 1]));
    })
    return equal;
}

cells.forEach(cell => {
    applyRandomImage(cell);
});

function spin() {
    playing = true;
    let results = [];
    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.style.backgroundImage = 'url(./gif.gif)';
        }, 510 * (index + 1))
        setTimeout(() => {
            results.push(applyRandomImage(cell));

            if (index === possibleResults.length - 1) {
                if (checkResults(results)) {
                    alert("Parabéns! Vc Ganhou!");
                }
                playing = false;
            }
        }, 5000 + 300 * (index + 1))
    })
}

trigger.addEventListener('mouseup', () => {
    if (!playing) {
        spin();
    }
});
