/*update product images*/


/*add item to the cart*/


/*remove cart item buttons*/
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
    })
    /*i is the button value*/
}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}


/*functions*/
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


/*changes product detail*/
function changeDetail(event) {
    var buttonClicked = event.target
    if (buttonClicked.value == 'color1') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbcrazyberry.jpg'
        descript.getElementsByClassName('item-color')[0].innerText = 'Crazyberry'
    }
    else if (buttonClicked.value == 'color2' ) {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/catbackp.jpg'
        descript.getElementsByClassName('item-color')[0].innerText = 'Strawberry'
    }
    else if (buttonClicked.value == 'color3') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbblackberry.jpg'
        descript.getElementsByClassName('item-color')[0].innerText = 'Blackberry'
    }
    else if (buttonClicked.value == 'color4') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('shop-item-image')[0].src = 'img/cbfireorange.jpg'
        descript.getElementsByClassName('item-color')[0].innerText = 'Fire Orange'
    }

}

function changeSize(event) {
    var buttonClicked = event.target
    if (buttonClicked.value == 'size1') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('item-size')[0].innerText = 'Tiny'
    }

    else if (buttonClicked.value == 'size2') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('item-size')[0].innerText = 'Small'
    }

    else if (buttonClicked.value == 'size3') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('item-size')[0].innerText = 'Medium'
    }

    else if (buttonClicked.value == 'size4') {
        var descript = buttonClicked.parentElement.parentElement.parentElement.parentElement
        descript.getElementsByClassName('item-size')[0].innerText = 'Large'
    }
}



/* add to cart*/
var numCartItems = 0

function addToCartClicked(event) {
    numCartItems += 1
    var button = event.target
    button.innerText = '+ Add to cart' + ' ' + '(' + numCartItems + ')'
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
}


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