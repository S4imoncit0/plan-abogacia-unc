const STORAGE_KEY = "abogacia_aprobadas";

window.addEventListener("load", () => {

let aprobadas = new Set(
JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
);

let filtroActual = "all";

/* POSICIONAMIENTO */

let filasPorAnio = {};

const nodes = materias.map((m)=>{

if(!filasPorAnio[m.anio]){
filasPorAnio[m.anio]=0;
}

let fila = filasPorAnio[m.anio]++;

return {
data:{
id:m.id,
label:m.nombre,
anio:m.anio
},
position:{
x:(m.anio-1)*260,
y:100 + fila*110
}
};

});

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
shape:"round-rectangle",
width:170,
height:60,
padding:"10px",
"text-wrap":"wrap",
"text-max-width":140,
"text-valign":"center",
"text-halign":"center",
color:"#fff",
"background-color":"#0074D9",
"border-width":2,
"border-color":"#1e3a8a",
"font-size":11,
"transition-property":"background-color, width, height",
"transition-duration":"0.2s"
}
},

{
selector:"node:hover",
style:{
width:180,
height:65
}
},

/* EDGE BASE */

{
selector:"edge",
style:{
width:2,
"line-color":"#9ca3af",
"target-arrow-color":"#9ca3af",
"target-arrow-shape":"triangle",
"curve-style":"bezier"
}
},

{
selector:".edge-activa",
style:{
"line-color":"#3b82f6",
"target-arrow-color":"#3b82f6",
width:3
}
},

{
selector:".edge-completa",
style:{
"line-color":"#22c55e",
"target-arrow-color":"#22c55e",
width:3
}
},

{
selector:".aprobada",
style:{
"background-color":"#16a34a",
"border-color":"#14532d"
}
},

{
selector:".bloqueada",
style:{
"background-color":"#9ca3af",
"border-color":"#6b7280"
}
},

{
selector:".disponible",
style:{
"background-color":"#facc15",
color:"#000",
"border-color":"#ca8a04"
}
},

{
selector:".highlight",
style:{
"border-color":"#f97316",
"border-width":4
}
}

],

layout:{
name:"preset"
},

minZoom:0.5,
maxZoom:2,
wheelSensitivity:0.2

});

/* FIX OFFSET */

requestAnimationFrame(()=>{

cy.resize();
cy.fit(cy.elements(),100);
cy.center();

});

/* RESTORE */

aprobadas.forEach(id=>{
let node=cy.getElementById(id);
if(node) node.addClass("aprobada");
});

/* CORRELATIVAS */

function correlativasDe(id){

return correlativas
.filter(c=>c.to===id)
.map(c=>c.from);

}

function dependientesDe(id){

return correlativas
.filter(c=>c.from===id)
.map(c=>c.to);

}

/* NUEVO: ACTUALIZAR COLOR DE EDGES */

function actualizarCorrelativas(){

cy.edges().forEach(edge=>{

let source=edge.source().id();
let target=edge.target().id();

edge.removeClass("edge-activa edge-completa");

if(aprobadas.has(source)){

if(aprobadas.has(target)){
edge.addClass("edge-completa");
}else{
edge.addClass("edge-activa");
}

}

});

}

/* BLOQUEOS */

function actualizarBloqueos(){

cy.batch(()=>{

cy.nodes().forEach(node=>{

let id=node.id();

if(aprobadas.has(id)){
node.removeClass("bloqueada");
node.removeClass("disponible");
return;
}

let requisitos=correlativasDe(id);

if(requisitos.length===0){
node.removeClass("bloqueada");
node.addClass("disponible");
return;
}

let habilitada=requisitos.every(r=>aprobadas.has(r));

if(habilitada){
node.removeClass("bloqueada");
node.addClass("disponible");
}else{
node.removeClass("disponible");
node.addClass("bloqueada");
}

});

});

}

/* PROGRESO */

function actualizarProgreso(){

let total = materias.length;
let aprobadasCount = aprobadas.size;

let porcentaje = Math.round((aprobadasCount / total) * 100);

document.getElementById("progreso-barra").style.width = porcentaje + "%";

document.getElementById("progreso-texto").innerText =
aprobadasCount + " de " + total + " materias aprobadas (" + porcentaje + "%)";

}

/* DISPONIBLES */

function actualizarMateriasDisponibles(){

let lista = document.getElementById("lista-disponibles");

if(!lista) return;

lista.innerHTML="";

materias.forEach(m=>{

let node = cy.getElementById(m.id);

if(node.hasClass("disponible") && !aprobadas.has(m.id)){

let li=document.createElement("li");
li.textContent=m.nombre;
lista.appendChild(li);

}

});

if(lista.children.length===0){

let li=document.createElement("li");
li.textContent="No hay materias disponibles";
lista.appendChild(li);

}

}

/* FILTRO */

function aplicarFiltro(anio){

filtroActual=anio;

cy.nodes().forEach(node=>{

let nodeAnio=node.data("anio");

if(anio==="all"){
node.style("display","element");
}else{
node.style("display", nodeAnio==anio?"element":"none");
}

});

cy.edges().forEach(edge=>{

let sourceVisible=edge.source().style("display")==="element";
let targetVisible=edge.target().style("display")==="element";

edge.style("display",(sourceVisible&&targetVisible)?"element":"none");

});

cy.fit(cy.elements(":visible"),100);

}

/* BOTONES */

document.querySelectorAll(".filtros button").forEach(btn=>{

btn.addEventListener("click",()=>{

let anio=btn.dataset.anio;
aplicarFiltro(anio);

});

});

/* CLICK */

cy.nodes().on("tap",function(evt){

let node=evt.target;
let id=node.id();

if(node.hasClass("bloqueada")) return;

let desbloqueadas=dependientesDe(id);

node.animate({
style:{width:180,height:70}
},{
duration:100,
complete:()=>{
node.animate({
style:{width:170,height:60}
},{
duration:100
});
}
});

if(aprobadas.has(id)){

aprobadas.delete(id);
node.removeClass("aprobada");

}else{

aprobadas.add(id);
node.addClass("aprobada");

desbloqueadas.forEach(dep=>{

let n=cy.getElementById(dep);

n.addClass("highlight");

setTimeout(()=>{
n.removeClass("highlight");
},1200);

});

}

localStorage.setItem(
STORAGE_KEY,
JSON.stringify([...aprobadas])
);

actualizarBloqueos();
actualizarCorrelativas();
actualizarProgreso();
actualizarMateriasDisponibles();

});

/* INIT */

actualizarBloqueos();
actualizarCorrelativas();
actualizarProgreso();
actualizarMateriasDisponibles();

});
