const materias = [
{ id:"historia", nombre:"Historia Constitucional", anio:1 },
{ id:"intro", nombre:"Introducción al Derecho", anio:1 },
{ id:"romano", nombre:"Derecho Romano", anio:1 },
{ id:"economia", nombre:"Problemática Económica", anio:1 },
{ id:"textos", nombre:"Comprensión y Producción de Textos", anio:1 },

{ id:"privado1", nombre:"Derecho Privado I", anio:2 },
{ id:"constitucional", nombre:"Derecho Constitucional", anio:2 },
{ id:"penal1", nombre:"Derecho Penal I", anio:2 },
{ id:"sociologia", nombre:"Sociología Jurídica", anio:2 },

{ id:"privado2", nombre:"Derecho Privado II", anio:3 },
{ id:"penal2", nombre:"Derecho Penal II", anio:3 },
{ id:"publico", nombre:"Derecho Público Provincial", anio:3 },
{ id:"filosofia", nombre:"Filosofía del Derecho", anio:3 }
];

const correlativas = [
{ from:"intro", to:"privado1" },
{ from:"historia", to:"constitucional" },
{ from:"intro", to:"penal1" },

{ from:"privado1", to:"privado2" },
{ from:"penal1", to:"penal2" },
{ from:"constitucional", to:"publico" }
];
