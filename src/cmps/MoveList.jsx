export default function MoveList({ moves }) {
    return (
        <section className="move-list grid">
            <h2>Your last moves</h2>
            <ul>
                {moves.map((move, idx) =>
                    <li key={idx} className="move-preview grid">
                        <div>To {move.to.name}</div>
                        <div>From {move.from.name}</div>
                        <div>Amount {move.amount.toLocaleString()} coins</div>
                        <div>At {(new Date(move.date)).toLocaleDateString()}</div>
                    </li>)}
            </ul>
        </section>
    )
}