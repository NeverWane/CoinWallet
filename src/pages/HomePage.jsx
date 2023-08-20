import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import MoveList from "../cmps/MoveList";

export default function HomePage() {
    const [user, setUser] = useState()

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const user = await userService.getUser()
        setUser(user)
    }

    function getMoves() {
        return user.moves.slice(0, 3)
    }

    if (!user) return (<div>Loading...</div>)
    return (
        <section className="home-page">
            <h2>Hello {user.name}!</h2>
            Coins: {user.coins}
            <MoveList moves={getMoves()} />
        </section>
    )
}