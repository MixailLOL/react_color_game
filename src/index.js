import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {colors_data} from './colors.js'


function get_numbers_from_text(str) { 
    let result = str.toString().split(', ');
    return(result) 
}

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function colors_div_block(){
    console.log('color_array:', this.state.color_array,'; true_color: ', this.state.true_color );
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
                                        {this.state.points_count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="colors_to_choice" className="h-2/3 w-full absolute">
                <div id="colors" className="h-full w-full flex flex-row place-content-center" >
                    {this.state.colors_id.map(color => <div key={color} onClick={()=>this.check_answer(this.state.color_array[color])}  className="p-0 m-0 h-full" style={{backgroundColor:'rgb('+this.state.color_array[color][1][0]+', '+this.state.color_array[color][1][1]+', '+this.state.color_array[color][1][2]+')', 'width':'100%'}}> </div>) }
                </div>
            </div>
        </div>
    )
}

function points_div_block(){
    return(
        <div id="good_aswer_div" className="w-full h-full text-center text-4xl relative" >
            <div className="w-full h-full relative ">
                <div className="absolute w-full h-full">
                    <div id="good_answer_out_div">
                        <div>
                            <div id="good_aswer" class="w-full h-full "  >Отлично!\nОчки++\n{this.state.true_color[0]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

function game_over_div_block(){
    console.log('GAME OVER  color_array:', this.state.color_array,'; true_color: ', this.state.true_color );
    console.log(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2] )
    return(
        <div className = "w-full h-screen select-none" onClick={()=>this.restart_game()}>
            <div id="answer_div" className="h-2/3 w-full" style={{backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', 'width':'100%'}}>
                <div className="flex flex-col h-full w-full text-center text-3xl">
                    <div className="w-full h-1/2 relative ">
                        <div className="absolute w-full h-full">
                            <div id="what_prsd_out_div">
                                <div>
                                    <div className="w-full h-1/2 "  id="what_pressed" >Вы выбрали:</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-1/2 relative " style={{backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'width':'100%'}}>
                        <div className="absolute w-full h-full">
                            <div id="clr_to_prs_out_div">
                                <div>
                                    <div className="w-full h-1/2" id="color_to_press" >Искомый цвет:</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="end_game" className=" w-full h-1/3 text-center text-4xl">
                <div className="w-full h-1/3">
                    <div className="w-full h-full relative ">
                        <div className="absolute w-full h-full">
                            <div id="end_game_out_div">
                                <div>
                                    <div id="answ_count"></div>
                                    <div id="btn_rstrt_div">
                                        <button id="btn_rstrs" onClick={()=>this.restart_game()}>
                                            Начать занаво
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colors_id: [0],
            color_array : [[]],
            true_color: [],
            points_count: 0,
            game_is_over: false,
            presed_color: [],
        };

        this.get_random_color= this.get_random_color.bind(this);
        this.check_answer= this.check_answer.bind(this);
        this.restart_game= this.restart_game.bind(this);
        this.set_true_color= this.set_true_color.bind(this);
        colors_div_block= colors_div_block.bind(this);
        game_over_div_block= game_over_div_block.bind(this);
        points_div_block= points_div_block.bind(this);

        var color =  this.get_random_color();
        this.state.color_array[0] = color; 
    }

    get_random_color(){
        var color =  arrayRandElement(colors_data);
        var numbers = get_numbers_from_text(color[1].slice(4,color[1].length-1));
        color[1] = numbers;
        return color;
    }


    check_answer(presed_color){
        if(presed_color == this.state.true_color){
            this.setState(previousState => ({
                color_array: [...previousState.color_array, this.get_random_color()],
                colors_id:[...previousState.colors_id, previousState.colors_id[previousState.colors_id.length-1]+1],
                points_count: this.state.points_count + 1
            }));
            this.setState(prevState => ({
                color_array: prevState.color_array.map(
                obj => (Object.assign(this.get_random_color()))
            )}));
        }
        else{
            var color =  this.get_random_color();
            this.state.color_array[0] = color; 
            this.setState({color_array: [color], colors_id:[0], points_count:0, game_is_over: true, presed_color: presed_color});
        }
    }

    set_true_color(){
        let true_color = arrayRandElement(this.state.color_array);
        this.state.true_color =  true_color;
    }

    restart_game(){
        this.setState({game_is_over: false})
        var color =  this.get_random_color();
        this.state.color_array[0] = color;
    }

    colors_to_choice(){
        if(this.state.game_is_over){
            return(
                 game_over_div_block()
            )
        }
        this.set_true_color();
        return(
            colors_div_block()
        )
    }
    render(){
        return(this.colors_to_choice())
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);