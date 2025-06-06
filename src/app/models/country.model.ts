export class Country {

  countryId: any;
  id: string;
  name?: string;
  description?: string;
  code?: string;

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