//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  let aplicaciones = []
  //Obtenemos la referencia a la tech de LocalStorage
  let localstorage = window.localStorage;
  //guardar, para hacerlo mas eficiente si ya existe que no lo vuelva a crear.
  if (localstorage.getItem(categorias) == null) {
    let contador = 1;
    for (let i=0;i<5;i++){//Generar 5 categorias
        let categoria = {
            nombreCategoria:"Categoria "+i,
            descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
            aplicaciones:[]
        };
        for (let j=0;j<10;j++){//Generar 10 apps por categoria
            let aplicacion = {
                codigo:contador,
                nombre:"App "+contador,
                descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                icono:`img/app-icons/${contador}.webp`,
                instalada:contador%3==0?true:false,
                app:"app/demo.apk",
                calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
                descargas:1000,
                desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
                imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
                comentarios:[
                    {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                    {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                    {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
                ]
            };
            contador++;
            categoria.aplicaciones.push(aplicacion);
        }
        categorias.push(categoria);
    }
    localstorage.setItem('categorias', JSON.stringify(categorias));
  } else {
    aplicaciones = localstorage.getItem(categorias);
  };
  
  console.log(categorias);

  /* Llenamos el select. */
  for (let index = 0; index < categorias.length; index++) {
    document.getElementById("selector").innerHTML +=
    `<option value="${index}">${categorias[index].nombreCategoria}</option>`
    };


})();


function cargarApps() {
    document.getElementById("app").innerHTML = null;
    seleccion = document.getElementById("selector").value;
    for (let index = 0; index < categorias[seleccion].aplicaciones.length; index++) {
        console.log(categorias[seleccion].aplicaciones[index]);

        /* Generamos dinamicamente las estrellas */
        let estrellas = categorias[seleccion].aplicaciones[index].calificacion;
        let calificacionEstrella = '';
    /* Aqui generamos la cantidad de estrellas */    
    for (let index = 0; index < estrellas; index++) {
        calificacionEstrella += '<i class="fas fa-star"></i>';
    };

    for (let index = 0; index < 5-estrellas; index++) {
        calificacionEstrella += '<i class="far fa-star"></i>';
    };


        document.getElementById("app").innerHTML += 
    `
    <!-- Esto lo manejaremos en js. -->
    <div class="col-2 mb-2" >
        <div class="card">
            <div class=" imagen">
                <img src="${categorias[seleccion].aplicaciones[index].icono}" class="card-img-top" alt="...">
            </div>
            <div class="card-body" style="margin-left: -10px; height: 115px;">
              <h5 class="card-title" style="margin-top: -25px;">${categorias[seleccion].aplicaciones[index].nombre}</h5>
              <p class="card-text" style="margin-top: -10px;">${categorias[seleccion].aplicaciones[index].desarrollador}</p>
              <div class="mb-1" style="margin-top: -10px;">
                ${calificacionEstrella}
              </div>
              <h5>$3.15</h5>
            </div>
        </div>
    </div>
    `

    };

    
}
 

