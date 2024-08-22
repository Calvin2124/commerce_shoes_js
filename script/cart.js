function addLocaleStorage(){
    const buyButton = document.querySelector('.btnOrange')
    const quantityInput = document.querySelector('#userQuantity')
    const price = document.querySelector('.price')
    const title = document.querySelector('h1')
    console.log(price.innerHTML)
    let imageDefault = `images/image-product-1.jpg`
    buyButton.addEventListener('click', (e) => {
        e.preventDefault()
        const product = {
            "title" : title.innerHTML,
            "img" : imageDefault,
            "quantity" : quantityInput.value,
            "price" : price.innerHTML
        }
        localStorage.setItem("cart", JSON.stringify(product))
        // reload the page
        location.reload()

    })
}

function decrement(){
    const btnDecrement = document.querySelector('#buttonLeft');
    const quantityInput = document.querySelector('#userQuantity');
    btnDecrement.addEventListener('click', (e) => {
        e.preventDefault();

        let currentValue = parseInt(quantityInput.value);
        
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
        
        if (currentValue <= 2) {
            btnDecrement.disabled = true;
        }
    });
}

function increment(){
    const btnIncrement = document.querySelector("#buttonRight")
    const btnDecrement = document.querySelector('#buttonLeft');
    const quantityInput = document.querySelector('#userQuantity')
    btnIncrement.addEventListener('click', (e) => {
        e.preventDefault()
        quantityInput.value = parseInt(quantityInput.value) + 1
        btnDecrement.disabled = false;
    })
}

function calculPrice(a, b){
    return a * b
}

function buyModal(){
    const items = JSON.parse(localStorage.getItem('cart'));
    const btnBuyModal = document.querySelector(".buyModal")
    if (items === null){
        const modalCreate = `
        <dialog id="dialogBuy">
            <div class="headerModal">
                <h2>Cart</h2>
                <hr>
            </div>
            <div class="mainModal">
                <h3 id="emptyTitle">Your cart is empty !</h3>
            </div>
        </dialog>
        `
        btnBuyModal.insertAdjacentHTML('afterend', modalCreate)
        const modalInfo = document.querySelector('#dialogBuy')
        btnBuyModal.addEventListener('click', (e) => {
            e.preventDefault()
            let isOpen = true
            if (isOpen === true){
                modalInfo.showModal()
            } else {
                modalInfo.closest()
            }
        })
    }
    if (items !== null) {
        const modalCreate = `
        <dialog id="dialogBuy">
            <div class="headerModal">
                <h2>Cart</h2>
                <hr>
            </div>
            <div class="mainModal">
                <div class="elementCart">
                    <img src="${items.img}" alt="">
                    <div class="infocart">
                    <h3>${items.title}</h3>
                    <p>${items.price} x ${items.quantity} <span>$${calculPrice(items.price, items.quantity)}</span></p>
                    </div>
                    <a href="#"><img src="images/icon-delete.svg" alt=""></a>
                </div>
                <a href="#" class="btnModalOrange">Checkout</a>
            </div>
        </dialog>
        `
        btnBuyModal.insertAdjacentHTML('afterend', modalCreate)
        const modalInfo = document.querySelector('#dialogBuy')
        btnBuyModal.addEventListener('click', (e) => {
            e.preventDefault()
            let isOpen = true
            if (isOpen === true){
                modalInfo.showModal()
            } else {
                modalInfo.closest()
            }
        })
        deleteItem()
    }
}

function deleteItem(){
    const deletedItem = document.querySelector("#dialogBuy > div.mainModal > div > a > img")
    deletedItem.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('click')
        localStorage.clear('cart')
        //Mettre a jour la modal 
        const modalInfo = document.querySelector('#dialogBuy')
        modalInfo.innerHTML = `
        <div class="headerModal">
            <h2>Cart</h2>
            <hr>
        </div>
        <div class="mainModal">
            <h3 id="emptyTitle">Your cart is empty !</h3>
        </div>
        `
    })
}