const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.getElementById("main");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");
// const prev = document.querySelector(".prev");
// const next = document.querySelector(".next");

// var curPage = 1;
// var pages = ["page=1","page=2"];

// prev.addEventListener("click", ()=>{
//     curPage--
//     updatePages()
// })
// next.addEventListener("click", ()=>{
//     curPage++
//     updatePages()
// })

// function updatePages() {
//     if(curPage > pages.length){
//         curPage = 1;
//     }else if(curPage < 1){
//         curPage = pages.length
//     }
//     console.log(pages)
// }

getMovies(APIURL);

async function getMovies(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        updateMovies(data.results);
    } catch (error) {
       console.log(error + alert("An error happened, Please try again")); 
    }
    
}

function updateMovies(movies){
    mainEl.innerHTML = "";

    movies.forEach((movie) => {
        const {overview, poster_path, title, vote_average} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.setAttribute("id", `${getBorderAverage(vote_average)}`)

        movieEl.innerHTML = `
        <img src="${ IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getVoteAverage(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
                <h4>Overview</h4>
                <p>${overview}</p>
        </div>`
        mainEl.appendChild(movieEl);
    });
}

function getVoteAverage(vote) {
    if(vote >= 8){
        return "green";
    }else if(vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}

function getBorderAverage(border){
    if(border >= 8){
        return "chartreuse"
    }else if(border >= 5){
        return "darkorange";
    }else{
        return "crimson";
    }
}

formEl.addEventListener("submit", (e)=>{
    e.preventDefault();

    const searchTerm = searchEl.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        searchEl.value = "";
    }
})





    