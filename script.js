const products = [
    {
        id:0,
        img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/92dd96ba-7653-4f93-86bf-01e41c7490eb/zoom-vomero-5-shoes-KxjTbk.png",
        name:"Nike Zoom Vomero 5",
        tag:"Men's Shoes",
        color:"1 Color",
        price:14000
    },
    {
        id:1,
        img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/esrwotnfykyc1qthd8wi/vomero-5-shoes-qZG4RJ.png",
        name:"Nike Vomero 5",
        tag:"Men's Shoes",
        color:"3 Colors",
        price:16000
    },
    {
        id:2,
        img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f7065c34-5e45-45ac-9ca6-a9eba20581ca/air-max-1-shoes-ZtQfN3.png",
        name:"Nike Air Max 1",
        tag:"Men's Shoes",
        color:"1 Color",
        price:12500
    },
    {
        id:3,
        img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/556bd06c-cbff-40a3-abf9-5c20d2ce8aae/air-max-solo-shoes-D0Mfh7.png",
        name:"Nike Air Max Solo",
        tag:"Women's Shoes",
        color:"4 Colors",
        price:8000
    },
    {
        id:4,
        img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99ce612e-38c3-483c-bc68-4e00291bbcdd/e-series-ad-shoes-3jT3pp.png",
        name:"Nike E Series AD",
        tag:"Women's Shoes",
        color:"5 Colors",
        price:6500
    },
    {
        id:5,
        img:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a721bbfd-d244-42de-b061-b2c8d334296d/mercurial-superfly-9-elite-football-boot-NqTzZv.png",
        name:"Nike Mercurial Superfly 9 Elite",
        tag:"Firm-Ground Football Boot",
        color:"1 Color",
        price:25000
    },
]

const itemContainer = document.querySelector(".items-container")

function renderProducts(){
    products.forEach((item)=>{
        itemContainer.innerHTML += `
        <div class="item">
            <div class="imgBox flex">
                <img src=${item.img} alt="">
            </div>
            <div class="item-c flex">
                <div class="content">
                    <p>${item.name}</p>
                    <p class="ltxt">${item.tag}</p>
                    <p class="ltxt">${item.color}</p>
                    <p>MRP : ₹ ${item.price}</p>
                </div>
                <button id="addToCart" onclick = "addToCart(${item.id})"><i class="fa-brands fa-opencart"></i></button>
            </div>
        </div>
        `
    })
}

renderProducts();
let cartArr = [];

function addToCart(id){
    let qty = 1;
    if(cartArr.some((item)=> item.id === id)){
        alert("item already added")
    }else{
        products.map((item)=>{
            if(item.id === id){
                cartArr.push({
                    ...item,
                    qty,
                });
            }
        })
    }
    
    updateCart();
}

function updateCart(){
    renderCart();
    setTotal();
}

const total = document.getElementById('total');
const tCart = document.getElementById('tcart');

function setTotal(){
    let totalAmount =0;
    let totalCartItems = cartArr.length;
    cartArr.forEach((item)=>{
        totalAmount+=item.price * item.qty;
    })
    tCart.textContent = totalCartItems;
    total.innerHTML = `<p id="total">Total : ₹ ${totalAmount}</p>`
}

const cartItems = document.querySelector(".cart-items")
if(cartArr.length <=0){
    cartItems.innerHTML = `<p>Your Cart is empty.</p>`
}
function renderCart(){
    cartItems.innerHTML =""
    cartArr.forEach((item)=>{
        cartItems.innerHTML += `
        <div class="cart-item flex">
            <img src=${item.img} alt="" class="cImg">
            <div class="c-details">
                <p>${item.name}</p>
                <p class="ltxt">${item.tag}</p>
                <p class="ltxt">${item.color}</p>
                <p>MRP : ₹ ${item.price}</p>
            </div>
            <div class="c-btns flex">
                <select name="qty" id="qty" onChange = "changeQty(${item.id})">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button id="delete"><i class="fa-solid fa-trash" onclick = "remove(${item.id})"></i></button>
            </div>
        </div>
        `
    })
}
function remove(id){
    cartArr = cartArr.filter((item) => item.id !== id);
    updateCart();
}
function changeQty(id){
    cartArr = cartArr.map((item)=>{
        let qty = item.qty;
        if(item.id === id){
            qty = Number(document.getElementById("qty").value)
        }
        return {
            ...item,
            qty,
        }
    })
    updateCart();
}
const cart = document.querySelector(".cart")
const cartShow = document.getElementById("cart")
const cancel = document.getElementById("cancel")

cartShow.addEventListener("click", ()=>{
    cart.classList.add("active")
})
cancel.addEventListener("click", ()=>{
    cart.classList.remove("active")
})