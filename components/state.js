import axios from 'axios';


const State = {
    context: {},
    modal: {
        openModal: null,
        Component: null
    },

    request: (route, body, options) => {
        return new Promise((resolve, reject) => {
            axios.post(route, body, options)
                .then(({ data }) => {
                    let response
                    if (typeof data === 'string') {
                        try {
                            response = JSON.parse(data)
                        } catch {
                            return reject('Problems with parse server\'s response')
                        }
                    } else response = data

                    if (response.ERROR) reject(response.ERROR)
                    else if (response) resolve(response)
                    else reject(false)
                }).catch(function (error) {
                    reject(error)
                })
        })
    },

    setCookie: function (name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    },

    changeTheme: null,
}

export default State