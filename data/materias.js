const materias = [

{ id:"intro_derecho", nombre:"Introducción al Derecho" },
{ id:"romano", nombre:"Derecho Romano" },
{ id:"historia", nombre:"Historia Constitucional" },
{ id:"sociologia", nombre:"Sociología" },

{ id:"privado", nombre:"Derecho Privado Parte General" },

{ id:"penal1", nombre:"Derecho Penal I" },
{ id:"civil1", nombre:"Derecho Civil I" },

{ id:"civil2", nombre:"Derecho Civil II" },
{ id:"penal2", nombre:"Derecho Penal II" }

]

const correlativas = [

{ source:"intro_derecho", target:"privado" },
{ source:"romano", target:"privado" },

{ source:"privado", target:"civil1" },
{ source:"privado", target:"penal1" },

{ source:"civil1", target:"civil2" },
{ source:"penal1", target:"penal2" }

]
