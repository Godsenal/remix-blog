// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require("child_process");
require("dotenv").config();

process.env.DATABASE_URL = process.env.MIGRATE_DATABASE_URL;

const args = process.argv.slice(2);

spawn("prisma", args, { stdio: "inherit" });
