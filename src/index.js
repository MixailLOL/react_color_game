import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {colors_data} from './colors.js'

function colors_to_choice(){
    return(
        <div id="colors_to_choice" class="h-2/3 w-full absolute bg-red-200">
            <div id="colors" class="h-full w-full flex flex-row place-content-center bg-blue-200"></div>
        </div>
    )
}


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colors_number: 0,
        };
    }
    render(){
        return(colors_to_choice())
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

