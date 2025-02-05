// // import { Matches,
// //     Contains,
// //     IsInt,
// //     Length,
// //     IsEmail,
// //     IsFQDN,
// //     IsDate,
// //     Min,
// //     Max,
// //     IsOptional,
// //     validateOrReject,
// // } from "class-validator"
// // import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"
// // import { bloodType } from "../enum/bloodTypes"
// // import { gender } from "../enum/gender"
// //extend BaseEntity to use activer record pattern
// // @Entity()
// // export class User extends BaseEntity {
// //     @PrimaryGeneratedColumn()
// //     id: number

// //     @Column()
// //     firstName: string

// //     @Column()
// //     lastName: string

// //     // @Column()
// //     // age: number

// //     @Column({ unique: true })
// //     @IsEmail()
// //     email: string

// //     @Column({ unique: true })
// //     @Matches(/^0\d{10}$/, {
// //         message: 'Phone number must be 11 digits long and start with 0', //msg appear in response when validation fails
// //     })
// //     phonenumber: string

// //     @Column()
// //     address: string

// //     @Column({ unique: true })
// //     @Matches(/^\d{14}$/, {
// //         message: 'National number must be exactly 14 digits long and contain only numbers.',
// //     })
// //     nationalNumber: string;

// //     @IsOptional()
// //     @Column({ nullable: true, unique: true })
// //     @Matches(/^\d{14}$/, {
// //         message: 'National number must be exactly 14 digits long and contain only numbers.',
// //     })
// //     FathernationalNumber?: string;

// //     @IsOptional()
// //     @Column({ nullable: true, unique: true })
// //     @Matches(/^\d{14}$/, {
// //         message: 'National number must be exactly 14 digits long and contain only numbers.',
// //     })
// //     MothernationalNumber?: string;

// //     @Column()
// //     @Length(8, 255, { message: 'Password must be at least 8 characters long.' })  // Minimum length is 8 characters
// //     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/, { //validate password regex
// //         message: 'Password must contain at least one letter, one number, and one special character.',
// //     })  // Ensures password contains letters, numbers, and special characters
// //     password: string;

// //     @Column()
// //     confirmPassword: string;

// //     async validatePasswordMatch() {
// //         if (this.password !== this.confirmPassword) {
// //             throw new Error('Passwords must match');
// //         }
// //     }

// // //     @Column({ nullable: true })  // el gender momken yeb2a NULL fel database
// // //   gender?: string;

// // @Column({ nullable: true })
// // bloodType?: string | null; 

// //     @Column()
// //     gender : gender

// //     @Column()
// //     birthDate : Date

// //     @Column("simple-array", {nullable : true})
// //     Allergy ?: string[]

// //     // @Column("simple-array")
// //     // foodAllergies: string[]

// //     @Column()
// //     weight:number;

// //     @Column()
// //     height:number;
    
// //     @Column("simple-array", {nullable : true})
// //     motherDisease? : string[]

// //     @Column("simple-array", {nullable : true})
// //     fatherDisease? : string[]

// //     @BeforeInsert()
// //     @BeforeUpdate()
// //     async validate() {
// //         await validateOrReject(this);
// //     }

// // }



// import { Matches, IsEmail, Length, IsOptional, validateOrReject, IsEnum } from "class-validator";
// import { Entity, PrimaryGeneratedColumn, CreateDateColumn,Unique,UpdateDateColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
// import { bloodType } from "../enum/bloodTypes";
// import { gender } from "../enum/gender";

// @Entity()
// @Unique(["email", "nationalNumber", "FathernationalNumber", "MothernationalNumber"])
// export class User extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     firstName!: string;

//     @Column()
//     lastName!: string;

//     @Column({ unique: true })
//     @IsEmail()
//     email!: string;

//     @Column({ unique: true })
//     @Matches(/^0\d{10}$/, {
//         message: 'Phone number must be 11 digits long and start with 0',
//     })
//     phonenumber!: string;

//     @Column()
//     address!: string;

//     @Column({ unique: true })
//     @Matches(/^\d{14}$/, {
//         message: 'National number must be exactly 14 digits long and contain only numbers.',
//     })
//     nationalNumber!: string;

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
//     @Length(8, 255, { message: 'Password must be at least 8 characters long.' })
//     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/, {
//         message: 'Password must contain at least one letter, one number, and one special character.',
//     })
//     password!: string;

//     @Column()
//     confirmPassword!: string;

//     async validatePasswordMatch() {
//         if (this.password !== this.confirmPassword) {
//             throw new Error('Passwords must match');
//         }
//     }
//     @IsOptional()
//     @Column({
//         type: "enum",
//         enum: bloodType,  // Using enum for bloodType
//         nullable: true
//     })
//     bloodType?: bloodType | null;

//     @Column()
//     @IsEnum(gender)
//     gender!: gender;

//     @Column()
//     birthDate!: Date;

//     @IsOptional()
//     @Column("simple-array", { nullable: true })
//     Allergy?: string[];

//     @Column()
//     weight!: number;

//     @Column()
//     height!: number;

//     @IsOptional()
//     @Column("simple-array", { nullable: true })
//     motherDisease?: string[];

//     @IsOptional()
//     @Column("simple-array", { nullable: true })
//     fatherDisease?: string[];

//     // @Column({ nullable: true })
//     // age?: number;

//     @BeforeInsert()
//     @BeforeUpdate()
//     async validate() {
//         await validateOrReject(this);
//         await this.validatePasswordMatch(); 
//     }
//     @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
//   @Column({ default: "patient" })
// role: string;
// }
import { Matches, IsEmail, Length, IsOptional, validateOrReject, IsEnum } from "class-validator";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Unique, UpdateDateColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
import { bloodType } from "../enum/bloodTypes";
import { gender } from "../enum/gender";

@Entity()
@Unique(["email", "nationalNumber","phonenumber"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column({ unique: true })
    @Matches(/^0\d{10}$/, {
        message: 'Phone number must be 11 digits long and start with 0',
    })
    phonenumber!: string;

    @Column()
    address!: string;

    @Column({ unique: true })
    @Matches(/^\d{14}$/, {
        message: 'National number must be exactly 14 digits long and contain only numbers.',
    })
    nationalNumber!: string;

    @IsOptional()
    @Column({ nullable: true })
    @Matches(/^\d{14}$/, {
        message: 'National number must be exactly 14 digits long and contain only numbers.',
    })
    FathernationalNumber?: string;

    @IsOptional()
    @Column({ nullable: true})
    @Matches(/^\d{14}$/, {
        message: 'National number must be exactly 14 digits long and contain only numbers.',
    })
    MothernationalNumber?: string;

    @Column()
    @Length(8, 255, { message: 'Password must be at least 8 characters long.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    })
    password!: string;

    @Column()
    confirmPassword!: string;

    async validatePasswordMatch() {
        if (this.password !== this.confirmPassword) {
            throw new Error('Passwords must match');
        }
    }

    @IsOptional()
    @Column({
        type: "enum",
        enum: bloodType,
        nullable: true
    })
    bloodType?: bloodType | null;

    @Column()
    @IsEnum(gender)
    gender!: gender;

    @Column()
    birthDate!: Date;

    @IsOptional()
    @Column("simple-array", { nullable: true })
    Allergy?: string[];

    @Column()
    weight!: number;

    @Column()
    height!: number;

    @IsOptional()
    @Column("simple-array", { nullable: true })
    motherDisease?: string[];

    @IsOptional()
    @Column("simple-array", { nullable: true })
    fatherDisease?: string[];

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
        await this.validatePasswordMatch();
    }

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ default: "patient" })
    role!: string;
}