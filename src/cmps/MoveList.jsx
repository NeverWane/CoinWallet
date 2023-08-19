export default function MoveList({ moves }) {
    return (
        <section className="move-list grid">
            <h2>Your last moves</h2>
            <ul>
                {moves.map(move =>
                    <li>
                        To {move.to.name}
                        From {move.from.name}
                        At {(new Date(move.date)).toLocaleDateString()}
                    </li>)}
            </ul>
        </section>
    )
}