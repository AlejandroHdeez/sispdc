export class Colaborator {

    id?: any;
    fullname: string;
    age: number;
    phoneNumber: string;
    email: string;
    companyIds: string[];


    status?: any;
    statusId?: number;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}