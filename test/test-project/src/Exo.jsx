function Exo() {

    const numbers = [4, 3, 7];

    return (
        <>
            <div className="wrapper">
                {
                    numbers.map((n, idx) => <Power3 key={idx} number={n} />)
                }
            </div>
        </>
    )

}
export default Exo

function Power3({number}) {

    return (
        <>
            <p>{number**3} ({number} ** 3)</p>
        </>
    )

}