let inventory =[
    {name:"Infinity Edge",type:"weapon",price:3400,quantity:2,description:"crit damage"},
    {name:"Rabadon's Deathcap",type:"hat",price:3600,quantity:1,description:"ability power"},
    {name:"Thornmail",type:"armor",price:2700,quantity:3,description:"reflects damage"},
    {name:"Sunfire Aegis",type:"armor",price:2700,quantity:2,description:"burns nearby enemies"},
    {name:"Liandary Torment",type:"mask",price:3000,quantity:2,description:"spell burn enemies"},
    {name:"Morellonomicon",type:"book",price:2850,quantity:2,description:"antiheal"},
    {name:"Luden's Echo",type:"wand",price:2750,quantity:2,description:"magic damage"},
    {name:"Rapid Firecannon",type:"weapon",price:2650,quantity:2,description:"increased attack range"},
];
const invEl = document.getElementById("inventory");
const totalEl = document.getElementById("totalValue");

function listItems(items = inventory){
  invEl.innerHTML = "";
  items.forEach(i => invEl.innerHTML += `<p>${i.name} | ${i.type} | $${i.price} | qty ${i.quantity}</p>`);
}

function addItem(item){ inventory.push(item); listItems(); }

function handleAdd(){
  addItem({ name:name.value, type:type.value, price:+price.value, quantity:+qty.value, description:desc.value });
}

function removeItem(n){
  n = (n||"").toLowerCase();
  inventory = inventory.filter(i => i.name.toLowerCase() !== n);
  listItems();
}

function getItem(n){
  n = (n||"").toLowerCase();
  return inventory.find(i => i.name.toLowerCase() === n);
}

function searchItems(q){
  q = (q||"").toLowerCase();
  listItems(inventory.filter(i => i.name.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)));
}

function calculateTotalValue(){
  totalEl.textContent = "Total Value: $" + inventory.reduce((t,i)=>t+i.price*i.quantity,0);
}

listItems();

