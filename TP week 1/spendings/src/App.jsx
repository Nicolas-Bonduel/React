import Filter from './Components/Filter.jsx';
import Table from './Components/Table.jsx';
import TotalSpendings from './Components/TotalSpendings.jsx';

import './index.css';
import './spendings.css';

function App() {

    return (
        <>
            <div id="main">

                <div className="disclaimer" style={{"marginTop": "20vh"}}>

                    <span>Keep calm and stay focused !</span>
                    <br />

                </div>

                <Filter />

                <Table />

                <TotalSpendings />
            
            </div>
        </>
    )
}

export default App