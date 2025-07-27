export interface CustomProperty {
    _id: string;
    properties: Record<string, string>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateCustomPropertyDto {
    _id: string;
    properties?: Record<string, string>;
}

export interface UpdateCustomPropertyDto {
    properties?: Record<string, string>;
}