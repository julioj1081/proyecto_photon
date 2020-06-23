const auth = "563492ad6f9170000100000153ce429ff68344fe89ed1ac643bffade";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;
//eventos
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);
function updateInput(e){
    searchValue = e.target.value
}
/* Esto permite eliminar las fotos anteriores al escribir
algo nuevo en el buscador */
function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
}

/*CREAMOS ESTA FUNCION PARA LLAMAR 15 PRIMERAS IMAGENES RANDOM DEL PRIMER LINK */
async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: auth
        }
    });
    /*regresamos el valor como data */
    const data = await dataFetch.json();
    return data;
}
/*Construimos la imagen al div en una clase */
function generatePictures(data){
    data.photos.forEach(photo => {
        //console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class='gallery-info'>
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        /**añadimos la clase al html */
        gallery.appendChild(galleryImg);
       });
}

/**Capturamos la foto y la convertimos con la funcion de arriba  */
async function curatedPhotos(){
    /*const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1",
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    }
    );
    const data = await dataFetch.json();
    */
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi( fetchLink);
    /*
    * CREAMOS UNA FUNCION PARA GENERAR LOS FOTOS 
    *******************************************************
    data.photos.forEach(photo => {
        //console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
    */
   generatePictures(data);
}

async function searchPhotos(query){
    clear();
    /*const dataFetch = await fetch(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    }
    );
    const data = await dataFetch.json();
    */
   fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  
   const data = await fetchApi(fetchLink);
   /*
   GENERAMOS UNA FUNCION PARA PODER GFNERAR LAS IMAGENES
   *************************************************************
        data.photos.forEach(photo => {
        console.log(photo);
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
   
       });
    */
   generatePictures(data);
  
}
async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
curatedPhotos();

//"https://api.pexels.com/v1/photos/:id"