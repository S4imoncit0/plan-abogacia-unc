let estados = JSON.parse(localStorage.getItem("estados")) || {}

materias.forEach(m => {
if(!estados[m.id]) estados[m.id] = "pendiente"
})

function obtenerAprobadas(){
return Object.keys(estados).filter(id => estados[id] === "aprobada")
}

function puedeCursar(materia){

let aprobadas = obtenerAprobadas()

return correlativas
.filter(c => c.target === materia.id)
.every(c => aprobadas.includes(c.source))

}

function colorEstado(id){

let estado = estados[id]

if(estado === "aprobada") return "#22c55e"
if(estado === "regular") return "#f97316"

if(puedeCursar({id})) return "#ffffff"

return "#374151"

}

const cy = cytoscape({

container: document.getElementById('cy'),

elements: [

...materias.map(m => ({
data:{ id:m.id, label:m.nombre },
position:{ x:m.x, y:m.y }
})),

...correlativas.map(c => ({
data:{ source:c.source, target:c.target }
}))

],

style:[

{
selector:'node',
style:{
'label':'data(label)',
'background-color':'#374151',
'text-valign':'center',
'text-halign':'center',
'color':'white',
'width':200,
'height':50,
'shape':'roundrectangle',
'font-size':12,
'border-width':2,
'border-color':'#1e293b'
}
},

{
selector:'edge',
style:{
'curve-style':'bezier',
'target-arrow-shape':'triangle',
'line-color':'#3b82f6',
'target-arrow-color':'#3b82f6',
'width':2
}
}

],

layout:{
name:'breadthfirst',
directed:true,
padding:10,
spacingFactor:1.3
}

})

function actualizarColores(){

materias.forEach(m => {

let nodo = cy.getElementById(m.id)

let color = colorEstado(m.id)

nodo.style("background-color", color)

if(color === "#ffffff"){
nodo.style("color","#000")
}

})

localStorage.setItem("estados", JSON.stringify(estados))

}

cy.on('tap','node',function(evt){

let id = evt.target.id()

if(estados[id] === "pendiente")
estados[id] = "regular"

else if(estados[id] === "regular")
estados[id] = "aprobada"

else
estados[id] = "pendiente"

actualizarColores()

})

actualizarColores()
