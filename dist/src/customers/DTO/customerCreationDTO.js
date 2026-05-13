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
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerCreationDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class customerCreationDto {
    name;
    phone;
    email;
    address;
    customer_type;
    referal;
}
exports.customerCreationDto = customerCreationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], customerCreationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)('IN'),
    __metadata("design:type", String)
], customerCreationDto.prototype, "phone", void 0);
__decorate([
<<<<<<< HEAD
=======
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], customerCreationDto.prototype, "email", void 0);
__decorate([
>>>>>>> bd347ceb7eddaaa7464ea4b26cc68366312843fa
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], customerCreationDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], customerCreationDto.prototype, "customer_type", void 0);
//# sourceMappingURL=customerCreationDTO.js.map