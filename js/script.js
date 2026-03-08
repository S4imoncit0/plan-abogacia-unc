const nodes = materias.map(m => ({
data: {
id: m.id,
label: m.nombre,
anio: m.anio
},
position: {
x: m.anio * 300,
y: Math.random() * 500
}
}));

const edges = correlativas.map(c => ({
data: {
source: c.from,
target: c.to
}
}));

const cy = cytoscape({

container: document.getElementById('cy'),

elements: [
...nodes,
...edges
],

style: [

{
selector: 'node',
style: {
'label': 'data(label)',
'text-wrap': 'wrap',
'text-max-width': 120,
'background-color': '#0074D9',
'color': '#fff',
'text-valign': 'center',
'text-halign': 'center',
'width': 140,
'height': 60,
'font-size': '10px'
}
},

{
selector: 'edge',
style: {
'width': 2,
'line-color': '#ccc',
'target-arrow-color': '#ccc',
'target-arrow-shape': 'triangle'
}
},

{
selector: '.aprobada',
style: {
'background-color': '#2ECC40'
}
}

],

layout: {
name: 'preset'
}

});

let aprobadas = new Set();

cy.on('tap', 'node', function(evt) {

const node = evt.target;
const id = node.id();

if (aprobadas.has(id)) {

aprobadas.delete(id);
node.removeClass('aprobada');

} else {

aprobadas.add(id);
node.addClass('aprobada');

}

});
