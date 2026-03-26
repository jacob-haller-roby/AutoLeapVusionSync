import dotenv from "dotenv";
import { CronJob } from "cron";

import {getItems} from "./autoleap/getItems.js";
import {toFile} from "./utilities/toFile.js";

dotenv.config();

const everyDay = '0 0 0 * * *';

const job = new CronJob(
    everyDay,
    () => {
        getItems(1).then(toFile);
    }
);
job.start();
