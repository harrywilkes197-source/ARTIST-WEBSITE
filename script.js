const products={
 hoodie:{name:"ARTIST Hoodie",label:"Hoodie",black:"black-hoodie.jpeg",white:"white-hoodie.jpeg",price:95,detail:"black-hoodie.jpeg"},
 jacket:{name:"Windbreaker Jacket",label:"Jacket",black:"black-windbreaker.jpeg",white:"white-windbreaker.jpeg",price:125,detail:"black-windbreaker.jpeg"},
 joggers:{name:"ARTIST Joggers",label:"Joggers",black:"black-joggers.jpeg",white:"white-joggers.jpeg",price:73,detail:"black-joggers.jpeg"},
 set:{name:"ARTIST Set",label:"Set",black:"black-hoodie.jpeg",white:"white-hoodie.jpeg",price:152,detail:"black-hoodie.jpeg"}
};
let state={category:"hoodie",colour:"black",size:"XL",cart:[]};
const $=s=>document.querySelector(s);
const productView=$("#productView");

function render(){
 const p=products[state.category];
 document.querySelectorAll(".category-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.category===state.category));
 document.querySelectorAll(".colour-toggle button").forEach(b=>b.classList.toggle("active",b.dataset.colour===state.colour));
 let img=state.category==="set" ? p.black : p[state.colour];
 productView.innerHTML=`
   <img class="hero-image" src="${img}" alt="${p.name}">
   <div class="product-meta">
    <div class="rule"></div>
    <div class="product-title-row"><div class="product-title">${p.name}</div><div class="price">$${p.price}</div></div>
    <div class="sizes">${["S","M","L","XL","XXL"].map(s=>`<button class="${s===state.size?"active":""}" data-size="${s}">${s}</button>`).join("")}</div>
    <div class="size-note">Sizes S to XXL. ${state.category==="jacket"?"Windbreaker fit with adjustable details.":"Relaxed ARTIST fit."}</div>
    <div class="actions"><button class="add" id="addProduct">ADD TO CART</button><button class="link" id="sizeGuide">Size guide</button></div>
    <button class="details-btn" id="seeDetails">SEE THE DETAILS</button>
    <img class="detail-shot" src="${p.detail}" alt="${p.name} detail">
   </div>`;
 document.querySelectorAll("[data-size]").forEach(b=>b.onclick=()=>{state.size=b.dataset.size;render()});
 $("#addProduct").onclick=()=>addToCart(p);
 $("#sizeGuide").onclick=()=>document.querySelector(".info-section").scrollIntoView({behavior:"smooth"});
 $("#seeDetails").onclick=()=>document.querySelector("#features").scrollIntoView({behavior:"smooth"});
 updateFeatures();
}

function updateFeatures(){
 const imgs=[$("#featureOne"),$("#featureTwo"),$("#featureThree"),$("#featureFour")];
 const src=products[state.category].detail;
 imgs.forEach((im,i)=>{im.src=src;im.style.objectPosition=["30% 50%","65% 30%","35% 70%","75% 70%"][i]});
}

function addToCart(p){
 state.cart.push({name:p.name,size:state.size,price:p.price});
 updateCart();
 $("#cartDrawer").classList.add("open");
 $("#cartDrawer").setAttribute("aria-hidden","false");
}
function updateCart(){
 $("#cartCount").textContent=state.cart.length;
 const items=$("#cartItems");
 if(!state.cart.length){items.innerHTML="<p>Your cart is empty.</p>";$("#cartTotal").textContent="$0";return}
 items.innerHTML=state.cart.map((x,i)=>`<div class="cart-line"><span>${x.name}<br>SIZE ${x.size}</span><strong>$${x.price}</strong></div>`).join("");
 $("#cartTotal").textContent="$"+state.cart.reduce((a,x)=>a+x.price,0);
}
document.querySelectorAll(".category-tabs button").forEach(b=>b.onclick=()=>{state.category=b.dataset.category;render();window.scrollTo({top:0,behavior:"smooth"})});
document.querySelectorAll(".colour-toggle button").forEach(b=>b.onclick=()=>{state.colour=b.dataset.colour;render()});
document.querySelectorAll(".accordion-head").forEach(b=>b.onclick=()=>b.classList.toggle("open"));
$("#cartButton").onclick=()=>{$("#cartDrawer").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false")};
$("#closeCart").onclick=()=>{$("#cartDrawer").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true")};
$("#checkout").onclick=()=>alert("Checkout is a demo in this version.");
$("#closeTop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
render();
