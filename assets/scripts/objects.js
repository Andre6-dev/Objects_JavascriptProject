const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = () => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';

    movies.forEach((movie) => {
        const movieEl = document.createElement('li');
        let text = movie.info.title + ' - ';
        // This for loop allow us to iterate the object to extract extraName and extraValue
        for (const key in movie.info) {
            // if key is not in the title property
            if (key !== 'title') {
                // key here is the extraName and in the key's info is extraValue
                text = text + `${key}: ${movie.info[key]}`;
            }
        }
        // Print the content of extraName and extraValue
        movieEl.textContent = text;
        movieList.append(movieEl); // Agregamos la pelicula a la lista del html
    })
}

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === '') {
        return;
    }

    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random()
    };

    movies.push(newMovie);
    renderMovies(); // Llamamos a que ponga los datos en la lista cuando demos click al boton.
};

addMovieBtn.addEventListener('click', addMovieHandler);