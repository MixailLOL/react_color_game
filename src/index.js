import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {colors_data} from './colors.js'
import bridge from '@vkontakte/vk-bridge';
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from 'react';
import gsap from "gsap";

bridge.send("VKWebAppInit").then( (data) => {console.log(data) });
bridge.subscribe((e) => console.log("vkBridge event", e));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

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
    var new_btn_clr = [0,0,0];
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
        return 'rgb(0,0,0)';
    }else{
        return 'rgb(255,255,255)';
    }
    
}


function particle() {
    let diment = getWindowDimensions();
    var element = document.createElement("div");
    let size_l = Math.round(Math.random() * (diment['width']*0.08) + 20);
    let color = arrayRandElement(this.state.color_array)[1]
    let id_n = Math.random()*9999
    let y_space = Number(Math.round(Math.random() * (((Number(diment['width']) - Number(size_l)*1.5)) - Number(size_l)*1.5 + Number(size_l)) + Number(size_l)*1.5 - Number(size_l)));
    element.setAttribute('id','particle'+id_n);
    element.setAttribute('style','background-color: rgb('+color[0]+', '+color[1]+', '+color[2]+'); width: '+ size_l+'px; height: '+size_l+'px; top:'+(diment['height']/3)+'px; left:'+y_space+'px;');
    element.setAttribute('class','absolute rounded-full');
    //element.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
    document.body.prepend(element);
    const timeline = gsap.timeline({
      repeat: 0,
      yoyo: false,
      defaults: { duration: Math.random() * 4 + 1, ease: ("custom", "M0,0 C0.266,0.412 0.691,0.209 0.82,0.33 0.822,0.332 0.856,0.406 0.858,0.412 0.888,0.506 0.791,1 1,1 ") }
    });

    timeline
      .to(element, { y: - (diment['height']/3),scale: 1.5, duration: Math.random() * 1 + 0.5 })
      .to(element, {scale: 0, duration: Math.random() * 0.5 + 0.5 , onComplete: function() {document.getElementById("particle"+id_n).remove()}});
}
    

function colors_div_block(){
    try{
        return(
            <div className = "w-full h-screen select-none" style={{backgroundColor:'rgb('+this.state.bg_color[0]+', '+this.state.bg_color[1]+', '+this.state.bg_color[2]+')', fontFamily: 'Roboto, sans-serif', 'color': change_txt_color(this.state.bg_color[0],this.state.bg_color[1],this.state.bg_color[2])}}>
                <div  id='text_area_lol' className=" w-full h-1/3 text-center text-4xl " > 
                    <div className="w-full h-full relative ">
                        <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                            <div style={{display: 'table-cell', verticalAlign: 'middle'}} >
                                <div id="test" style={{marginLeft: 'auto', marginRight: 'auto'} }>
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
                    <motion.div id="colors" className="h-full w-full flex flex-row place-content-center" >
                        {this.state.colors_id.map(color => <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} key={color} onClick={()=>this.check_answer(this.state.color_array[color])}  className="p-0 m-0 h-full" style={{backgroundColor:'rgb('+this.state.color_array[color][1][0]+', '+this.state.color_array[color][1][1]+', '+this.state.color_array[color][1][2]+')', 'width':'100%'}}> </motion.div>) }
                    </motion.div>
                </div>
            </div>
        );
    } finally{
            
            var particles_main = setInterval(function(){   
                let game_state = game_state_checker();
                if( game_state != 'game'){
                    clearInterval(particles_main);
                }
                particle(); 
            }, Math.random()*180 + 80);
            
            
    };
}

function game_state_checker(){
    let game_state = this.state.game_state;
    return game_state;
}

function points_div_block(){
    return(
        <div id="good_aswer_div" className="w-full h-screen select-none text-center text-4xl relative" style={{backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'width':'100%', fontFamily: 'Roboto, sans-serif', 'color': change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}} onClick={()=>this.check_answer('next')} >
            <div className="w-full h-full relative ">
                <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                    <div id="good_answer_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                            <motion.div transition={{duration: 0.8, delay: 0.1, ease: [0, 0.71, 0.2, 1.01]}} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} id="good_aswer" className="w-full h-full "  ><p>Отлично!</p><p>Очки++</p><p>{this.state.true_color[0]}</p></motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function game_over_div_block(){
    return(
        <div className = "w-full h-screen select-none"  style={{fontFamily: 'Roboto, sans-serif' }} >
            <div id="answer_div" className="h-1/2 w-full" style={{backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', 'width':'100%', 'color': change_txt_color(this.state.presed_color[1][0], this.state.presed_color[1][1], this.state.presed_color[1][2])}}>
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

            <div id="end_game" className=" w-full h-1/2 text-center text-4xl" style={{backgroundColor:'rgb('+this.state.bg_color[0]+', '+this.state.bg_color[1]+', '+this.state.bg_color[2]+')', 'width':'100%', 'color': change_txt_color(this.state.bg_color[0], this.state.bg_color[1], this.state.bg_color[2])}}>
                <div className="w-full h-full relative ">
                    <div className="absolute w-full h-1/2" style={{display: 'table',  top: '0', left: '0'}}>
                        <div id="end_game_out_div" className="h-full">
                            <div  className="h-full" style={{marginLeft: 'auto', marginRight: 'auto', fontWeight:'bold'}}>
                                <div className="h-full" id="btn_rstrt_div">
                                    <div  className=" mt-4">
                                        <p>Очки: {this.state.old_points_count}</p>
                                    </div>
                                    <div className="my-2">
                                        <p>Рекорд: {this.state.local_best_score}</p>
                                    </div>
                                    <div className="h-1/3 w-full">
                                        <motion.div animate={{scale: [1, 1.2, 1]}} transition={{duration: 0.5,ease: "easeInOut",repeat: Infinity,repeatDelay: 3}} onClick={()=>this.restart_game()} className="h-full px-5"  style={{ borderRadius: '20px',margin: "0 auto", display: 'table',  top: '0', left: '0', backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'color': change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}}>
                                            <div  className="mt-4 w-full text-center h-1/2" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                                <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                                    <div className="h-1/2" >Начать занаво</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="text-bottom h-1/2 text-2xl absolute w-full" style={{bottom: '0', 'color': change_txt_color(this.state.presed_color[1][0], this.state.presed_color[1][1], this.state.presed_color[1][2])}}>
                        <div style={{bottom: '0px'}} className="absolute w-full">

                            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{x: [400, 0], opacity: 1, scale: 1 }} transition={{duration: 0.5, delay: 1}} className="text-center py-1" style={{margin: "0 auto", display: 'table',  top: '0', left: '0'}}>
                                <div className="px-5 py-1" onClick={()=>post_to_wall()} style={{borderRadius: '10px', backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', display: 'table-cell', verticalAlign: 'middle'}}>
                                    <motion.div animate={{rotate: [0, 2, -2, 0]}} transition={{duration: 2, repeat: Infinity, repeatDelay: Math.random() * 5 +2}}> Поделиться результатом</motion.div>   
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{x: [-400, 0], opacity: 1, scale: 1 }} transition={{duration: 0.5, delay: 1}} className="text-center py-1" style={{margin: "0 auto", display: 'table',  top: '0', left: '0'}}>
                                <div className="px-5 py-1" onClick={()=>app_share()} style={{borderRadius: '10px', backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', display: 'table-cell', verticalAlign: 'middle'}}>
                                    <motion.div animate={{rotate: [0, 1, -1, 0]}} transition={{duration: 3, repeat: Infinity, repeatDelay: Math.random() * 5 +3}}> Поделиться игрой</motion.div>   
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{x: [400, 0], opacity: 1, scale: 1 }} transition={{duration: 0.5, delay: 1}} className="text-center py-1" style={{margin: "0 auto", display: 'table',  top: '0', left: '0'}}>
                                <div className="px-5 py-1" onClick={()=>invite_to_game()} style={{borderRadius: '10px', backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', display: 'table-cell', verticalAlign: 'middle'}}>
                                    <motion.div animate={{rotate: [0, 4, -4, 0]}} transition={{duration: 1, repeat: Infinity, repeatDelay: Math.random() * 5 +4}}> Пригласить друга</motion.div>   
                                </div>
                            </motion.div>
                        </div> 
                    </div>
                </div>
            </div>

        </div>
    )
}


function app_share(){
   bridge.send('VKWebAppShare', {
  link: 'https://vk.com/app51394304'
  })
  .then((data) => { 
    if (data.result) {
      // Запись размещена
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

function leader_board_box(){
   bridge.send("VKWebAppShowLeaderBoardBox", {user_result:this.state.local_best_score})
         .then(data => console.log(data.success))  
        .catch(error => console.log(error));
}

function invite_to_game(){
   bridge.send("VKWebAppShowInviteBox", {})
         .then(data => console.log(data.success))  
        .catch(error => console.log(error));
}

function post_to_wall(){
  bridge.send('VKWebAppShowWallPostBox', {
  message: 'Знаешь сколько я угадал цветов? Целых '+String(this.state.local_best_score),
  attachments: 'https://vk.com/app51394304'
  })
  .then((data) => { 
    if (data.post_id) {
      // Запись размещена
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
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
            play_try_count: 1,
            local_best_score: 0,
        };

        this.get_random_color = this.get_random_color.bind(this);
        this.check_answer = this.check_answer.bind(this);
        this.restart_game = this.restart_game.bind(this);
        this.set_true_color = this.set_true_color.bind(this);

        colors_div_block = colors_div_block.bind(this);
        game_over_div_block = game_over_div_block.bind(this);
        points_div_block = points_div_block.bind(this);
        change_bg_color = change_bg_color.bind(this);
        leader_board_box = leader_board_box.bind(this);
        post_to_wall = post_to_wall.bind(this);
        particle = particle.bind(this);
        game_state_checker = game_state_checker.bind(this);
        
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
            if(this.state.points_count > this.state.local_best_score){
                this.state.local_best_score = this.state.points_count;
            }
            this.setState({color_array: [this.get_random_color(),this.get_random_color()], colors_id:[0, 1], old_points_count: this.state.points_count, points_count:0, game_state: 'loose', presed_color: presed_color,  play_try_count: this.state.play_try_count+1});
            console.log('PLAY try count: ', this.state.play_try_count);
            if(((this.state.play_try_count)%3 == 0) && (this.state.play_try_count != 0)){
                console.log('AD NOW');
                bridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
                .then(data => console.log(data.result))
                .catch(error => console.log(error));
            }
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
        change_bg_color();
        return(
            colors_div_block()
        )
    }
    render(){
        return(this.colors_to_choice())
    }
}
document.body.style.overflow = "hidden";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);