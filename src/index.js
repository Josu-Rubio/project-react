import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './routing';


function App() {
    return (
        <div>
            <Routing />
        </div>
    );
}

export default App;


ReactDOM.render(<App />, document.getElementById('root'));

