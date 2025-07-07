import { config } from "./config";
import { createApp } from "./app";

async function startServer() {
  try {
    const app = await createApp();

    app.listen(config.apiPort, () => {
      console.log(
        `🔗 URL Shortener API running on http://localhost:${config.apiPort}`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
