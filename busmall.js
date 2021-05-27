'use strict'

// Add a button with the text "View Results", which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. 
// Example: banana had 3 votes, and was seen 5 times.

// global variables
const results = document.getElementById('product-clicks')
const allProducts = document.getElementById('all_products')
const leftProductImg = document.getElementById('left_product_img')
const centerProductImg = document.getElementById('center_product_img')
const rightProductImg = document.getElementById('right_product_img')
const leftProductPEl = document.getElementById('left_product_p')
const rightProductPEl = document.getElementById('right_product_p')
const centerProductPEl = document.getElementById('center_product_p')

let totalClicks = 0;

let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

// Create a constructor function that creates an object associated with each product, and has the following properties
// 1. Name of the product
// 2. File path of image
// 3. Times the image has been shown

const ProductPictures = function(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.clicks = 0;
    this.timesShown = 0;

    ProductPictures.allImages.push(this);
}
// added property to the Product Pictures object that is an array
ProductPictures.allImages = [];

const renderProducts = function() {
    leftProductImg.src = leftProduct.imagePath;
    centerProductImg.src = centerProduct.imagePath;
    rightProductImg.src = rightProduct.imagePath;
    // add image as text content in a paragraph
    leftProductPEl.textContent = leftProduct.name;
    centerProductPEl.textContent = centerProduct.name;
    rightProductPEl.textContent = rightProduct.name;
}

// write a function that picks three different products
function productPicker() {
    // function picks three items at random
    let leftIndex = Math.floor(Math.random() * ProductPictures.allImages.length)
    let centerIndex = Math.floor(Math.random() * ProductPictures.allImages.length)
    let rightIndex = Math.floor(Math.random() * ProductPictures.allImages.length)
    // // different index number 
    // want the loop to continue so long as any pair of three variables arent equal
    while (rightIndex === leftIndex || rightIndex === centerIndex || centerIndex === leftIndex) {
        rightIndex = Math.floor(Math.random() * ProductPictures.allImages.length);
        }
    leftProduct = ProductPictures.allImages[leftIndex];
    centerProduct = ProductPictures.allImages[centerIndex];
    rightProduct = ProductPictures.allImages[rightIndex];
}

    // ProductPictures.lastShown[0] = leftIndex;
    // ProductPictures.lastShown[1] = centerIndex;
    // ProductPictures.lastShown[2] = rightIndex;


// display vote counts function
function displayVoteCount() {
    results.innerHTML = ' ';
    let h2Elem = document.createElement('h2')
    h2Elem.textContent = 'Product Likes'
    results.appendChild(h2Elem);
    for (let product of ProductPictures.allImages) {
        const liElem = document.createElement('li');
        liElem.textContent = `${product.name}: ${product.clicks}`
        results.appendChild(liElem)
    }
}

// As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
// 1. By default, the user should be presented with 25 rounds of voting before ending the session.
// 2. Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

// handle results of a click
function handleClick(event) {
    const clickedTarget = event.target;
    const id = clickedTarget.id;
    // compare left and right product to what was clicked on
    // if users vote 25 times or less, do this:
    if (totalClicks < 25) {
        // if (id === 'left_product_img' || id === 'right_product_img' || id === 'center_product_img') {
        // increment votes total
        //increment votes for the product clicked on
            if (id === 'left_product_img') {
                leftProduct.clicks++;
                // code executed if first left product image condition is false & right product image condition is true 
            } else if (id === 'right_product_img') {
                rightProduct.clicks++;
            } else {
                centerProduct.clicks++;
            }
            totalClicks++;
            leftProduct.timesShown++;
            centerProduct.timesShown++;
            rightProduct.timesShown++;
            productPicker();
            renderProducts();
        }
    
    // once user goes through 25 rounds, end event
    if (totalClicks === 25) {
        allProducts.removeEventListener('click', handleClick);
        displayVoteCount();
    }
}    

new ProductPictures('bag','assets/bag.jpeg');
new ProductPictures('banana','assets/banana.jpeg');
new ProductPictures('bathroom','assets/bathroom.jpeg');
new ProductPictures('boots','assets/boots.jpeg');
new ProductPictures('breakfast','assets/breakfast.jpeg');
new ProductPictures('bubblegum','assets/bubblegum.jpeg');
new ProductPictures('chair','assets/chair.jpeg');
new ProductPictures('cthulhu','assets/cthulhu.jpeg');
new ProductPictures('dog duck','assets/dog-duck.jpeg');
new ProductPictures('dragon','assets/dragon.jpeg');
new ProductPictures('pen','assets/pen.jpeg');
new ProductPictures('pet sweep','assets/pet-sweep.jpeg');
new ProductPictures('scissors','assets/scissors.jpeg');
new ProductPictures('shark','assets/shark.jpeg');
new ProductPictures('sweep','assets/sweep.png');
new ProductPictures('tauntaun','assets/tauntaun.jpeg');
new ProductPictures('unicorn','assets/unicorn.jpeg');
new ProductPictures('water can','assets/water-can.jpeg');
new ProductPictures('wine glass','assets/wine-glass.jpeg');

// add the event listener
allProducts.addEventListener('click', handleClick);
productPicker();
renderProducts();
