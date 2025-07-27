export class UpdateCustomPropertyDto {
    private constructor(
        readonly properties?: Record<string, string>
    ) {}

    static create(props: Partial<{ properties: Record<string, string> }>): [string?, UpdateCustomPropertyDto?] {
        const { properties } = props;

        // Validations
        if (properties && typeof properties !== 'object') {
            return ["properties must be an object", undefined];
        }

        return [
            undefined,
            new UpdateCustomPropertyDto(properties)
        ];
    }
}