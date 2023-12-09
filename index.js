
const cells = document.querySelectorAll('.cell');
const trigger = document.querySelector('.trigger');
const possibleResults = ['url(./slot_1.png)', 'url(./slot_2.png)', 'url(./slot_3.png)', 'url(./slot_4.png)', 'url(./slot_5.png)'];
let playing = false;
const cheersAudio = new Audio('./cheers.wav');
const rollingAudio = new Audio('./rolling.wav');
const scoreAudio = new Audio('./score.wav');

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function applyRandomImage(cell) {
    let backgroundImage;
    const random = randomNumber(5);
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
    rollingAudio.play();
    playing = true;
    let results = [];
    cells.forEach((cell, index) => {
        setTimeout(() => {
            //cell.style.backgroundImage = 'url(./gif.gif)';
            cell.classList.add('spinning');
        }, 510 * (index + 1))
        setTimeout(() => {
            scoreAudio.play();
            cell.classList.remove('spinning');
            results.push(applyRandomImage(cell));

            if (index === cells.length - 1) {
                if (checkResults(results)) {
                    alert("Parabéns! Vc Ganhou!");
                    cheersAudio.play();
                }
                playing = false;
                rollingAudio.pause();
            }
        }, 5000 + 300 * (index + 1))
    })
}

trigger.addEventListener('mouseup', () => {
    if (!playing) {
        spin();
    }
});
