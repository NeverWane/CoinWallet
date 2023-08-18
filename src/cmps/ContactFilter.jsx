import { useSearchParams } from "react-router-dom"

export default function ContactFilter({ onFilter }) {
    const [query] = useSearchParams()

    function getParam(key) {
        return query.get(key) || ''
    }

    return (
        <form className="contact-filter" onInput={onFilter}>
            <input type="text" placeholder="Search" name="txt" defaultValue={getParam('txt')} />
        </form>
    )
}