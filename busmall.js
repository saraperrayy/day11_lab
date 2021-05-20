
// Add a button with the text "View Results", which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. 
// Example: banana had 3 votes, and was seen 5 times.

// global variables
const results = document.getElementById('product-clicks')
const allProducts = document.getElementById('all_products')
const leftProductImg = document.getElementById('left_product_img')
const centerProductImg = document.getElementById('center_product_img') 
const rightProductImg = document.getElementById('right_product_img')
const leftProductPEl = document.getElementById('left_product_p')
const rightProductPEl = document.getElementById('center_product_p')
const centerProductPEl = document.getElementById('right_product_p')


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
    thisimagePath = imagePath;
    this.clicks = 0;
    this.timesShown = 0;

    ProductPictures.allProducts.push(this);
}
// added property to the Product Pictures object that is an array
ProductPictures.allProducts = [];

const renderProducts = function() {
    leftProductImg.src = leftProduct.imagePath;
    centerProductImg.src = centerProduct.imagePath;
    rightProductImg.src = rightProduct.imagePath;
    // add image as text content in a paragraph
    leftProductPEl.textContent = leftProduct.imagePath;
    centerProductPEl.textContent = cennterProduct.imagePath;
    rightProductPEl.textContent = rightProduct.imagePath;
}

// write a function that picks three different products
function productPicker() {
    // function picks three items at random
    let leftIndex = Math.floor(Math.random() * ProductPictures.allProducts.length)
    let centerIndex = Math.floor(Math.random() * ProductPictures.allProducts.length)
    let rightIndex = Math.floor(Math.random() * ProductPictures.allProducts.length)
    // different index number 
    // want the loop to continue so long as any pair of three variables arent equal
    while (rightIndex === leftIndex 
        || rightIndex === centerIndex 
        || centerIndex === leftIndex
        || ProductPictures.lastShown.includes(leftIndex)
        || ProductPictures.lastShown.includes(centerIndex)
        || ProductPictures.lastShown.includes(rightIndex)) {
        
        leftIndex = Math.floor(Math.random() * ProductPictures.allProducts.length);
        centerIndex = Math.floor(Math.random() * ProductPictures.allProducts.length);    
        rightIndex = Math.floor(Math.random() * ProductPictures.allProducts.length);
    }
    leftProduct = ProductPictures.allProducts[leftIndex].timesShown++;
    centerProduct = ProductPictures.allProducts[centerIndex].timesShown++;
    rightProduct = ProductPictures.allProducts[rightIndex].timesShown++;
}

// display vote counts function
function displayVoteCount() {
    results.innerHTML = ' ';
    let h2Elem = document.createElement('h2')
    h2Elem.textContent = 'Product Likes'
    results.appendChild(h2Elem);
    for (let product of ProductPictures.allProducts) {
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
        if (id === 'left_product_img' || id === 'right_product_image' || id === 'center_product_image') {
        // increment votes total
        //increment votes for the product clicked on
            if (id === 'left_product_img') {
                leftProduct.clicks++;
            } else {
                rightProduct.clicks++;
            }
            totalClicks++;
            leftProduct.timesShown++;
            centerProduct.timesShown++;
            rightProduct.timesShown++
            productPicker();
            renderProducts();
        }
    }
    // once user goes through 25 rounds, end loop
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
new ProductPictures('dog Duck','assets/dog-duck.jpeg');
new ProductPictures('dragon','assets/dragon.jpeg');
new ProductPictures('pen','assets/pen.jpeg');
new ProductPictures('pet sweep','assets/pet-sweet.jpeg');
new ProductPictures('Scissors','assets/scissors.jpeg');
new ProductPictures('shark','assets/shark.jpeg');
new ProductPictures('sweep','assets/sweep.jpeg');
new ProductPictures('tauntaun','assets/tauntaun.jpeg');
new ProductPictures('unicorn','assets/unicorn.jpeg');
new ProductPictures('water can','assets/water-can.jpeg');
new ProductPictures('wine glass','assets/wine-glass.jpeg');

allProducts.addEventListener('click', handleClick);
productPicker();
renderProducts();
