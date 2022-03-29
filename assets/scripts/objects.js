const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';

    // If the filterName input is included it will be show the includes method otherwise it only shows the movies.
    const filteredMovies = !filter
        ? movies
        : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        const { info, ...otherProps } = movie; // Object Destructuring
        console.log(otherProps);
        // const { title: movieTitle } = info;
        // const { getFormattedTitle } = movie;
        let text = movie.getFormattedTitle() + ' - ';
        // This for loop allow us to iterate the object to extract extraName and extraValue
        for (const key in info) {
            // if key is not in the title property
            if (key !== 'title') {
                // key here is the extraName and in the key's info is extraValue
                text = text + `${key}: ${info[key]}`;
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
        id: Math.random().toString(),
        getFormattedTitle: function () {
            return this.info.title.toUpperCase(); // Using this to set property to format our title.
        }
    };

    movies.push(newMovie);
    renderMovies(); // Llamamos a que ponga los datos en la lista cuando demos click al boton.
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);