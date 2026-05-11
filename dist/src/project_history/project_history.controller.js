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
exports.ProjectHistoryController = void 0;
const common_1 = require("@nestjs/common");
const project_history_service_1 = require("./project_history.service");
let ProjectHistoryController = class ProjectHistoryController {
    projectHistoryService;
    constructor(projectHistoryService) {
        this.projectHistoryService = projectHistoryService;
    }
    getAll() {
        return this.projectHistoryService.getAll();
    }
    create(data) {
        return this.projectHistoryService.create(data);
    }
    update(id, data) {
        return this.projectHistoryService.update(id, data);
    }
};
exports.ProjectHistoryController = ProjectHistoryController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectHistoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectHistoryController.prototype, "update", null);
exports.ProjectHistoryController = ProjectHistoryController = __decorate([
    (0, common_1.Controller)('project-history'),
    __metadata("design:paramtypes", [project_history_service_1.ProjectHistoryService])
], ProjectHistoryController);
//# sourceMappingURL=project_history.controller.js.map