const STORAGE_KEY = "abogacia_aprobadas";

/* cargar progreso guardado */
let aprobadas = new Set(
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
);

/* crear nodos */
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

/* crear edges */
const edges = correlativas.map(c => ({
  data: {
    source: c.from,
    target: c.to
  }
}));

/* inicializar cytoscape */
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
    },

    {
      selector: '.bloqueada',
      style: {
        'background-color': '#AAAAAA'
      }
    }

  ],

  layout: {
    name: 'preset'
  }

});

/* restaurar materias aprobadas */
aprobadas.forEach(id => {
  const node = cy.getElementById(id);
  node.addClass("aprobada");
});

/* verificar correlativas */
function cumpleCorrelativas(id) {

  const requisitos = correlativas
    .filter(c => c.to === id)
    .map(c => c.from);

  /* si no tiene correlativas está habilitada */
  if (requisitos.length === 0) return true;

  return requisitos.every(r => aprobadas.has(r));
}

/* actualizar estados de materias */
function actualizarBloqueos() {

  cy.nodes().forEach(node => {

    const id = node.id();

    if (aprobadas.has(id)) return;

    if (cumpleCorrelativas(id)) {

      node.removeClass("bloqueada");

    } else {

      node.addClass("bloqueada");

    }

  });

}

actualizarBloqueos();
cy.fit();

/* click en materias */
cy.on('tap', 'node', function(evt) {

  const node = evt.target;
  const id = node.id();

  /* si está bloqueada no se puede aprobar */
  if (node.hasClass("bloqueada")) return;

  if (aprobadas.has(id)) {

    aprobadas.delete(id);
    node.removeClass("aprobada");

  } else {

    aprobadas.add(id);
    node.addClass("aprobada");

  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...aprobadas])
  );

  actualizarBloqueos();

});
