"use strict";
// import { Matches,
//     Contains,
//     IsInt,
//     Length,
//     IsEmail,
//     IsFQDN,
//     IsDate,
//     Min,
//     Max,
//     IsOptional,
//     validateOrReject,
// } from "class-validator"
// import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"
// import { bloodType } from "../enum/bloodTypes"
// import { gender } from "../enum/gender"
//extend BaseEntity to use activer record pattern
// @Entity()
// export class User extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number
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
exports.User = void 0;
//     @Column()
//     firstName: string
//     @Column()
//     lastName: string
//     // @Column()
//     // age: number
//     @Column({ unique: true })
//     @IsEmail()
//     email: string
//     @Column({ unique: true })
//     @Matches(/^0\d{10}$/, {
//         message: 'Phone number must be 11 digits long and start with 0', //msg appear in response when validation fails
//     })
//     phonenumber: string
//     @Column()
//     address: string
//     @Column({ unique: true })
//     @Matches(/^\d{14}$/, {
//         message: 'National number must be exactly 14 digits long and contain only numbers.',
//     })
//     nationalNumber: string;
//     @IsOptional()
//     @Column({ nullable: true, unique: true })
//     @Matches(/^\d{14}$/, {
//         message: 'National number must be exactly 14 digits long and contain only numbers.',
//     })
//     FathernationalNumber?: string;
//     @IsOptional()
//     @Column({ nullable: true, unique: true })
//     @Matches(/^\d{14}$/, {
//         message: 'National number must be exactly 14 digits long and contain only numbers.',
//     })
//     MothernationalNumber?: string;
//     @Column()
//     @Length(8, 255, { message: 'Password must be at least 8 characters long.' })  // Minimum length is 8 characters
//     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/, { //validate password regex
//         message: 'Password must contain at least one letter, one number, and one special character.',
//     })  // Ensures password contains letters, numbers, and special characters
//     password: string;
//     @Column()
//     confirmPassword: string;
//     async validatePasswordMatch() {
//         if (this.password !== this.confirmPassword) {
//             throw new Error('Passwords must match');
//         }
//     }
// //     @Column({ nullable: true })  // el gender momken yeb2a NULL fel database
// //   gender?: string;
// @Column({ nullable: true })
// bloodType?: string | null; 
//     @Column()
//     gender : gender
//     @Column()
//     birthDate : Date
//     @Column("simple-array", {nullable : true})
//     Allergy ?: string[]
//     // @Column("simple-array")
//     // foodAllergies: string[]
//     @Column()
//     weight:number;
//     @Column()
//     height:number;
//     @Column("simple-array", {nullable : true})
//     motherDisease? : string[]
//     @Column("simple-array", {nullable : true})
//     fatherDisease? : string[]
//     @BeforeInsert()
//     @BeforeUpdate()
//     async validate() {
//         await validateOrReject(this);
//     }
// }
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const bloodTypes_1 = require("../enum/bloodTypes");
const gender_1 = require("../enum/gender");
let User = class User extends typeorm_1.BaseEntity {
    async validatePasswordMatch() {
        if (this.password !== this.confirmPassword) {
            throw new Error('Passwords must match');
        }
    }
    // @Column({ nullable: true })
    // age?: number;
    async validate() {
        await (0, class_validator_1.validateOrReject)(this);
        await this.validatePasswordMatch();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.Matches)(/^0\d{10}$/, {
        message: 'Phone number must be 11 digits long and start with 0',
    }),
    __metadata("design:type", String)
], User.prototype, "phonenumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: 'National number must be exactly 14 digits long and contain only numbers.',
    }),
    __metadata("design:type", String)
], User.prototype, "nationalNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: 'National number must be exactly 14 digits long and contain only numbers.',
    }),
    __metadata("design:type", String)
], User.prototype, "FathernationalNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: 'National number must be exactly 14 digits long and contain only numbers.',
    }),
    __metadata("design:type", String)
], User.prototype, "MothernationalNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(8, 255, { message: 'Password must be at least 8 characters long.' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "confirmPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: bloodTypes_1.bloodType,
        nullable: true
    }),
    __metadata("design:type", Object)
], User.prototype, "bloodType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEnum)(gender_1.gender),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "Allergy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "motherDisease", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "fatherDisease", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "validate", null);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
