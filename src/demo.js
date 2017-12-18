let myAxios = axios.create({
    headers: {
        'X-API-Key': myKey
    }
});

myAxios.get('https://api.cinepass.de/v4/showtimes', {
    cinema_id: cinemaId
});
