import axios from "axios";

export default function setup() {
  axios.interceptors.request.use(
    function (config) {
      if (config.delay) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(config), config.delay)
        );
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      //set also when is 403 becuse some photos show this error (not only 404)
      if (error.response.status == 404 || error.response.status == 403) {
        if (!error.config || !error.config.retry) {
          return Promise.reject(error);
        }

        error.config.retry -= 1;

        //change time of delay
        error.config.delay = error.config.delay * 2;
        return axios(error.config);
      }
    }
  );
}
