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
            colors_id: [0],
            rgb_array : [[]],
            true_color: '',
        };

        this.get_random_color= this.get_random_color.bind(this);
        this.get_true_color= this.get_true_color.bind(this);
        this.change_colors= this.change_colors.bind(this);

        var color =  arrayRandElement(colors_data)
        var numbers = get_numbers_from_text(color[1])
        this.state.rgb_array[0] = numbers;  
    }

    get_random_color(){
        var color =  arrayRandElement(colors_data)
        var numbers = get_numbers_from_text(color[1])
        return numbers;
    }

    change_colors(presed_color){
        if(presed_color == this.state.true_color){
            this.setState(previousState => ({
                rgb_array: [...previousState.rgb_array, this.get_random_color()],
                colors_id:[...previousState.colors_id, previousState.colors_id[previousState.colors_id.length-1]+1]
            }));
            this.setState(prevState => ({
                rgb_array: prevState.rgb_array.map(
                obj => (Object.assign(this.get_random_color() ))
            )}));
        }
    }

    get_true_color(){
        this.state.true_color = arrayRandElement(this.state.colors_id);
        console.log(this.state.true_color);
    }

    colors_to_choice(){
        this.get_true_color()
        return(
            <div id="colors_to_choice" class="h-full w-full absolute">
                <div id="colors" className="h-full w-full flex flex-row place-content-center" >
                    {this.state.colors_id.map(color => <div key={color} onClick={()=>this.change_colors(color)}  class="p-0 m-0 h-full" style={{backgroundColor:'rgb('+this.state.rgb_array[color][0]+', '+this.state.rgb_array[color][1]+', '+this.state.rgb_array[color][2]+')', 'width':'100%'}}> </div>) }
                </div>
            </div>
        )
    }
    

    render(){
        return(this.colors_to_choice())
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

