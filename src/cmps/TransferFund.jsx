export default function TransferFund({ user, onTransfer }) {
    return (
        <form className="transfer-fund grid" onSubmit={onTransfer}>
            <h3>Transfer coins to {user.nickname || user.name}</h3>
            <label>
                Amount
                <input type="number" min={0} placeholder="Amount" name="amount" />
                <button className="btn btn-transfer">Transfer</button>
            </label>
        </form>
    )
}