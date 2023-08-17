import { useEffect, useState } from "react";
import { userService } from "../services/user.service";

export default function HomePage() {
    const [user, setUser] = useState()

    useEffect(() => {
        getUser()
    }, [])

   function toBTC(coins) {
        return 100
    }

    async function getUser() {
        const user = await userService.getUser()
        setUser(user)
    }

    if (!user) return (<div>Loading...</div>)
    return (
        <section className="home-page">
            <h2>Hello {user.name}!</h2>
            Coins: {user.coins}
            BTC: {toBTC(user.coins)}
        </section>
    )
}