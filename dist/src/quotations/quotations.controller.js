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
exports.QuotationController = void 0;
const common_1 = require("@nestjs/common");
const quotations_service_1 = require("./quotations.service");
const create_quotation_dto_1 = require("./dto/create-quotation.dto");
let QuotationController = class QuotationController {
    quotationService;
    constructor(quotationService) {
        this.quotationService = quotationService;
    }
    getAll() {
        return this.quotationService.getAll();
    }
    getAllById(id) {
        return this.quotationService.getAllById(id);
    }
    async create(dto) {
        return this.quotationService.createQuotation(dto);
    }
    update(id, body) {
        return this.quotationService.update(id, body);
    }
    getAllByProjectStatus(id, status) {
        return this.quotationService.getAllByProjectStatus(id, status);
    }
    updateStatus(id, status) {
        return this.quotationService.updateStatus(id, status);
    }
    getAllByStatus(status) {
        return this.quotationService.getAllByStatus(status);
    }
    getAllBycode(code) {
        return this.quotationService.getAllBycode(code);
    }
};
exports.QuotationController = QuotationController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('all_by_id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "getAllById", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quotation_dto_1.CreateQuotationDto]),
    __metadata("design:returntype", Promise)
], QuotationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('all_by_project_status/:id/:status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "getAllByProjectStatus", null);
__decorate([
    (0, common_1.Put)('update_status/:id/:status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('all_by_status/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "getAllByStatus", null);
__decorate([
    (0, common_1.Get)('all_by_code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationController.prototype, "getAllBycode", null);
exports.QuotationController = QuotationController = __decorate([
    (0, common_1.Controller)('quotation'),
    __metadata("design:paramtypes", [quotations_service_1.QuotationServices])
], QuotationController);
//# sourceMappingURL=quotations.controller.js.map