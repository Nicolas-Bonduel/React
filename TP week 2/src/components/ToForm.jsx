
function ToForm({name, ref_}) {



    return (
        <div className="to-form">
            <p>Add a {name}</p>
            <img alt="add a comment" onClick={() => ref_.current.scrollIntoView()} src="https://static-00.iconduck.com/assets.00/arrow-down-icon-2048x2048-sef7xtr2.png" />
        </div>
    )
}

export default ToForm
