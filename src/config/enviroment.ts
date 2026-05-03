export const config = {
  API_URL: "/api/",
  NODE_ENV: import.meta.env.VITE_NODE_ENV as string,

  isDevelopment: import.meta.env.MODE === "development",
  isProduction: import.meta.env.MODE === "production",
};

if (config.isDevelopment) {
  console.log("Kullanılan config:", {
    API_URL: config.API_URL,
    NODE_ENV: config.NODE_ENV,
    mode: import.meta.env.MODE,
  });
}
