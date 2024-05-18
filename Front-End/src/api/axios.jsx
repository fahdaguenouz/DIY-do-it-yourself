import axios from 'axios';


export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },

})

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

export const fetchCSRFToken = () => {
    const csrfAxios = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,  // Ensure this does NOT include '/api'
        withCredentials: true
    });
    return csrfAxios.get('/sanctum/csrf-cookie');
};

// axiosClient.interceptors.request.use((config) => {
//     const xsrfToken = getCookie('XSRF-TOKEN');
//     if (xsrfToken) {
//         config.headers['X-XSRF-TOKEN'] = xsrfToken;
//     }
//     return config;
// });

// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }



