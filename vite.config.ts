import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//import axios from 'axios';
//import VueAxios from 'vue-axios';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  //server: {
    //headers: { "Access-Control-Allow-Origin": "*" },
   // https: false,
   // port: 5173,
    //host: 'localhost',
    // proxy: {
      // with options
      // '/api/*': {
         //  target: 'https://localhost:8888',
           //changeOrigin: true,
           // secure: false,      
           // ws: true,
       // }
//    }
 // }
});

