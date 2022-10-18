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
const countCart = document.querySelector(".count-cart");

darken.addEventListener("click", () => {
    darken.classList.add("inactive");
    productDetail.classList.add("inactive");
    order.classList.add("inactive");
})

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

const orderList = [];

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

productList.forEach((product) => {
    
        const infoProduct = document.createElement("div");
        infoProduct.classList.add("container-info-product");

        const productImg = document.createElement("img");

        productImg.setAttribute("src", product.image);
        productImg.classList.add("mac-image");
        productImg.addEventListener("click", () => {
            imageProductDetail.src = product.image;
            priceProduct.innerText = "$" + product.price;
            nameProduct.innerText = product.name;
            descriptionProduct.innerText = product.description;

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

        button.addEventListener("click", () => {
            const agregarCarrito = (prodId) => {
                const item = productList.find((prod) => prod.id === prodId)
                orderList.push(item)
                uploadCart()
            }
            agregarCarrito(product.id)
        })
        

        infoProduct.appendChild(productImg);
        infoProduct.appendChild(titleProduct);
        infoProduct.appendChild(productPrice);
        infoProduct.appendChild(button);
        products.appendChild(infoProduct)
        
});

/* 
<figure>
    <img src="./img/auris.jpg" alt="bike">
</figure>
<p>Auris</p>
<p>$30,00</p>
<img src="./icon/icon_close.png" alt="close"></img>
*/

const uploadCart = () => {
    orderContent.innerHTML = "";

    orderList.forEach((product) => {
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
        icon.addEventListener("click", () => {
            const sacarCarrito = (prodId) => {
                const item = productList.find((prod) => prod.id === prodId)
                const indice = orderList.indexOf(item)
                orderList.splice(indice,1)
                uploadCart()
                renderOrderPrice(orderList)
            }
            sacarCarrito(product.id)
        })
        
        countCart.innerText = orderList.length

        figure.appendChild(imageProduct);
        shoppingCart.appendChild(figure);
        shoppingCart.appendChild(nameProduct);
        shoppingCart.appendChild(priceProduct);
        shoppingCart.appendChild(icon);
        orderContent.appendChild(shoppingCart);
        renderOrderPrice(orderList)


});
}

const renderOrderPrice = (arr) => {
    const sum = arr.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    totalPrice.innerText = "$" + sum;
    countCart.innerText = orderList.length
};





