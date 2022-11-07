const cart = document.querySelector(".shop-cart");
const order= document.querySelector("#shoppingCartContainer");
const arrow = document.querySelector(".arrow");
const productDetail = document.querySelector("#productDetail");
const iconProductClose = document.querySelector(".product-detail-close");
const productsContainer = document.querySelector(".container-productos");
const orderContent = document.querySelector(".my-order-content");
const totalPrice = document.querySelector(".totalPrice");
const darken = document.querySelector(".darken");
const imageProductDetail = document.querySelector(".imgProductDetail");
const priceProduct = document.querySelector(".priceProductDetail");
const nameProduct = document.querySelector(".nameProductDetail");
const descriptionProduct = document.querySelector(".descriptionProductDetail");
const countCart = document.querySelector(".count-cart");
const deleteCart = document.querySelector(".delete-cart");
const proceedToPay = document.querySelector("#button-pay");

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

let orderList = [];


document.addEventListener("DOMContentLoaded", () => {
    orderList = JSON.parse(localStorage.getItem("cart")) || []
    uploadCart()
})
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
let productosList = []

async function getProducts() {
    const { data } = await api('v1/products?offset=5&limit=20');

    const products = data;
    // Agrego cant a la lista de los productos de la api
    products.forEach((product) => {
        productosList.push({cant:1, id: product.id, price: product.price, description: product.description, title: product.title, images: product.images})

});

productosList.forEach((product) => {
    
    const infoProduct = document.createElement("div");
    infoProduct.classList.add("container-info-product");

    const productImg = document.createElement("img");

    productImg.setAttribute("src", product.images[1]);
    productImg.classList.add("mac-image");
    productImg.addEventListener("click", () => {
        imageProductDetail.src = product.images[1];
        priceProduct.innerText = "$" + product.price;
        nameProduct.innerText = product.title;
        descriptionProduct.innerText = product.description;

        darken.classList.toggle("inactive");
        productDetail.classList.toggle("inactive");
    });
    

    const titleProduct = document.createElement("h2");
    titleProduct.innerText = product.title;
    titleProduct.classList.add("title-product");

    const productPrice = document.createElement("span");
    productPrice.innerText = "$" + product.price;

    const button = document.createElement("button");
    button.innerText = "Agregar";
    button.id = product.id
    
    button.addEventListener("click", () => {
        const aux = product.price;
        const agregarCarrito = (prodId) => {
            const existe = orderList.some(prod => prod.id === prodId)
            if (existe) {
                const produ = orderList.map(prod => {
                    if (prod.id === prodId) {
                        prod.cant++
                        
                    }
                })
            } else {
                const item = productosList.find((prod) => prod.id === prodId)
                orderList.push(item)    
            }
            
        }
        
        agregarCarrito(product.id)
        uploadCart()
        guardarStorage()
        
        
    })
    
    infoProduct.appendChild(productImg);
    infoProduct.appendChild(titleProduct);
    infoProduct.appendChild(productPrice);
    infoProduct.appendChild(button);
    productsContainer.appendChild(infoProduct)
});
    
}
getProducts()


/* 
<figure>
    <img src="./img/auris.jpg" alt="bike">
</figure>
<p>Auris</p>
<p>Cantidad:</p>
<p>$30,00</p>
<img src="./icon/icon_close.png" alt="close"></img>
*/

function uploadCart() {
    orderContent.innerHTML = "";

    orderList.forEach((product) => {
        
        const shoppingCart = document.createElement("div");
        shoppingCart.classList.add("shopping-cart");

        const figure = document.createElement("figure");

        const imageProduct = document.createElement("img");
        imageProduct.setAttribute("src", product.images[1]);

        const nameProduct = document.createElement("p");
        nameProduct.innerText = product.title;

        const cantProduct = document.createElement("p");
        cantProduct.innerText = "Cantidad:" + product.cant

        const priceProduct = document.createElement("p");
        priceProduct.innerText = "$" + product.price;

        const icon = document.createElement("img");
        icon.src = "./icon/icon_close.png";
        icon.classList.add("iconClose");
        icon.addEventListener("click", () => {
            const sacarCarrito = (prodId) => {
                const item = orderList.find((prod) => prod.id === prodId)
                const indice = orderList.indexOf(item)
                orderList.splice(indice,1)
                uploadCart()
                renderOrderPrice(orderList)
                
            }
            product.cant = 1;
            sacarCarrito(product.id)
            sacarStorage(product.id)
            
        })

        deleteCart.addEventListener("click", () => {
            orderList = []
            uploadCart()
            renderOrderPrice()
            product.cant = 1
            localStorage.clear()
        })
        
        countCart.innerText = orderList.length

        figure.appendChild(imageProduct);
        shoppingCart.appendChild(figure);
        shoppingCart.appendChild(nameProduct);
        shoppingCart.appendChild(priceProduct);
        shoppingCart.appendChild(cantProduct);
        shoppingCart.appendChild(icon);
        orderContent.appendChild(shoppingCart);
        renderOrderPrice(orderList)

});

}


const renderOrderPrice = (arr) => {
    totalPrice.innerText = "$" + orderList.reduce((acc,prod) => acc + prod.cant * prod.price, 0);
    countCart.innerText = orderList.length
    
};

function guardarStorage() {
    localStorage.setItem("cart", JSON.stringify(orderList))
    console.log(localStorage)
}

function sacarStorage(prodId) {
    const local = localStorage.getItem("cart", JSON.stringify(orderList))
    let localArray = JSON.parse(local)
    let filtrados = localArray.filter((prod) => prod.id != prodId)
    localArray = filtrados
    localStorage.setItem("cart", JSON.stringify(localArray))
}



