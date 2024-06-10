import { app } from "@/app";

// Run the server!
async function start() {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log(`🔛 listening on port http://localhost:3000/ 🔛`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
