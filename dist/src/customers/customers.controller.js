"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersContoller = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const customerCreationDTO_1 = require("./DTO/customerCreationDTO");
let CustomersContoller = class CustomersContoller {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async getCustomersCount() {
        return await this.customersService.getCustomersCount();
    }
    async getRecentCustomers() {
        return await this.customersService.getRecentCustomers();
    }
    async getCustomers() {
        return await this.customersService.getCustomers();
    }
    async createCustomer(requestBody) {
        return await this.customersService.createCustomer(requestBody);
    }
    async getCustomer(id) {
        return await this.customersService.getCustomer(id);
    }
    async updateCustomer(id, requestBody) {
        return await this.customersService.updateCustomer(id, requestBody);
    }
};
exports.CustomersContoller = CustomersContoller;
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersContoller.prototype, "getCustomersCount", null);
__decorate([
    (0, common_1.Get)('recent_customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersContoller.prototype, "getRecentCustomers", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersContoller.prototype, "getCustomers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerCreationDTO_1.customerCreationDto]),
    __metadata("design:returntype", Promise)
], CustomersContoller.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersContoller.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomersContoller.prototype, "updateCustomer", null);
exports.CustomersContoller = CustomersContoller = __decorate([
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersContoller);
//# sourceMappingURL=customers.controller.js.map