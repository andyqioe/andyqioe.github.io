/*remove cart item buttons*/
var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeItem);
    /*i is the button value*/
}

var addToCartButtons = document.getElementsByClassName('shop-item-button');
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
}

var ClearCartButton = document.getElementsByClassName('shop-item-button2');
for (var i = 0; i < ClearCartButton.length; i++) {
    var button = ClearCartButton[i];
    button.addEventListener('click', clearCart);
}

/*functions*/

//clears local storage and cart
function clearCart() {
    localStorage.setItem('cartNumbers', 0);
    document.querySelector('.add-cart span').textContent = '(' + 0 + ')';
    document.querySelector('.navbar span').textContent = '(' + 0 + ')';
    localStorage.clear()
}

function removeItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="item2">
            <img src="img/catbackp.png" alt="cat backpack">
            <div class="cart-item">
              <h1 class="item-name">
                Cat Backpack
              </h1>              
              <div class="item-color">
                <b>
                  Crazyberry
                </b>
              </div>
              <div class="item-size">
                Tiny
              </div>
              <p class="item-price">$24.99</p>
                <u>
                  <a href="product_description.html">
                    go back
                  </a>
                </u>
              <div class="cart-price">
                <p>
                  Price:
                  <b>$24.99</b>
                </p>
              </div>
            </div>
            <div class="cart-item">
              <h1>Quantity</h1>
              <div class="quantity">
                <div class="custom-select" style="width:200px;">
                    <input class="cart-quantity-input" type="number" min="1" max="20" value="1">
                </div>
              </div>
              <button class="btn btn-danger delete-item" type="button">
                REMOVE
              </button>
              <div class="cart-total">
                <strong class="cart-total-title">
                  Total
                </strong>
                <span class="cart-total-price">
                  $24.99
                </span>
              </div>
            </div>
          </div>
            
            `
        })
    }
}



var changeColorButton = document.getElementsByClassName('style');
for (var i = 0; i < changeColorButton.length; i++) {
    var button = changeColorButton[i];
    var color = button.parentElement;
    button.addEventListener('click', changeDetail);
}

var changeSizeButton = document.getElementsByClassName('sizing');
for (var i = 0; i < changeSizeButton.length; i++) {
    var button = changeSizeButton[i];
    var color = button.parentElement;
    button.addEventListener('click', changeSize);
}

//reads local storage and adds to current cart


/* product dictionary */
let products = [
    {
        name: 'Cat Backpack',
        id: 'catbackpack',
        tag: 'catbackpack',
        color: 'crazyberry',
        size: 'tiny',
        img: 'img/cbcrazyberry.jpg',
        price: 25,
        inCart: 0
    }
]

/*changes product detail*/
function changeDetail(event) {
    var buttonClicked = event.target;
    if (buttonClicked.value == 'color1') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbcrazyberry.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Crazyberry';
        products[0].color = 'crazyberry';
        products[0].img = 'img/cbcrazyberry.jpg';
    }
    else if (buttonClicked.value == 'color2' ) {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/catbackp.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Strawberry';
        products[0].color = 'strawberry';
        products[0].img = 'img/catbackp.jpg';
    }

    else if (buttonClicked.value == 'color3') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbblackberry.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Blackberry';
        products[0].color = 'blackberry';
        products[0].img = 'img/cbblackberry.jpg';
    }
    else if (buttonClicked.value == 'color4') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbfireorange.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Fire Orange';
        products[0].color = 'fireorange';
        products[0].img = 'img/cbfireorange.jpg';
    }

}

function changeSize(event) {
    var buttonClicked = event.target;
    if (buttonClicked.value == 'size1') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('item-size')[0].innerText = 'Tiny';
        products[0].size = 'tiny';
    }

    else if (buttonClicked.value == 'size2') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('item-size')[0].innerText = 'Small';
        products[0].size = 'small';
    }

    else if (buttonClicked.value == 'size3') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('item-size')[0].innerText = 'Medium';
        products[0].size = 'medium';
    }

    else if (buttonClicked.value == 'size4') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('item-size')[0].innerText = 'Large';
        products[0].size = 'large';
    }
}



/* add to shopping cart
1) when click "add to cart", add item and its description to shopping_cart.html
2) components include style, color, and quantity
3) price and total should be calculated individually
*/

let carts = document.querySelectorAll('.add-cart');

/*grabs individual carts*/
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', function(event) {
        for (let j = 0; j < products.length; j++) {
            if (products[j].color == 'crazyberry') {
                cartNumbers(products[j]);
                console.log("a")
                break;
            }
            else if (products[j].color == 'strawberry') {
                cartNumbers(products[j]);
                console.log("b")
                break;
            }
            else if (products[j].color == 'blackberry') {
                cartNumbers(products[j]);
                console.log("c")
                break;
            }
            else if (products[j].color == 'fireorange') {
                cartNumbers(products[j]);
                console.log("d")
                break;
            }
        }
        
    })
}

/*updates page based on current local storage*/
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.navbar span').textContent = '(' + productNumbers + ')';
        document.querySelector('.add-cart span').textContent = '(' + productNumbers + ')';
    }
}

/*updates cart */
function cartNumbers(product) {
    console.log(product);
    let productNumbers = localStorage.getItem('cartNumbers');

    /* parses string and converts it into integer */
    productNumbers = parseInt(productNumbers);

    /* checks if item has already been clicked */
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.add-cart span').textContent = '(' + (productNumbers + 1) + ')';
        document.querySelector('.navbar span').textContent = '(' + (productNumbers + 1) + ')';
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.add-cart span').textContent = '(' + '1' + ')';
        document.querySelector('.navbar span').textContent = '(' + '1' + ')';
    }
    setItems(product);
}

/*sets item on local storage*/
function setItems(product) {
    console.log(product);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }   
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function addToCartClicked(event) {

    var title = document.getElementsByClassName('item-name')[0].innerText;
    var price = document.getElementsByClassName('item-price')[0].innerText;
    var color = document.getElementsByClassName('item-color')[0].innerText;
    var size = document.getElementsByClassName('item-size')[0].innerText;
    var image = document.getElementsByClassName('shop-item-image')[0].src;
    localStorage.setItem("name", title)
    localStorage.setItem("price", price)
    localStorage.setItem("img", image)
    localStorage.setItem("color", color)
    localStorage.setItem("size", size)
    // addItemToCart(title, price, image)
}


// function addItemToCart(title, price, image) {
//     emptyDictionary.name = title;
//     emptyDictionary.price = price;
//     emptyDictionary.img = image;
//     console.log(emptyDictionary)
//     products.appendChild(emptyDictionary)
// }

/* creates number of product listings based on items in product list*/

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-item');
    var cartRows = document.getElementsByClassName('item2');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        console.log(total);
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total;
}

onLoadCartNumbers();
displayCart();