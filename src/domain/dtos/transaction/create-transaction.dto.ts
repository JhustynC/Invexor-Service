import { ResourceOptions } from "../../entities/resource.entity";
import { TransactionOptions } from "../../entities/transaction.entity";


export class CreateTransactionDto{
    private constructor(
        readonly transaction_id: Int16Array,
        readonly transaction_date: Date,
        readonly old_owner_id: Int16Array,
        readonly new_owner_id: Int16Array,
        readonly amount: number
    ){}

    static create(props: Partial<TransactionOptions>): [string?, CreateTransactionDto?]{

        const {transaction_id, transaction_date, old_owner_id, new_owner_id, amount} = props

        //! Validations
        if(!transaction_id) return ["", undefined]
        if(!transaction_date) return ["", undefined]
        if(!old_owner_id) return ["", undefined]
        if(!new_owner_id) return ["", undefined]
        if(!amount) return ["", undefined]

        return [
            undefined,
            new CreateTransactionDto(
                transaction_id,
                transaction_date,
                old_owner_id,
                new_owner_id,
                amount
            )
        ]
    }
}