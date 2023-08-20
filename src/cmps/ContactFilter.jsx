import { useSearchParams } from "react-router-dom"

export default function ContactFilter({ onFilter }) {
    const [query] = useSearchParams()

    function getParam(key) {
        return query.get(key) || ''
    }

    function preventDefault(ev) {
        ev.preventDefault()
    }

    return (
        <form className="contact-filter" onInput={onFilter} onSubmit={preventDefault}>
            <input type="text" placeholder="Search" name="txt" defaultValue={getParam('txt')} />
        </form>
    )
}