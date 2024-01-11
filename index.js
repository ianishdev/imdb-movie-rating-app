const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movie) => {           
    const myApiKey = "13457b8a";
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;  // Use "https" instead of "http"

    try {
        const response = await fetch(url);       
        const data = await response.json();

        console.log(data);

        showMovieData(data);
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}
 

function showMovieData(data){       // shows data on screen


    movieContainer.innerHTML = "";

    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;           // array de-structuring to extract attributes from that movie data array
    

    const movieElement = document.createElement('div')        // creates a div element
    
    movieElement.innerHTML = `<h2>${Title}</h2>` +
    `<p><strong>Rating: &#11088; </strong>${imdbRating}</p>`;     // add star symbol
    
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-info');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {                    // seperates like, comedy, action
        const p = document.createElement('p');
        p.innerText = element; 
        movieGenreElement.appendChild(p);
    });   
    
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>` +
                                `<p><strong>Duration: </strong>${Runtime}</p>` + 
                                  `<p><strong>Cast: </strong>${Actors}</p>` +
                                     `<p><strong>Plot: </strong>${Plot}</p>`;


    

    // poster
    const moivePoster = document.createElement('div');
    moivePoster.classList.add('movie-poster');
    moivePoster.innerHTML = `<img src = "${Poster}"/>`

    movieContainer.appendChild(moivePoster)
    movieContainer.appendChild(movieElement)
}




searchForm.addEventListener('submit',(e) =>
{
    e.preventDefault();         // prevents form from submitting
    const movieName = inputBox.value.trim();    // give movie name after removing all spaces
    if (movieName != ''){
        getMovieInfo(movieName);
    }
})

