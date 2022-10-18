import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {colors_data} from './colors.js'


function get_numbers_from_text(str) { 
    console.log('Color come: ',str);
    //var result = str.match(/(-?\d+(\.\d+)?)/g).map(v => +v); 
    let result = str.toString().split(', ');
    console.log(result)
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
            color_array : [[]],
            true_color: '',
        };

        this.get_random_color= this.get_random_color.bind(this);
        this.get_true_color= this.get_true_color.bind(this);
        this.change_colors= this.change_colors.bind(this);

        var color =  this.get_random_color();
        this.state.color_array[0] = color; 
    }

    get_random_color(){
        var color =  arrayRandElement(colors_data)
        console.log('Full color:', color)
        var numbers = get_numbers_from_text(color[1].slice(4,color[1].length-2))
        color[1] = numbers
        return color;
    }

    change_colors(presed_color){
        if(presed_color == this.state.true_color){
            this.setState(previousState => ({
                color_array: [...previousState.color_array, this.get_random_color()],
                colors_id:[...previousState.colors_id, previousState.colors_id[previousState.colors_id.length-1]+1]
            }));
            this.setState(prevState => ({
                color_array: prevState.color_array.map(
                obj => (Object.assign(this.get_random_color() ))
            )}));
        }
        else{
            var color =  this.get_random_color();
            this.state.color_array[0] = color; 
            this.setState({color_array: [color], colors_id:[0], true_color: ''});
        }
    }

    get_true_color(){
        this.state.true_color = arrayRandElement(this.state.color_array);
    }

    colors_to_choice(){
        this.get_true_color()
        return(
            <div className = "w-full h-screen select-none">
                <div id="text_area" className=" w-full h-1/3 text-center text-4xl ">
                    <div className="w-full h-1/3 relative ">
                        <div className="absolute w-full h-full" >
                            <div>
                                <div>
                                    <div id="viberi_color">
                                    Найди цвет:
                                    </div>
                                    <div id="color_name">
                                        {this.state.true_color[0]}
                                    </div>
                                    <div className="flex flex-row text-center place-content-center">
                                        <div>
                                            Очки:
                                        </div>
                                        <div id="good_answers_counter">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colors_to_choice" className="h-2/3 w-full absolute">
                    <div id="colors" className="h-full w-full flex flex-row place-content-center" >
                        {this.state.colors_id.map(color => <div key={color} onClick={()=>this.change_colors(this.state.color_array[color])}  className="p-0 m-0 h-full" style={{backgroundColor:'rgb('+this.state.color_array[color][1][0]+', '+this.state.color_array[color][1][1]+', '+this.state.color_array[color][1][2]+')', 'width':'100%'}}> </div>) }
                    </div>
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