var axios = require('axios');

var instance = axios.create({
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token'
});

export default instance;
