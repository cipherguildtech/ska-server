"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const customers_module_1 = require("./customers/customers.module");
const tasks_module_1 = require("./tasks/tasks.module");
const quotations_module_1 = require("./quotations/quotations.module");
const projects_module_1 = require("./projects/projects.module");
const payment_module_1 = require("./payments/payment.module");
const project_history_module_1 = require("./project_history/project_history.module");
const auth_module_1 = require("./auth/auth.module");
const users_service_1 = require("./users/users.service");
const users_controller_1 = require("./users/users.controller");
const users_module_1 = require("./users/users.module");
const events_module_1 = require("./gateway/events.module");
const sales_service_1 = require("./sales/sales.service");
const sales_module_1 = require("./sales/sales.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [events_module_1.EventsGatewayModule,
            prisma_module_1.PrismaModule,
            customers_module_1.CustomersModule,
            tasks_module_1.TasksModule,
            projects_module_1.ProjectsModule,
            quotations_module_1.QuotationModule,
            payment_module_1.PaymentModule,
            project_history_module_1.ProjectHistoryModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            sales_module_1.SalesModule
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [app_service_1.AppService, users_service_1.UsersService, sales_service_1.SalesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map