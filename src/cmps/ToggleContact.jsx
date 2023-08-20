export default function ToggleContact({ contactId, onAdd, onRemove, contacts }) {
    const isContact = contacts.find(contact => contact._id === contactId) || false

    function getClassName() {
        return `btn btn-toggle-contact ${isContact ? 'btn-remove' : 'btn-add'}`
    }

    function getOnClick() {
        return isContact ? onRemove(contactId) : onAdd(contactId)
    }

    function getText() {
        return isContact ? 'Remove' : 'Add'
    }

    return (
        <button className={getClassName()} onClick={getOnClick()}>
            {getText()}
        </button>
    )
}