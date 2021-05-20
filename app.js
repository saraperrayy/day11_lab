//TDD 
// Make objects for each image - name, image, clicks - seen? (check)
// constructor function ^^ (check)
// create count variable (check)
// counting guesses ONLY allowing a certain number and then you can't guess any more
// render two images - must be two different images
// - renders
// - pick goats
// you can click - listener
// when you click it counts AND renders new images
// stretch goal - make sure images don't repeat each round 
// wipe out data of results to start over - render the results
// Get global variables

// Global Variables
const results = document.getElementById('goat-clicks')
const allGoats = document.getElementById('all_goats')
const rightGoatImg = document.getElementById('right_goat_img')
const leftGoatImg = document.getElementById('left_goat_img')
const rightGoatPEl = document.getElementById('right_goat_p')
const leftGoatPEl = document.getElementById('left_goat_p')

let totalClicks = 0;

let leftGoat = null;
let rightGoat = null;

const GoatPictures = function(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.clicks = 0;
    this.timesShown = 0;

    GoatPictures.allImages.push(this);
}
// added property to the GoatPictures object that is an array
GoatPictures.allImages = [];

const renderGoats = function() {
    leftGoatImg.src = leftGoat.imagePath;
    rightGoatImg.src = rightGoat.imagePath;
    rightGoatPEl.textContent = rightGoat.name;
    leftGoatPEl.textContent = leftGoat.name;
}

// write a function that picks two different goats
function goatPicker() {
    // write a function that picks one goat at random, and then another, making sure the first goat and second goat are not the same
    let leftIndex = Math.floor(Math.random() * GoatPictures.allImages.length)
    let rightIndex = Math.floor(Math.random() * GoatPictures.allImages.length)
    // different index number than the first
    while (rightIndex === leftIndex) {
        rightIndex = Math.floor(Math.random() * GoatPictures.allImages.length)
    }
    leftGoat = GoatPictures.allImages[leftIndex];
    rightGoat = GoatPictures.allImages[rightIndex];
}

// display vote count function
function displayVoteCount() {
    results.innerHTML = ' ';
    let h2Elem = document.createElement('h2')
    h2Elem.textContent = 'Goat Likes'
    results.appendChild(h2Elem);
    for (let goat of GoatPictures.allImages) {
        const liElem = document.createElement('li');
        liElem.textContent = `${goat.name}: ${goat.clicks}`
        results.appendChild(liElem)
    }
}



// handle results of a click
function handleClick(event) {
    const clickedTarget = event.target;
    const id = clickedTarget.id;
    // we need a way to compare the left goat and right goat to what we clicked on to mae sure we count the vote
    // if they vote 10 times or less do this
    if (totalClicks < 10) {
        if (id === 'left_goat_img' || id === 'right_goat_img') {
            // increment votes total
            // increment votes for the goat we clicked on
            if (id === 'left_goat_img') {
                leftGoat.clicks++;
            } else {
                rightGoat.clicks++;
            }
            totalClicks++;
            leftGoat.timesShown++;
            rightGoat.timesShown++;
            goatPicker();
            renderGoats();
        }
    }
    if (totalClicks === 10) {
        allGoats.removeEventListener('click', handleClick);
        displayVoteCount();
    }
}

new GoatPictures('Bunny Goat', 'assets/bunny-goat.png');
new GoatPictures('Cool Goat', 'assets/cool-goat.jpeg');
new GoatPictures('Cruisin Goat', 'assets/cruisin-goat.jpeg');
new GoatPictures('Float Your Goat', 'assets/float-your-goat.jpeg');
new GoatPictures('Goat Away', 'assets/goat-away.jpeg');
new GoatPictures('Goat Out of Hand', 'assets/goat-out-of-hand.jpeg');
new GoatPictures('Kissing Goat', 'assets/kissing-goat.jpeg');
new GoatPictures('Sassy Goat', 'assets/sassy-goat.jpeg');
new GoatPictures('Smiling Goat', 'assets/smiling-goat.jpeg');
new GoatPictures('Sweater Goat', 'assets/sweater-goat.jpeg');

// add an event listener
allGoats.addEventListener('click', handleClick);
goatPicker();
renderGoats();














