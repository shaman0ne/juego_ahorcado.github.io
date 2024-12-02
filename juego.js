let palabrita;
let cant_errores = 0; //cuantas veces me equivoqué
let cant_aciertos = 0; //cuantas letras acerté

const categorias = [
    {
        nombre: 'Instrumentos',  // Nombre de la lista
        palabras: [
            'guitarra',  /* 0 */
            'piano',     /* 1 */
            'batería',   /* 2 */
            'violín',    /* 3 */
            'trompeta',  /* 4 */
            'saxofón',   /* 5 */
            'flauta',    /* 6 */
            'armónica'   /* 7 */
        ]
    },
    {
        nombre: 'Frutas',  // Nombre de la lista
        palabras: [
            'manzana',    /* 0 */
            'plátano',    /* 1 */
            'naranja',    /* 2 */
            'fresa',      /* 3 */
            'kiwi',       /* 4 */
            'uva',        /* 5 */
            'pera',       /* 6 */
            'cereza'      /* 7 */
        ]
    },
    {
        nombre: 'Profesiones',  // Nombre de la lista
        palabras: [
            'ingeniero',  /* 0 */
            'arquitecto', /* 1 */
            'abogado',    /* 2 */
            'médico',     /* 3 */
            'profesor',   /* 4 */
            'carpintero', /* 5 */
            'electricista', /* 6 */
            'chef'        /* 7 */
        ]
    }
];

const btn = id('jugar');
const imagen = id( 'imagen' );
const btn_letras = document.querySelectorAll( "#letras button" );

/* click en iniciar juego */
btn.addEventListener('click', iniciar );

function iniciar(event){
    imagen.src = 'img/img0.png';
    btn.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0; 

    const parrafo = id( 'palabra_a_adivinar' );
    parrafo.innerHTML = ''; 

    // Seleccionamos aleatoriamente una categoría
    const categoria_aleatoria = obtener_random(0, categorias.length);
    const categoria = categorias[categoria_aleatoria];
    const palabras = categoria.palabras;
    
    // Seleccionamos una palabra aleatoria de esa categoría
    const valor_al_azar = obtener_random(0, palabras.length);
    palabrita = palabras[valor_al_azar];
    console.log(`Categoría: ${categoria.nombre}, Palabra: ${palabrita}`);
    
    const cant_letras = palabrita.length;

    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = false;
    }

    for( let i = 0; i < cant_letras; i++ ){
        const span = document.createElement( 'span' );
        parrafo.appendChild( span );
    }

    // Mostrar la categoría al inicio
    const categoria_elemento = id('categoria');
    categoria_elemento.innerHTML = `Categoría: ${categoria.nombre}`;
}

/* click de adivinar letra */
for( let i = 0; i < btn_letras.length ; i++ ){
    btn_letras[ i ].addEventListener( 'click', click_letras );
}

function click_letras(event){
    const spans = document.querySelectorAll( '#palabra_a_adivinar span' );
    const button = event.target; //cuál de todas las letras, llamó a la función.
    button.disabled = true;

    const letra = button.innerHTML.toLowerCase( );
    const palabra = palabrita.toLowerCase( );

    let acerto = false;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if( acerto == false ){
        cant_errores++;
        const source = `img/img${cant_errores}.png` ;
        imagen.src = source;
    }

    if( cant_errores == 7 ){
        id('resultado').innerHTML = "Perdiste, la palabra era " + palabrita;
        game_over( );
    }else if( cant_aciertos == palabrita.length ){
        id('resultado').innerHTML = "GANASTE!! WIIIIII";
        game_over( );
    }
    console.log( "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto );
}

/* fin del juego */
function game_over( ){
    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = true;
    }

    btn.disabled = false;
}

game_over( );
