const materias = [

/* 1° AÑO */

{ id:"intro", nombre:"Introducción al Derecho", anio:1 },
{ id:"historia", nombre:"Historia Constitucional", anio:1 },
{ id:"romano", nombre:"Derecho Romano", anio:1 },
{ id:"economia", nombre:"Problemática Económica", anio:1 },
{ id:"textos", nombre:"Comprensión y Producción de Textos", anio:1 },

/* 2° AÑO */

{ id:"privado1", nombre:"Derecho Privado I", anio:2 },
{ id:"constitucional", nombre:"Derecho Constitucional", anio:2 },
{ id:"penal1", nombre:"Derecho Penal I", anio:2 },
{ id:"sociologia", nombre:"Sociología Jurídica", anio:2 },
{ id:"politico", nombre:"Derecho Político", anio:2 },

/* 3° AÑO */

{ id:"privado2", nombre:"Derecho Privado II", anio:3 },
{ id:"penal2", nombre:"Derecho Penal II", anio:3 },
{ id:"publico", nombre:"Derecho Público Provincial y Municipal", anio:3 },
{ id:"filosofia", nombre:"Filosofía del Derecho", anio:3 },
{ id:"administrativo", nombre:"Derecho Administrativo", anio:3 },

/* 4° AÑO */

{ id:"privado3", nombre:"Derecho Privado III", anio:4 },
{ id:"procesal1", nombre:"Derecho Procesal I", anio:4 },
{ id:"procesal2", nombre:"Derecho Procesal II", anio:4 },
{ id:"laboral", nombre:"Derecho del Trabajo y Seguridad Social", anio:4 },
{ id:"internacional_publico", nombre:"Derecho Internacional Público", anio:4 },

/* 5° AÑO */

{ id:"internacional_privado", nombre:"Derecho Internacional Privado", anio:5 },
{ id:"tributario", nombre:"Derecho Tributario", anio:5 },
{ id:"comercial", nombre:"Derecho Comercial", anio:5 },
{ id:"ambiental", nombre:"Derecho Ambiental", anio:5 },
{ id:"practica", nombre:"Práctica Profesional", anio:5 }

];

const correlativas = [

/* INTRO */

{ from:"intro", to:"privado1" },
{ from:"intro", to:"penal1" },

/* HISTORIA */

{ from:"historia", to:"constitucional" },
{ from:"historia", to:"politico" },

/* ROMANO */

{ from:"romano", to:"privado1" },

/* SEGUNDO A TERCERO */

{ from:"privado1", to:"privado2" },
{ from:"penal1", to:"penal2" },
{ from:"constitucional", to:"publico" },
{ from:"constitucional", to:"administrativo" },

/* TERCERO A CUARTO */

{ from:"privado2", to:"privado3" },
{ from:"privado2", to:"procesal1" },
{ from:"penal2", to:"procesal2" },
{ from:"administrativo", to:"laboral" },

/* CUARTO A QUINTO */

{ from:"privado3", to:"comercial" },
{ from:"procesal2", to:"practica" },
{ from:"internacional_publico", to:"internacional_privado" },
{ from:"administrativo", to:"tributario" }

];
