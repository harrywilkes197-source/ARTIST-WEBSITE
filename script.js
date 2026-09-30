const cart = [];
const drawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function openCart(){
  drawer.classList.add("open");
  overlay.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
}
function closeCart(){
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
}
document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.querySelectorAll(".add").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const product = btn.closest(".product");
    cart.push({name:product.dataset.name, price:Number(product.dataset.price)});
    renderCart();
    openCart();
  });
});

function renderCart(){
  cartCount.textContent = cart.length;
  if(!cart.length){
    cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartTotal.textContent = "£0";
    return;
  }
  cartItems.innerHTML = cart.map((item,i)=>`
    <div class="cart-line">
      <span>${item.name}<br>£${item.price}</span>
      <button onclick="removeItem(${i})">REMOVE</button>
    </div>`).join("");
  cartTotal.textContent = "£" + cart.reduce((sum,item)=>sum+item.price,0);
}
function removeItem(index){
  cart.splice(index,1);
  renderCart();
}
document.getElementById("checkout").addEventListener("click",()=>{
  alert("Checkout will be connected to a payment provider in the next stage.");
});
