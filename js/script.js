let estados = {}

materias.forEach(m => estados[m.id] = "pendiente")

function colorEstado(estado){

if(estado === "aprobada") return "#22c55e"
if(estado === "regular") return "#f97316"

return "#374151"

}

const cy = cytoscape({

container: document.getElementById('cy'),

elements: [

...materias.map(m => ({
data:{ id:m.id, label:m.nombre }
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
'font-size':12
}
},

{
selector:'edge',
style:{
'curve-style':'bezier',
'target-arrow-shape':'triangle',
'line-color':'#3b82f6',
'target-arrow-color':'#3b82f6'
}
}

],

layout:{
name:'breadthfirst',
directed:true,
padding:10
}

})

function actualizarColores(){

materias.forEach(m => {

cy.getElementById(m.id).style(
'background-color',
colorEstado(estados[m.id])
)

})

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
