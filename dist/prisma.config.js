"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const config_1 = require("prisma/config");
require("dotenv/config");
(0, dotenv_1.config)({ path: ".env" });
exports.default = (0, config_1.defineConfig)({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: process.env["DATABASE_URL"],
    },
});
//# sourceMappingURL=prisma.config.js.map