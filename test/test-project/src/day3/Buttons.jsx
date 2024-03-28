function Buttons({disable, buttonDispatch}) {

    return (
        <>
            <button disabled={disable} onClick={ () => buttonDispatch({ type: 'add' }) }>Add</button>
            <button disabled={disable} onClick={ () => buttonDispatch({ type: 'multiply' }) }>Multiply</button>
        </>
    )

}

export default Buttons;