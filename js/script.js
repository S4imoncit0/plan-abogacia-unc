const STORAGE_KEY = "abogacia_aprobadas";

window.addEventListener("load", () => {

let aprobadas = new Set(
JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
);

let filtroActual = "all";

/* NODOS */
const nodes = materias.map((m,i)=>({
data:{
id:m.id,
label:m.nombre,
anio:m.anio
},
position:{
x:(m.anio-1)*250,
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
"font-size":10,
"transition-property":"background-color, width, height",
"transition-duration":"0.2s"
}
},

{
selector:"node:hover",
style:{
width:150,
height:70
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
},

{
selector:".disponible",
style:{
"background-color":"#FFD43B",
color:"#000"
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

/* SOLUCIÓN AL OFFSET */
requestAnimationFrame(()=>{

cy.resize();
cy.fit(cy.elements(),100);
cy.center();

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

/* ACTUALIZAR BLOQUEOS Y DISPONIBLES */
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

/* BARRA DE PROGRESO */
function actualizarProgreso(){

let total = materias.length;
let aprobadasCount = aprobadas.size;

let porcentaje = Math.round((aprobadasCount / total) * 100);

document.getElementById("progreso-barra").style.width = porcentaje + "%";

document.getElementById("progreso-texto").innerText =
aprobadasCount + " de " + total + " materias aprobadas (" + porcentaje + "%)";

}

/* FILTRO POR AÑO */

function aplicarFiltro(anio){

filtroActual = anio;

cy.nodes().forEach(node=>{

let nodeAnio = node.data("anio");

if(anio === "all"){
node.style("display","element");
}else{
node.style("display", nodeAnio == anio ? "element":"none");
}

});

cy.edges().forEach(edge=>{

let sourceVisible = edge.source().style("display") === "element";
let targetVisible = edge.target().style("display") === "element";

edge.style("display", (sourceVisible && targetVisible) ? "element":"none");

});

cy.fit(cy.elements(":visible"),100);

}

/* BOTONES FILTRO */

document.querySelectorAll(".filtros button").forEach(btn=>{

btn.addEventListener("click",()=>{

let anio = btn.dataset.anio;

aplicarFiltro(anio);

});

});

/* CLICK EN MATERIA */

cy.nodes().on("tap",function(evt){

let node=evt.target;
let id=node.id();

if(node.hasClass("bloqueada")) return;

node.animate({
style:{ width:160, height:80 }
},{
duration:100,
complete:()=>{
node.animate({
style:{ width:140, height:60 }
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

}

localStorage.setItem(
STORAGE_KEY,
JSON.stringify([...aprobadas])
);

actualizarBloqueos();
actualizarProgreso();

});

/* INICIALIZACIÓN */

actualizarBloqueos();
actualizarProgreso();

});
