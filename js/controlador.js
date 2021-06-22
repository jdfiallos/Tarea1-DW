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
  if (localstorage.getItem('categorias') == null) {
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
    /* Siempre se usara una variable para poder acceder. Tal como apps. */
    localstorage.setItem('categorias', JSON.stringify(categorias));
    apps = JSON.parse(localstorage.getItem('categorias'));
  } else {
    apps = JSON.parse(localstorage.getItem('categorias'));
  };

  /* Llenamos el select con las categorias. */
  for (let index = 0; index < apps.length; index++) {
    document.getElementById("selector").innerHTML +=
    `<option value="${index}">${apps[index].nombreCategoria}</option>`
    };
})();


function cargarApps() {
    document.getElementById("app").innerHTML = '';
    seleccion = document.getElementById("selector").value;

    let localstorage = window.localStorage;
    apps = JSON.parse(localstorage.getItem('categorias'));

    for (let index = 0; index < apps[seleccion].aplicaciones.length; index++) {
        /* Generamos dinamicamente las estrellas */
        let estrellas = apps[seleccion].aplicaciones[index].calificacion;
        let calificacionEstrella = '';

        /* Aqui generamos la cantidad de estrellas */    
        for (let index = 0; index < estrellas; index++) {
            calificacionEstrella += '<i class="fas fa-star"></i>';
        };
        for (let index = 0; index < 5-estrellas; index++) {
            calificacionEstrella += '<i class="far fa-star"></i>';
        };

        /* Tuvimos que hacer un replace ya que daba error al usar comillas. */
        nombreApp = JSON.stringify(apps[seleccion].aplicaciones[index]).replace(/\"/g,"&quot;")
            
        /* Agregamos las apps dinamicamente. */
        document.getElementById("app").innerHTML += 
        `
        <!-- Esto lo manejaremos en js. -->
        <div class="col-2 mb-2">
            <div class="card" onclick="generarModal(${nombreApp})" data-toggle="modal" data-target="#exampleModal">
                <div class=" imagen">
                    <img src="${apps[seleccion].aplicaciones[index].icono}" class="card-img-top" alt="...">
                </div>
                <div class="card-body" style="margin-left: -10px; height: 115px;">
                <h5 class="card-title" style="margin-top: -25px;">${apps[seleccion].aplicaciones[index].nombre}</h5>
                <p class="card-text" style="margin-top: -10px;">${apps[seleccion].aplicaciones[index].desarrollador}</p>
                <div class="mb-1" style="margin-top: -10px;">
                    ${calificacionEstrella}
                </div>
                <h5>$3.15</h5>
                </div>
            </div>
        </div>`
    };
}


/* Esta es la modal de las apps. Con sus datos mas detallados. */
function generarModal(app){
    let estrella = '';

    for (let index = 0;  index< app.calificacion; index++) {
        estrella += '<i class="comentario fas fa-star"></i>';
    }
    for (let index = 0;  index< 5-app.calificacion; index++) {
        estrella += '<i class="comentario far fa-star"></i>';
    }

    comment = '';
    /* Hicimos una condicion ya que comentarios son por parte de usuarios y no el creador. */
    if (app.comentarios == null) {
        comment = '';
    } else {
        for (let index = 0; index < app.comentarios.length; index++) {
            comment += `
            <div class="row">
                <div class="col-11 mx-auto">
                    <hr>
                </div>
                <div class="col-3">
                    <img class="col-11 mx-auto rounded-circle" src="./img/user.webp">
                </div>
                <div class="col-8">
                    <div class="col-12" style="margin-left: -35px;">
                        <h6>${app.comentarios[index].usuario}</h6>
                    </div>
                    <div class="col-12" style="margin-left: -35px; margin-top: -5px;">
                        <p>
                            ${app.comentarios[index].comentario}
                        </p>
                    </div>
                </div>
            </div>`;}
    }
    
    disponible = '';
    if (app.instalada == true) {
        disponible = ''
    } else {
        disponible = `
        <button type="button" class="btn btn-primary" style="background-color: green;" >
        Instalar
        </button>`
    }

    /* Llenamos los datos internos de la modal respectivamente de la app seleccionada. */
    document.getElementById('exampleModal').innerHTML = ''
    document.getElementById('exampleModal').innerHTML = 
    `<div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <div class="col-11 mx-auto">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${app.imagenes[0]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="${app.imagenes[1]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="${app.imagenes[2]}" class="d-block w-100" alt="...">
                            </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div class="col-11 mx-auto">
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <img class="col-4 mb-5 mt-1 mx-auto" src="${app.icono}">
                    <div class="col-7" >
                        <div class="col-12" style="margin-left: -40px;">
                            <h3>${app.nombre}</h3>
                        </div>
                        <div class="col-12" style="margin-left: -40px; margin-top: -5px;">
                            <p>${app.desarrollador}</p>
                        </div>
                        <div class="col-12" style="margin-left: -40px; margin-top: -15px;">
                            <label>
                            ${app.descripcion}
                            </label>
                        </div>
                        <div class="col-12" style="margin-left: -40px;">
                            <h5>$3.11</h5>
                        </div>
                    </div>
                    <div class="col-11 mx-auto">
                        <hr>
                    </div>
                </div>
                <div class="row">   
                    <div class="col-11" style="text-align: center;">
                        ${estrella}
                        <i class="comentario">${app.calificacion}.0</i>
                    </div>
                </div>   
                ${comment}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                ${disponible}
            </div>
        </div>
    </div>`;
    $('#exampleModal').modal('show');
}
 

function ModalAgregar() {
    let localstorage = window.localStorage;
    document.getElementById('Imagen').innerHTML = ''
    seleccion = document.getElementById("selector").value;
    appAgregar = JSON.parse(localstorage.getItem('categorias'));
    sele = ''

    for (let index = 0; index < appAgregar[seleccion].aplicaciones.length; index++) {
        sele += `<option value="${appAgregar[seleccion].aplicaciones[index].icono}"> Imagen ${JSON.stringify(appAgregar[seleccion].aplicaciones[index].codigo)} </option>`;
    }

   document.getElementById('Imagen').innerHTML += `${sele}`; 
   $('#exampleModal1').modal('show');
}



function AgregarApp() {
    const app = {
        codigo: document.getElementById('Codigo').value,
        nombre: document.getElementById('Nombre').value,
        descripcion: document.getElementById('Descripcion').value,
        icono: document.getElementById('Imagen').value,
        calificacion: 5,
        desarrollador: document.getElementById('Desarrollador').value,
        imagenes: {
            0: "img/app-screenshots/1.webp",
            1: "img/app-screenshots/2.webp",
            2: "img/app-screenshots/3.webp",
        },
    };
    
    seleccion = document.getElementById("selector").value;
    
    let localstorage = window.localStorage;
    cat = JSON.parse(localstorage.getItem('categorias'));

    cat[seleccion].aplicaciones.push(app);

    localstorage.setItem('categorias', JSON.stringify(cat));

    cargarApps();
    console.log('Agregada con exito.');
    $('#exampleModal1').modal('hide');
}
