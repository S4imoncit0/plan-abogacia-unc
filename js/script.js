const STORAGE_KEY = "abogacia_aprobadas";

document.addEventListener("DOMContentLoaded", () => {

let aprobadas = new Set(
JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
);

/* crear nodos */
const nodes = materias.map((m,i)=>({
data:{
id:m.id,
label:m.nombre,
anio:m.anio
},
position:{
x:m.anio*300,
y:100+(i%5)*120
}
}));

/* crear edges */
const edges = correlativas.map(c=>({
data:{
id:c.from+"_"+c.to,
source:c.from,
target:c.to
}
}));

const cy = cytoscape({

container: document.getElementById("cy"),

elements:[
...nodes,
...edges
],

style:[

{
selector:"node",
style:{
label:"data(label)",
"background-color":"#0074D9",
color:"#fff",
"text-wrap":"wrap",
"text-max-width":120,
"text-valign":"center",
"text-halign":"center",
width:140,
height:60,
"font-size":10
}
},

{
selector:"edge",
style:{
width:2,
"line-color":"#ccc",
"target-arrow-color":"#ccc",
"target-arrow-shape":"triangle",
"curve-style":"bezier"
}
},

{
selector:".aprobada",
style:{
"background-color":"#2ECC40"
}
},

{
selector:".bloqueada",
style:{
"background-color":"#AAAAAA"
}
}

],

layout:{
name:"preset"
}

});

/* restaurar aprobadas */
aprobadas.forEach(id=>{
let node=cy.getElementById(id);
if(node) node.addClass("aprobada");
});

/* verificar correlativas */
function cumpleCorrelativas(id){

const requisitos=correlativas
.filter(c=>c.to===id)
.map(c=>c.from);

if(requisitos.length===0) return true;

return requisitos.every(r=>aprobadas.has(r));

}

/* actualizar bloqueos */
function actualizarBloqueos(){

cy.nodes().forEach(node=>{

let id=node.id();

if(aprobadas.has(id)) return;

if(cumpleCorrelativas(id)){
node.removeClass("bloqueada");
}else{
node.addClass("bloqueada");
}

});

}

actualizarBloqueos();

/* CLICK EN NODOS */
cy.nodes().on("tap",function(evt){

let node=evt.target;
let id=node.id();

if(node.hasClass("bloqueada")) return;

if(aprobadas.has(id)){

aprobadas.delete(id);
node.removeClass("aprobada");

}else{

aprobadas.add(id);
node.addClass("aprobada");

}

localStorage.setItem(
STORAGE_KEY,
JSON.stringify([...aprobadas])
);

actualizarBloqueos();

});

});
