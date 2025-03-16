import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; 
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
  	host: true, // allow external access
  	port: 5173,
  	strictPort: true,
  	hmr: {
  		clientPort: 5173,
  	},
  	allowedHosts: ['f416-76-28-209-119.ngrok-free.app'],
  },
});
