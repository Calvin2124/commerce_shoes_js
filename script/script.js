/**
 * Array containing paths to product image thumbnails.
 * @type {string[]}
 */
const secondImages = [
    "images/image-product-1-thumbnail.jpg",
    "images/image-product-2-thumbnail.jpg",
    "images/image-product-3-thumbnail.jpg",
    "images/image-product-4-thumbnail.jpg"
];


function init(){
    chargeImage(secondImages)
    switchImg()
    addLocaleStorage()
    decrement()
    increment()
    buyModal()
    openModalImg()
}
init()

/**
 * Function that loads images and appends them to the DOM.
 */
function switchImg() {
    const articleShoes = document.querySelector('#shoes')
    let count = 1
    let imageDefault = `images/image-product-${count}.jpg`
    let baliseImg = `
    <a href="#"><img class="mainImg" src="${imageDefault}" alt=""></a>
    `
    articleShoes.insertAdjacentHTML('afterbegin', baliseImg)

    //Add border in first img
    const imageBorderDefault = document.querySelector("#choiceShoes figure img")
    imageBorderDefault.classList.add("focusImg")

    const imageThumbnails = document.querySelectorAll("#choiceShoes figure img");
    imageThumbnails.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.preventDefault()
            imageThumbnails.forEach(imageThumbnail => {
                imageThumbnail.classList.remove('focusImg')
            });
            count = img.dataset.index
            img.classList.add('focusImg')
            const imageChange = document.querySelector(".mainImg")
            let imagePath = `images/image-product-${count}.jpg`
            imageChange.src = imagePath
        });
    });
}
/**
 * Function that loads images and appends them to the DOM.
 * 
 * @param {Array.<string>} secondImages - Array of image paths to load.
 */
function chargeImage(secondImages){
    secondImages.forEach((el, index) => {
        const choiceShoes = document.querySelector("#choiceShoes");
        choiceShoes.insertAdjacentHTML('beforeend', 
        `
        <figure><img src="${el}" data-index=${index + 1} alt=""></figure>
        `
        )
    });
}

function openModalImg() {
    const mainImg = document.querySelector('.mainImg');
    mainImg.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = `
        <dialog id="dialogImg">
            <div id="headerModal"><img id="closeImg" src="images/icon-close.svg" alt=""></div>
            <div>
                <img class="previous" src="images/icon-previous.svg" alt="">
                <img id="modalImgPrimary" src="${mainImg.src}" alt="">
                <img class="next" src="images/icon-next.svg" alt="">
            </div>
        </dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
        const dialogImg = document.querySelector('#dialogImg');
        dialogImg.showModal();
        closeModal();
        addSecondaryImage();
        switchImgModal();
        switchFocusImg(); 
        previousImg();
        nextImg();
    });
}

function addSecondaryImage() {
    const dialogImg = document.querySelector('#dialogImg');
    
    // Vérifiez si #secondaryChoice existe déjà
    let divSecondary = dialogImg.querySelector('#secondaryChoice');
    if (!divSecondary) {
        dialogImg.insertAdjacentHTML('beforeend', `
        <div id="secondaryChoice"></div>
        `);
        divSecondary = dialogImg.querySelector('#secondaryChoice');
    }

    // Vider les images secondaires avant d'en ajouter de nouvelles
    const existingFigures = divSecondary.querySelectorAll('figure');
    existingFigures.forEach(fig => fig.remove());
    
    secondImages.forEach((el, index) => {
        divSecondary.insertAdjacentHTML('beforeend', 
        `
        <figure><img src="${el}" data-index=${index + 1} alt=""></figure>
        `
        );
    });
}

function closeModal() {
    const closeImg = document.querySelector('#closeImg');
    closeImg.addEventListener('click', (e) => {
        e.preventDefault();
        const dialogImg = document.querySelector('#dialogImg');
        dialogImg.close();
        // Retirer la modal du DOM une fois fermée
        dialogImg.remove();
    });
}



//function qui au clique met dans l'url de l'image principal de la modale l'index de l'image cliqué dans les secondary image 
function switchImgModal(){
    const secondaryImg = document.querySelectorAll('#secondaryChoice figure img');
    secondaryImg.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            const mainImg = document.querySelector('#modalImgPrimary');
            let index = img.dataset.index;
            mainImg.src = `images/image-product-${index}.jpg`;
        });
    });
}

//function au clique des figure dans la modal par défaut la une doit avoir la classe focusImg et au clique supprimer la classe active et mettre la classe sur la figure cliqué 
function switchFocusImg(){
    const firstImg = document.querySelector('#secondaryChoice figure img');
    firstImg.classList.add('focusImg');
    const secondaryImg = document.querySelectorAll('#secondaryChoice figure img');
    secondaryImg.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            secondaryImg.forEach(imageThumbnail => {
                imageThumbnail.classList.remove('focusImg');
            });
            img.classList.add('focusImg');
        });
    });
}

function previousImg(){
    const previous = document.querySelector('.previous');
    previous.addEventListener('click', (e) => {
        e.preventDefault();
        const mainImg = document.querySelector('#modalImgPrimary');
        let index = mainImg.src.slice(-5, -4);
        if (index == 1){
            index = 5;
        }
        index--;
        mainImg.src = `images/image-product-${index}.jpg`;
        const secondaryImg = document.querySelectorAll('#secondaryChoice figure img');
        secondaryImg.forEach(imageThumbnail => {
            imageThumbnail.classList.remove('focusImg');
        });
        secondaryImg[index - 1].classList.add('focusImg');
    });
}

function nextImg(){
    const next = document.querySelector('.next');
    next.addEventListener('click', (e) => {
        e.preventDefault();
        const mainImg = document.querySelector('#modalImgPrimary');
        let index = mainImg.src.slice(-5, -4);
        if (index == 4){
            index = 0;
        }
        index++;
        mainImg.src = `images/image-product-${index}.jpg`;
        const secondaryImg = document.querySelectorAll('#secondaryChoice figure img');
        secondaryImg.forEach(imageThumbnail => {
            imageThumbnail.classList.remove('focusImg');
        });
        secondaryImg[index - 1].classList.add('focusImg');
    });
}