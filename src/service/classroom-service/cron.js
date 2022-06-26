import cron from "node-cron";
import shell from "shelljs";

cron.schedule("30 12 * * * *", function () {
  if (
    shell.exec("node ./src/service/classroom-service/classroom-service.js")
      .code !== 0
  ) {
    console.log("Cron doesnt work!");
  }
});
