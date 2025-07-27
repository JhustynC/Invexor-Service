export class CreateCustomPropertyDto {
    private constructor(
        readonly _id: string,
        readonly properties?: Record<string, string>
    ) {}

    static create(props: { _id: string; properties?: Record<string, string> }): [string?, CreateCustomPropertyDto?] {
        const { _id, properties } = props;

        // Validations
        if (!_id) {
            return ["_id is required", undefined];
        }
        if (typeof _id !== 'string') {
            return ["_id must be a string", undefined];
        }
        if (properties && typeof properties !== 'object') {
            return ["properties must be an object", undefined];
        }

        return [
            undefined,
            new CreateCustomPropertyDto(_id, properties)
        ];
    }
}