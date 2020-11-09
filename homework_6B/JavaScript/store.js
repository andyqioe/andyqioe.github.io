/*remove cart item buttons*/
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeItem)
    /*i is the button value*/
}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}


/*functions*/

function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

var changeColorButton = document.getElementsByClassName('style')
for (var i = 0; i < changeColorButton.length; i++) {
    var button = changeColorButton[i]
    var color = button.parentElement
    button.addEventListener('click', changeDetail)
}

var changeSizeButton = document.getElementsByClassName('sizing')
for (var i = 0; i < changeSizeButton.length; i++) {
    var button = changeSizeButton[i]
    var color = button.parentElement
    button.addEventListener('click', changeSize)
}


/* product dictionary */
let products = [
    {
        name: 'Cat Backpack',
        id: 'catbackpack',
        tag: 'catbackpack',
        color: 'crazyberry',
        size: 'tiny',
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
    }
    else if (buttonClicked.value == 'color2' ) {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/catbackp.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Strawberry';
        products[0].color = 'strawberry';
    }
    else if (buttonClicked.value == 'color3') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbblackberry.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Blackberry';
        products[0].color = 'blackberry';
    }
    else if (buttonClicked.value == 'color4') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement;
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbfireorange.jpg';
        descript.getElementsByClassName('item-color')[0].innerText = 'Fire Orange';
        products[0].color = 'fireorange';
    }

}

function changeSize(event) {
    var buttonClicked = event.target
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
                break;
            }
            else if (products[j].color == 'strawberry') {
                cartNumbers(products[j]);
                break;
            }
            else if (products[j].color == 'blackberry') {
                cartNumbers(products[j]);
                break;
            }
            else if (products[j].color == 'fireorange') {
                cartNumbers(products[j]);
                break;
            }
        }
        
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.add-cart span').textContent = '(' + productNumbers + ')'
        document.querySelector('.navbar span').textContent = '(' + productNumbers + ')'
    }
}

function cartNumbers(product) {
    console.log(product);
    let productNumbers = localStorage.getItem('cartNumbers');

    /* parses string and converts it into integer */
    productNumbers = parseInt(productNumbers);

    /* checks if item has already been clicked */
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.add-cart span').textContent = '(' + (productNumbers + 1) + ')'
        document.querySelector('.navbar span').textContent = '(' + (productNumbers + 1) + ')'
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.add-cart span').textContent = '(' + '1' + ')'
        document.querySelector('.navbar span').textContent = '(' + '1' + ')'
    }
}


var numCartItems = 0

function addToCartClicked(event) {

    /* addItemToCart(title, price, image) */
}

/*
function addItemToCart(title, price, image) {
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('shoppingbag')[0]
    cartItems.append(cartRow)
}
*/

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-item')
    var cartRows = document.getElementsByClassName('item2')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        console.log(total)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total
}

onLoadCartNumbers();