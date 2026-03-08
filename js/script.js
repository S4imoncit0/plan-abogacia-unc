const materias = {
  "Historia Constitucional": 1,
  "Introducción al Derecho": 1,
  "Derecho Romano": 1,
  "Problemática Económica": 1,
  "Comprensión y Producción de Textos": 1,

  "Derecho Privado I": 2,
  "Derecho Constitucional": 2,
  "Derecho Penal I": 2,
  "Sociología Jurídica": 2,

  "Derecho Privado II": 3,
  "Derecho Penal II": 3,
  "Derecho Público Provincial": 3,
  "Filosofía del Derecho": 3,

  "Derecho Privado III": 4,
  "Derecho Procesal Civil": 4,
  "Derecho Administrativo": 4,

  "Derecho Privado IV": 5,
  "Derecho Procesal Penal": 5,
  "Derecho del Trabajo": 5,

  "Derecho Comercial": 6,
  "Derecho Internacional Público": 6,
  "Derecho de la Seguridad Social": 6,

  "Derecho Internacional Privado": 7,
  "Derecho Tributario": 7,

  "Práctica Profesional": 8
};

const correlativas = {
  "Derecho Privado I": ["Introducción al Derecho"],
  "Derecho Constitucional": ["Historia Constitucional"],
  "Derecho Penal I": ["Introducción al Derecho"],

  "Derecho Privado II": ["Derecho Privado I"],
  "Derecho Penal II": ["Derecho Penal I"],
  "Derecho Público Provincial": ["Derecho Constitucional"],

  "Derecho Privado III": ["Derecho Privado II"],
  "Derecho Procesal Civil": ["Derecho Privado II"],
  "Derecho Administrativo": ["Derecho Constitucional"],

  "Derecho Privado IV": ["Derecho Privado III"],
  "Derecho Procesal Penal": ["Derecho Penal II"],
  "Derecho del Trabajo": ["Derecho Privado III"],

  "Derecho Comercial": ["Derecho Privado IV"],
  "Derecho Internacional Público": ["Derecho Constitucional"],
  "Derecho de la Seguridad Social": ["Derecho del Trabajo"],

  "Derecho Internacional Privado": ["Derecho Comercial"],
  "Derecho Tributario": ["Derecho Administrativo"],

  "Práctica Profesional": ["Derecho Procesal Civil", "Derecho Procesal Penal"]
};

let aprobadas = new Set();

function toggleMateria(nombre, elemento) {
  if (aprobadas.has(nombre)) {
    aprobadas.delete(nombre);
    elemento.classList.remove("aprobada");
  } else {
    aprobadas.add(nombre);
    elemento.classList.add("aprobada");
  }

  actualizarBloqueos();
}

function actualizarBloqueos() {
  document.querySelectorAll(".materia").forEach(el => {
    const nombre = el.dataset.nombre;

    if (!correlativas[nombre]) return;

    const requisitos = correlativas[nombre];

    const habilitada = requisitos.every(r => aprobadas.has(r));

    if (!habilitada && !aprobadas.has(nombre)) {
      el.classList.add("bloqueada");
    } else {
      el.classList.remove("bloqueada");
    }
  });
}

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (const materia in materias) {

    const div = document.createElement("div");
    div.className = "materia bloqueada";
    div.innerText = materia;
    div.dataset.nombre = materia;

    div.onclick = () => toggleMateria(materia, div);

    contenedor.appendChild(div);
  }

  actualizarBloqueos();
}

crearMalla();
