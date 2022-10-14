import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {colors_data} from './colors.js'


function get_numbers_from_text(str) {
    let result = str.match(/(-?\d+(\.\d+)?)/g).map(v => +v);
    return(result)
}

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colors_number: 0,
            rgb_array : [100,0,0],
        };
        this.get_random_color= this.get_random_color.bind(this);
    }

    get_random_color(){
        var color =  arrayRandElement(colors_data)
        var numbers = get_numbers_from_text(color[1])
        console.log(numbers)
        this.setState({rgb_array: numbers});
    }


    colors_to_choice(){
        return(
            <div id="colors_to_choice" class="h-2/3 w-full absolute">
                <div id="colors" className="h-full w-full flex flex-row place-content-center" style={{backgroundColor:'rgb('+this.state.rgb_array[0]+', '+this.state.rgb_array[1]+', '+this.state.rgb_array[2]+')'}} onClick={this.get_random_color}></div>
            </div>
        )
    }
    

    render(){
        return(this.colors_to_choice())
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

