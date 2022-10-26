import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {colors_data} from './colors.js'
import bridge from '@vkontakte/vk-bridge';



/*
bridge.send("VKWebAppInit").then( (data) => {console.log(data) });
bridge.subscribe((e) => console.log("vkBridge event", e));
bridge.send("VKWebAppAddToFavorites").then( (data) => {console.log(data) });
*/

function get_numbers_from_text(str) { 
    var result = str.toString().split(', ');
    return(result) 
}

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function change_bg_color(){

    var new_color = [0,0,0];
    let i;
    for( i=0; i < (this.state.color_array).length; i++){
        var color_numbers = this.state.color_array[i][1];
        new_color[0] += Number(color_numbers[0]);
        new_color[1] += Number(color_numbers[1]);
        new_color[2] += Number(color_numbers[2]);
    }
    new_color[0] = Math.round(((new_color[0]/(this.state.color_array).length)*2));
    new_color[1] = Math.round(((new_color[1]/(this.state.color_array).length)*2));
    new_color[2] = Math.round(((new_color[2]/(this.state.color_array).length)*2));
    this.state.bg_color = new_color;
}


function change_txt_color(r,g,b){
    
    if(Number(r)+Number(g)+Number(b) > ((255*3)*0.69)){
        console.log('black', r, g, b)
        return 'rgb(0,0,0)';
    }else{
        console.log('white', r, g, b)
        return 'rgb(255,255,255)';
    }
    
}


function colors_div_block(){
    return(
        <div className = "w-full h-screen select-none" style={{fontFamily: 'Roboto, sans-serif'}}>
            <div id="text_area" className=" w-full h-1/3 text-center text-4xl " style={{backgroundColor:'rgb('+this.state.bg_color[0]+', '+this.state.bg_color[1]+', '+this.state.bg_color[2]+')', fontFamily: 'Roboto, sans-serif', 'color': change_txt_color(this.state.bg_color[0],this.state.bg_color[1],this.state.bg_color[2])}}>
                <div className="w-full h-full relative ">
                    <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                            <div style={{marginLeft: 'auto', marginRight: 'auto'} }>
                                <div id="viberi_color">
                                Выбери цвет:
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
        <div id="good_aswer_div" className="w-full h-screen select-none text-center text-4xl relative" style={{backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'width':'100%', fontFamily: 'Roboto, sans-serif', 'color': change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}} onClick={()=>this.check_answer('next')} >
            <div className="w-full h-full relative ">
                <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                    <div id="good_answer_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                            <div id="good_aswer" className="w-full h-full "  ><p>Отлично!</p><p>Очки++</p><p>{this.state.true_color[0]}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function game_over_div_block(){
    return(
        <div className = "w-full h-screen select-none" onClick={()=>this.restart_game()} style={{fontFamily: 'Roboto, sans-serif'}}>
            <div id="answer_div" className="h-2/3 w-full" style={{backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', 'width':'100%', 'color': change_txt_color(this.state.presed_color[1][0], this.state.presed_color[1][1], this.state.presed_color[1][2])}}>
                <div className="flex flex-col h-full w-full text-center text-3xl">
                    <div className="w-full h-1/2 relative ">
                        <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                            <div id="what_prsd_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    <div className="w-full h-1/2 "  id="what_pressed" >Вы выбрали: {this.state.presed_color[0]}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-1/2 relative " style={{backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'width':'100%', 'color': change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}}>
                        <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                            <div id="clr_to_prs_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    <div className="w-full h-1/2" id="color_to_press" >Искомый цвет: {this.state.true_color[0]}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="end_game" className=" w-full h-1/3 text-center text-4xl" style={{backgroundColor:'rgb('+this.state.bg_color[0]+', '+this.state.bg_color[1]+', '+this.state.bg_color[2]+')', 'width':'100%', 'color': change_txt_color(this.state.bg_color[0], this.state.bg_color[1], this.state.bg_color[2])}}>
                <div className="w-full h-full relative ">
                    <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                        <div id="end_game_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                            <div  style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                <div id="btn_rstrt_div" >
                                        <p>Всего очков: {this.state.old_points_count}</p> Начать занаво
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
            colors_id: [0,1],
            color_array : [[],[]],
            true_color: '',
            points_count: 0,
            game_state: 'game',
            presed_color: [],
            bg_color:[],
            old_points_count: 0,
        };

        this.get_random_color = this.get_random_color.bind(this);
        this.check_answer = this.check_answer.bind(this);
        this.restart_game = this.restart_game.bind(this);
        this.set_true_color = this.set_true_color.bind(this);
        colors_div_block = colors_div_block.bind(this);
        game_over_div_block = game_over_div_block.bind(this);
        points_div_block = points_div_block.bind(this);
        change_bg_color = change_bg_color.bind(this);

        
        this.state.color_array[0] = this.get_random_color(); 
        this.state.color_array[1] = this.get_random_color(); 
        this.state.true_color = arrayRandElement(this.state.color_array);
        change_bg_color();
    }

    get_random_color(){
        var color =  arrayRandElement(colors_data).slice(0);
        var numbers = get_numbers_from_text(color[1].slice(4,color[1].length-1));
        color[1] = numbers;
        return color;
    }


    check_answer(presed_color){
        if((presed_color === this.state.true_color) && ((this.state.points_count+1)%5==0)){
            this.setState(previousState => ({
                color_array: [...previousState.color_array, this.get_random_color()],
                colors_id:[...previousState.colors_id, previousState.colors_id[previousState.colors_id.length-1]+1],
                points_count: this.state.points_count + 1,
                game_state: 'points_up',
            }));
            this.setState(prevState => ({
                color_array: prevState.color_array.map(
                obj => (Object.assign(this.get_random_color()))
            )}));
        }
        else if(presed_color === this.state.true_color){
            this.setState(previousState => ({
                points_count: this.state.points_count + 1,
                game_state: 'points_up',
            }));
            this.setState(prevState => ({
                color_array: prevState.color_array.map(
                obj => (Object.assign(this.get_random_color()))
            )}));
        }
        else if(this.state.game_state === 'points_up'){
            this.set_true_color();
            this.setState({game_state: 'game'});
        }
        else{ 
            this.setState({color_array: [this.get_random_color(),this.get_random_color()], colors_id:[0, 1], old_points_count: this.state.points_count, points_count:0, game_state: 'loose', presed_color: presed_color});
        }
    }

    set_true_color(){
        let color = arrayRandElement(this.state.color_array);
        this.setState({true_color: color});
    }

    restart_game(){
        this.set_true_color();
        this.setState({game_state: 'game'});
    }

    colors_to_choice(){
        if(this.state.game_state === 'loose'){
            return(
                 game_over_div_block()
            )
        }
        else if(this.state.game_state === 'points_up'){
            return(
                points_div_block()
            )
        }
        console.log("this.state.bg_color: ",this.state.bg_color)
        console.log("this.state.color_array: ",this.state.color_array)
        console.log("this.state.colors_id: ",this.state.colors_id)
        change_bg_color();
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