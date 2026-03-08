const materias = [

{
id:"intro_derecho",
nombre:"Introducción al Derecho",
x:100,
y:100
},

{
id:"romano",
nombre:"Derecho Romano",
x:350,
y:100
},

{
id:"historia",
nombre:"Historia Constitucional",
x:600,
y:100
},

{
id:"privado",
nombre:"Derecho Privado",
x:350,
y:250
}

]

const correlativas = [

{
source:"intro_derecho",
target:"privado"
},

{
source:"romano",
target:"privado"
},

{
source:"historia",
target:"privado"
}

]
