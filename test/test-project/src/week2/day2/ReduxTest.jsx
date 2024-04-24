import { useSelector } from "react-redux";
import store from "./store/index.js";
import { selectTest1, selectTest2 } from "./selectors/index.js";

function ReduxTest() {

    store.subscribe(
        () => console.log(store.getState())
    );

    store.dispatch( {type: 'TEST1/set', payload: {test: 'test 1'}} );
    store.dispatch( {type: 'TEST2/set', payload: {test: 'test 2'}} );

    const data1 = useSelector(selectTest1);
    console.log(data1);

    const data2 = useSelector(selectTest2);
    console.log(data2);

    return (
        <>

        </>
    )
}

export default ReduxTest;