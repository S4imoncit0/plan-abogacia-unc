const materias = [
{ id: "historia", nombre: "Historia Constitucional", anio: 1 },
{ id: "intro", nombre: "Introducción al Derecho", anio: 1 },
{ id: "romano", nombre: "Derecho Romano", anio: 1 },
{ id: "economia", nombre: "Problemática Económica", anio: 1 },
{ id: "textos", nombre: "Comprensión y Producción de Textos", anio: 1 },

{ id: "privado1", nombre: "Derecho Privado I", anio: 2 },
{ id: "constitucional", nombre: "Derecho Constitucional", anio: 2 },
{ id: "penal1", nombre: "Derecho Penal I", anio: 2 },
{ id: "sociologia", nombre: "Sociología Jurídica", anio: 2 },

{ id: "privado2", nombre: "Derecho Privado II", anio: 3 },
{ id: "penal2", nombre: "Derecho Penal II", anio: 3 },
{ id: "publico", nombre: "Derecho Público Provincial", anio: 3 },
{ id: "filosofia", nombre: "Filosofía del Derecho", anio: 3 },

{ id: "privado3", nombre: "Derecho Privado III", anio: 4 },
{ id: "procesalcivil", nombre: "Derecho Procesal Civil", anio: 4 },
{ id: "administrativo", nombre: "Derecho Administrativo", anio: 4 },

{ id: "privado4", nombre: "Derecho Privado IV", anio: 5 },
{ id: "procesalpenal", nombre: "Derecho Procesal Penal", anio: 5 },
{ id: "laboral", nombre: "Derecho del Trabajo", anio: 5 }
];

const correlativas = [
{ from: "intro", to: "privado1" },
{ from: "historia", to: "constitucional" },
{ from: "intro", to: "penal1" },

{ from: "privado1", to: "privado2" },
{ from: "penal1", to: "penal2" },
{ from: "constitucional", to: "publico" },

{ from: "privado2", to: "privado3" },
{ from: "privado2", to: "procesalcivil" },
{ from: "constitucional", to: "administrativo" },

{ from: "privado3", to: "privado4" },
{ from: "penal2", to: "procesalpenal" },
{ from: "privado3", to: "laboral" }
];
