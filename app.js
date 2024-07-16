const auth = "yW2OMKX0fTvSXJCucxnxIJMj6iZnnPbyk83PuGrfU12OAxsw7twClW3y"
const gallery = document.querySelector(".gallery");
const searachInput = document.querySelector(".search-input");
const submiButton = document.querySelector(".submit-btn");
const searchForm = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page=1;

//fetch
async function fetchApi(url){
    const dataFetch = await fetch(
        url,
        {
         method: "GET",
         headers: {
             Accept: "application/json",
             Authorization: auth,
         },
        }
     );
     const data = await dataFetch.json();
     return data;

}

// generate
async function generateData(data){
    data.photos.forEach((photo) => {

        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <img src=${photo.src.original}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg);
    });
}

//clear
async function clear(){
    gallery.innerHTML = "";
    searachInput.value = "";
}

//curatedphoto
async function curatedphoto(){
    const data=await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
    generateData(data);

}
curatedphoto();

// searchphoto
async function searchphoto(searchValue){
    clear();
    const data=await fetchApi(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=1`);
    generateData(data);
}
searachInput.addEventListener("input", (e) => 
    {
        searchValue = e.target.value;

    }
); 
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchphoto(searchValue);
})

//more button
more.addEventListener("click", async () => {
    page++;
    if(searchValue){
        const data = await fetchApi(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`);
        generateData(data);
    }else{
        const data = await fetchApi(`https://api.pexels.com/v1/curated?per_page=15&page=${page}`);
        generateData(data);
    }
    
})