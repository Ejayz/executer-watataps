import cron from "node-cron";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const TARGET_IP = process.env.TARGET_IP || "127.0.0.1";
const TARGET_PORT = process.env.TARGET_PORT || 3000;
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "*/5 * * * * *";

const URL = `http://${TARGET_IP}:${TARGET_PORT}/send`;

console.log(`Starting cron job: ${CRON_SCHEDULE} -> ${URL}`);

cron.schedule(CRON_SCHEDULE, async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(`[${new Date().toISOString()}] Success:`, data);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);
  }
});
