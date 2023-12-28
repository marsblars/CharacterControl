import react from "@vitejs/plugin-react";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  plugins: [react()],
  assetsInclude: ['./src/assets1/3d/*.glb', './public/*.glb', '*.glb'],
  root: "example/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: "./exampleDist",
    emptyOutDir: true,
    sourcemap: true,
  },
};
