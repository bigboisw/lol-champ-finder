import { createApp } from 'vue';
import App from './App.vue';
import Axios from 'axios';

const app = createApp(App);
app.config.globalProperties.$axios = Axios;
app.mount('#app');
