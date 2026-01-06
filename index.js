const cron = require("node-cron");
require("dotenv").config();
const ping = require("ping");
const tcpPing = require("tcp-ping");
const TARGET_IP = process.env.TARGET_IP || "127.0.0.1";
const TARGET_PORT = process.env.TARGET_PORT || 3000;
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "*/5 * * * * *";
const zabbix = require('zabbix-promise');
const PingCron = "*/1 * * * * *";

const URL = `http://${TARGET_IP}:${TARGET_PORT}/send`;

console.log(`Starting cron job: ${CRON_SCHEDULE} -> ${URL}`);

// cron.schedule(CRON_SCHEDULE, async () => {
//   try {
//     const response = await fetch(URL);
//     const data = await response.json();
//     console.log(`[${new Date().toISOString()}] Success:`, data);
//   } catch (err) {
//     console.error(`[${new Date().toISOString()}] Error:`, err.message);
//   }
// });



cron.schedule(PingCron, async () => {
  try {
    tcpPing.ping(
      { address: "1.1.1.1",  attempts: 10},
      function (err, data) {
        if (err) {
          console.error(
            `[${new Date().toISOString()}] TCP Ping Error:`,
            err.message
          );
        } else {
          Ping(data.results[0].time);
     
          console.log(`[${new Date().toISOString()}] TCP Ping Success:`, data);
        }
      }
    );
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);
  }
});


const Ping = async (min) => {
  try {
    const result = await zabbix.sender({
      server: '172.16.4.150',
      host: '172.16.4.139',
      key: 'Trapper.Ping',
      value: min
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
