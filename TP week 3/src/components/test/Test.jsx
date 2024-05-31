import { useEffect, useState } from "react";

const Test = () => {

    const [response, setResponse] = useState(null);

    useEffect(() => {

        async function test() {
            const res = fetch('http://localhost:8000/isauth', {
                method: 'Get',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(res => setResponse(JSON.stringify(res)));
        }
        test();

    }, [])

    return (
        <>
            {response}
        </>
    );
};
export default Test;