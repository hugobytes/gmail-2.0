import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "dev.nurole.com",
    https: {
      key: require("fs").readFileSync("./ssl/dev_nurole_com.key"),
      cert: require("fs").readFileSync("./ssl/dev_nurole_com.crt"),
    },
  },
})