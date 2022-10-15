const cart = document.querySelector(".shop-cart");
const order= document.querySelector("#shoppingCartContainer");
const arrow = document.querySelector(".arrow");
const productDetail = document.querySelector("#productDetail");
const iconProductClose = document.querySelector(".product-detail-close");
const products = document.querySelector(".container-productos");
const orderContent = document.querySelector(".my-order-content");
const totalPrice = document.querySelector(".totalPrice");
const darken = document.querySelector(".darken");
const imageProductDetail = document.querySelector(".imgProductDetail");
const priceProduct = document.querySelector(".priceProductDetail");
const nameProduct = document.querySelector(".nameProductDetail");
const descriptionProduct = document.querySelector(".descriptionProductDetail");



cart.addEventListener("click", () => {
    const isProductDetailOpen = !productDetail.classList.contains("inactive");

    if (isProductDetailOpen) {
        productDetail.classList.add("inactive");
    }

    if (order.classList.contains("inactive")) {
        darken.classList.remove("inactive")
    } else {
        darken.classList.add("inactive")
    }
    order.classList.toggle("inactive");
});

arrow.addEventListener("click", () => {
    darken.classList.add("inactive");
    order.classList.add("inactive");
});

iconProductClose.addEventListener("click", () => {
    darken.classList.toggle("inactive");
    productDetail.classList.toggle("inactive");
});


const productList = [];
const orderList = [];

productList.push({
    id: 1,
    name: "Macbook Air",
    price: 1000,
    image: "./img/macbook.jpeg",
    description: "Macbook Air viene con el intel core i5, con 250gb ssd"
});
orderList.push({
    name: "Macbook Air",
    price: 1000,
    image: "./img/macbook.jpeg"
});

productList.push({
    id: 2,
    name: "Notebook Msi",
    price: 1100,
    image: "./img/compu.jpg",
    description: "Notebook Msi con 500gb ssd, Geforce 2060 super."
});

orderList.push({
    name: "Notebook Msi",
    price: 1100,
    image: "./img/compu.jpg"
});

productList.push({
    id: 3,
    name: "Parlante JBL",
    price: 200,
    image: "./img/JBL.webp",
    description: "Parlante JBL con muy poco uso, en excelente estado, se escucha perfectamente bien."
});
orderList.push({
    name: "Parlante JBL",
    price: 200,
    image: "./img/JBL.webp"
});
    
productList.push({
    id: 4,
    name: "Apple Watch Pro",
    price: 500,
    image: "./img/watch.jpg",
    description: "Apple Watch Pro, viene genial para hacer deporte, es del ano 2019"
});
orderList.push({
    name: "Apple Watch Pro",
    price: 500,
    image: "./img/watch.jpg"
});

productList.push({
    id: 5,
    name: "Mochila Mediana",
    price: 100,
    image: "./img/mochila.jpg",
    description: "Mochila mediana, ideal para el uso escolar"
});

productList.push({
    id: 6,
    name: "Joystick PS5",
    price: 150,
    image: "./img/joystick.webp",
    description: "Joystick PS5 en perfecto estado, con muy pocos meses de uso"
});

productList.push({
    id: 7,
    name: "Auriculares Samsung",
    price: 300,
    image: "./img/auris.jpg",
    description: "Auriculares Samsung del ano 2019, en excelente estado, muy poco uso"
});

productList.push({
    id: 8,
    name: "Camara Profesional",
    price: 1500,
    image: "./img/camara.jpeg",
    description: "Camara Profesional ideal para gente que quiera hacer fotos con una alta definicion"
});

/* 
<div class="container-productos">
    <div class="container-info-product">
        <img class="mac-image" src="../Curso-Javascript/img/macbook.jpeg" alt="">
        <h2 class="title-product">MacBook Air</h2>
        <span>Precio: $1000 Usd</span>
        <a href="#">Agregar</a>
    </div>
</div> 
*/

const renderProducts = (arr) => {
    for (product of arr) {
        imageProductDetail.src = product.image;
        priceProduct.innerText = "$" + product.price;
        nameProduct.innerText = product.name;
        descriptionProduct.innerText = product.description;

        const infoProduct = document.createElement("div");
        infoProduct.classList.add("container-info-product");

        const productImg = document.createElement("img");

        productImg.setAttribute("src", product.image);
        productImg.classList.add("mac-image");
        productImg.addEventListener("click", () => {

            darken.classList.toggle("inactive");
            productDetail.classList.toggle("inactive");
        });
        

        const titleProduct = document.createElement("h2");
        titleProduct.innerText = product.name;
        titleProduct.classList.add("title-product");

        const productPrice = document.createElement("span");
        productPrice.innerText = "$" + product.price;

        const button = document.createElement("button");
        button.innerText = "Agregar";
        button.id = product.id
        
        

        infoProduct.appendChild(productImg);
        infoProduct.appendChild(titleProduct);
        infoProduct.appendChild(productPrice);
        infoProduct.appendChild(button);
        products.appendChild(infoProduct)
        
    }
};

/* 
<figure>
    <img src="./img/auris.jpg" alt="bike">
</figure>
<p>Auris</p>
<p>$30,00</p>
<img src="./icon/icon_close.png" alt="close"></img>
*/



const renderProductsOrder = (arr) => {
    for (product of arr) {
        const shoppingCart = document.createElement("div");
        shoppingCart.classList.add("shopping-cart");

        const figure = document.createElement("figure");

        const imageProduct = document.createElement("img");
        imageProduct.setAttribute("src", product.image);

        const nameProduct = document.createElement("p");
        nameProduct.innerText = product.name;

        const priceProduct = document.createElement("p");
        priceProduct.innerText = "$" + product.price;

        const icon = document.createElement("img");
        icon.src = "./icon/icon_close.png";
        icon.classList.add("iconClose");

        figure.appendChild(imageProduct);
        shoppingCart.appendChild(figure);
        shoppingCart.appendChild(nameProduct);
        shoppingCart.appendChild(priceProduct);
        shoppingCart.appendChild(icon);
        orderContent.appendChild(shoppingCart);

        
    }

};

const renderOrderPrice = (arr) => {
    const sum = arr.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    totalPrice.innerText = "$" + sum;
};

/* 
<div class="product-detail-close">
    <img src="./icon/icon_close.png" alt="close">
</div>
<img src="./img/JBL.webp" alt="bike">
<div class="product-info">
    <p>$35,00</p>
    <p> Parlante JBL</p>
    <p>Parlante JBL con muy poco uso, en excelente estado, se escucha perfectamente bien.</p>
    <button class="primary-button add-to-cart-button">
    <img class="add-cart" src="./icon/bt_add_to_cart.svg" alt="add to cart">
    Add to cart
    </button>
</div> 
*/

// const creatProductDetail = (arr) => {
//     for (product of arr) {
//         // const productDetailAside = document.createElement("aside");
//         // productDetailAside.id = "productDetail";
//         // productDetailAside.classList.add("inactive");

//         const productClose = document.createElement("div");
//         productClose.classList.add("product-detail-close");

//         const iconProductClose = document.createElement("img");
//         iconProductClose.src = "./icon/icon_close.png";

//         productClose.appendChild(iconProductClose);

//         const imgProductDetail = document.createElement("img");
//         imgProductDetail.src = product.image;
//         // imgProductDetail.addEventListener("click", () => {

//         //     darken.classList.toggle("inactive");
//         //     productDetail.classList.toggle("inactive");
//         // });

//         const productDetailInfo = document.createElement("div");
//         productDetailInfo.classList.add("product-info");

//         const priceProduct = document.createElement("p");
//         priceProduct.innerText = "$" + product.price;

//         const nameProduct = document.createElement("p");
//         nameProduct.innerText = product.name;

//         const descriptionProduct = document.createElement("p");
//         descriptionProduct.innerText = product.description;

//         const buttonProduct = document.createElement("button");
//         buttonProduct.classList.add("primary-button");
//         buttonProduct.innerText = "Add to cart";

//         const imgCartProduct = document.createElement("img");
//         imgCartProduct.classList.add("add-cart");
//         imgCartProduct.src = "./icon/bt_add_to_cart.svg";

//         buttonProduct.appendChild(imgCartProduct);
//         productDetailInfo.appendChild(priceProduct);
//         productDetailInfo.appendChild(nameProduct);
//         productDetailInfo.appendChild(descriptionProduct);
//         productDetailInfo.appendChild(buttonProduct);
//         productDetail.appendChild(productClose);
//         productDetail.appendChild(imgProductDetail);
//         productDetail.appendChild(productDetailInfo);


//     }
    
// };


renderProducts(productList);
renderProductsOrder(orderList);
renderOrderPrice(orderList);
// creatProductDetail(productList);
