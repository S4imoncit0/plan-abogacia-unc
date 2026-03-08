const STORAGE_KEY = "abogacia_aprobadas";

document.addEventListener("DOMContentLoaded", () => {

let aprobadas = new Set(
JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
);

/* NODOS */
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

/* EDGES */
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

/* RESTAURAR APROBADAS */
aprobadas.forEach(id=>{
let node=cy.getElementById(id);
if(node) node.addClass("aprobada");
});

/* OBTENER CORRELATIVAS */
function correlativasDe(id){

return correlativas
.filter(c=>c.to===id)
.map(c=>c.from);

}

/* ACTUALIZAR BLOQUEOS */
function actualizarBloqueos(){

cy.nodes().forEach(node=>{

let id=node.id();

if(aprobadas.has(id)){
node.removeClass("bloqueada");
return;
}

let requisitos=correlativasDe(id);

/* si no tiene correlativas → habilitada */
if(requisitos.length===0){

node.removeClass("bloqueada");
return;

}

let habilitada=requisitos.every(r=>aprobadas.has(r));

if(habilitada){
node.removeClass("bloqueada");
}else{
node.addClass("bloqueada");
}

});

}

actualizarBloqueos();

/* CLICK */
cy.nodes().on("tap",function(evt){

let node=evt.target;
let id=node.id();

/* bloqueada → no permitir */
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
