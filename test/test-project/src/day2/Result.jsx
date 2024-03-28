function Result({index, value, checked, checkF, deleteF}) {

    return (
        <>
            <input type="checkbox" checked={checked} onChange={() => checkF(index)}/>
            <p>input n°{index+1}: {JSON.stringify(value)}</p>
            <button onClick={() => deleteF(index)}>delete</button>
        </>
    )

}

export default Result
