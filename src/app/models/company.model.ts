export class Company {

    id: string;
    nit: string;
    socialReason: string;
    comercialName: string;
    phoneNumber: string;
    email: string;
    paisId: string;
    departamentoId: string;
    municipioId: string;

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