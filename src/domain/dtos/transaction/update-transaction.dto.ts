export class UpdateTransactionDto{
    private constructor(
        readonly transaction_id: Int16Array,
        readonly transaction_date?: Date,
        readonly old_owner_id?: Int16Array,
        readonly new_owner_id?: Int16Array,
        readonly amount?: number
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.transaction_date) values.transaction_date = this.transaction_date
        if(this.old_owner_id) values.old_owner_id = this.old_owner_id
        if(this.new_owner_id) values.new_owner_id = this.new_owner_id
        if(this.amount) values.amount = this.amount

        return values
    }

    static create(props: {[key:string]:any}): [string?, UpdateTransactionDto?] {
        const {transaction_id, transaction_date, old_owner_id, new_owner_id, amount} = props

        if(transaction_id){
            //? Validations
        }

        return [
            undefined, 
            new UpdateTransactionDto(
                transaction_id, 
                transaction_date, 
                old_owner_id, 
                new_owner_id, 
                amount)]
    }
}