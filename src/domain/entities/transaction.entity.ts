export interface TransactionOptions{
    readonly transaction_id: number;
    readonly transaction_date: Date;
    readonly old_owner_id: number;
    readonly new_owner_id: number;
    readonly amount: number;
}
//////////////////////connect with entity type
export class TransactionEntity {
    transaction_id: number;
    transaction_date: Date;
    old_owner_id: number;
    new_owner_id: number;
    amount: number;

    constructor({transaction_id, transaction_date, old_owner_id, new_owner_id, amount}: TransactionOptions){
        this.transaction_id = transaction_id;
        this.transaction_date = transaction_date;
        this.old_owner_id = old_owner_id;
        this.new_owner_id = new_owner_id;
        this.amount = amount;
    }

    static fromObject(postgresObject: {[key: string]: any}): TransactionEntity {
        const {transaction_id, transaction_date, old_owner_id, new_owner_id, amount} = postgresObject;

        if(!transaction_id || !transaction_date || !old_owner_id || !new_owner_id || !amount){
            throw new Error("More prop are required");
        }

        return new TransactionEntity({
            transaction_id,
            transaction_date: new Date(transaction_date), // Ensure date is a Date object
            old_owner_id,
            new_owner_id,
            amount
        });
    }
}