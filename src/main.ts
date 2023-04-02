import { createApp } from "vue";
import App from "./App.vue";
import interceptorsSetup from "./helpers/axios-interceptor";

// Styles
import "./scss/main.scss";

// Axios setup
interceptorsSetup();

createApp(App).mount("#app");
