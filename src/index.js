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


function particle(type) {
    let diment = getWindowDimensions();
    var element = document.createElement("div");
    let id_n = Math.round(Math.random()*9999);
    element.setAttribute('id','particle_'+id_n);
    const timeline = gsap.timeline({
          repeat: 0,
          yoyo: false,
          defaults: { ease: ("custom", "M0,0 C0.266,0.412 0.691,0.209 0.82,0.33 0.822,0.332 0.856,0.406 0.858,0.412 0.888,0.506 0.791,1 1,1 ") }
        });

    if(type == 'game'){
        var selected_color = Math.round(Math.random()* Number(this.state.color_array.length - 1));
        let elem_to_particle = document.getElementById('color_'+selected_color)
        if(this.state.game_state == 'game'){
            var position = elem_to_particle.getBoundingClientRect();
        }
        else{
            return
        }
        var elem_to_particle_x = position.left;
        var elem_to_particle_y = position.top;
        var elem_to_particle_height = position.height;
        var elem_to_particle_width = position.width;
        let bigger_d = diment['width']>diment['height']?diment['width']:diment['height'];
        let size_l = Math.round(Math.random() * ((elem_to_particle_width*0.5) - elem_to_particle_width*0.2) + elem_to_particle_width*0.2);
        let color = elem_to_particle.style.backgroundColor;
        let x_space = Number(Math.round(Math.random() * ( ((elem_to_particle_x+elem_to_particle_width) - (Number(size_l)*1.5)) - (Number(size_l)*1.5 - Number(size_l) + elem_to_particle_x) ) + Number(size_l)*1.5 - Number(size_l) + elem_to_particle_x));
        element.setAttribute('style','background-color: '+color+'; width: '+ size_l+'px; height: '+size_l+'px; top:'+0+'px; left:'+x_space+'px;');
        element.setAttribute('class','absolute rounded-full');
        document.getElementById('color_'+selected_color).after(element);
        timeline
        .to(element, { y: - ((diment['height']/3)*((size_l/(bigger_d*0.1)))),opacity: 0,scale: [1.5, 0], duration: Math.random() * 4 + 2 , onComplete: 
            function() {
                try{
                    document.getElementById("particle_"+id_n).remove()
                }
                catch(e){
                }}});
        
    }
    else if(type == 'loose'){
        let size_l = Math.round(Math.random() * (diment['width']*0.08) + 20);
        let color = Math.round(arrayRandElement(this.state.color_array)[1])
        let y_space = Number(Math.round(Math.random() * (((Number(diment['width']) - Number(size_l)*1.5)) - Number(size_l)*1.5 + Number(size_l)) + Number(size_l)*1.5 - Number(size_l)));
        let color_type = Math.round(Math.random());
        if(color_type == 0){
            let elem_to_particle = document.getElementById('end_game_next')
            if(this.state.game_state == 'loose'){        
                var position = elem_to_particle.getBoundingClientRect();
            }
            else{
                return
            }
            var elem_to_particle_x = position.left;
            var elem_to_particle_y = position.top;
            var elem_to_particle_height = position.height;
            var elem_to_particle_width = position.width;
            size_l = Math.round(Math.random() * ((elem_to_particle_width*0.15) - elem_to_particle_width*0.05) + elem_to_particle_width*0.05);
            let x_space = Number(Math.round(Math.random() * ((elem_to_particle_width)-(size_l))));
            element.setAttribute('style','background-color: rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+'); width: '+ 
                size_l+'px; height: '+size_l+'px; top:'+ Number(- Number(size_l)) +'px; left:'+x_space+'px; border-radius: 0% 90% 90% 0%; transform: rotate(90deg)');
            element.setAttribute('class',' absolute');  
            document.getElementById('end_game_next').prepend(element);
        }
        else{
            let elem_to_particle = document.getElementById('target_color')
            if(this.state.game_state == 'loose'){
                var position = elem_to_particle.getBoundingClientRect();
            }
            else{
                return
            }
            var elem_to_particle_x = position.left;
            var elem_to_particle_y = position.top;
            var elem_to_particle_height = position.height;
            var elem_to_particle_width = position.width;
            size_l = Math.round(Math.random() * ((elem_to_particle_width*0.15) - elem_to_particle_width*0.05) + elem_to_particle_width*0.05);
            let x_space = Number(Math.round(Math.random() * ((elem_to_particle_width)-(size_l))));
            element.setAttribute('style','background-color: rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+'); width: '+ 
                size_l+'px; height: '+size_l+'px; top:'+  -Number(size_l) +'px; left:'+x_space+'px; border-radius: 0% 90% 90% 0%; transform: rotate(90deg)');
            element.setAttribute('class',' absolute');   
            document.getElementById('target_color').prepend(element);

        }
        const timeline = gsap.timeline({
          repeat: 0,
          yoyo: false,
          defaults: { ease: ("custom", "M0,0 C0.266,0.412 0.691,0.209 0.82,0.33 0.822,0.332 0.856,0.406 0.858,0.412 0.888,0.506 0.791,1 1,1 ") }
        });

        timeline
          .to(element, { y: ( size_l*0.85), duration: Math.random() * 5 + 5})
          .to(element, {borderRadius:'50%', duration:0.01})
          .to(element, { y: elem_to_particle_height, scale: 0.8, opacity:0, duration:0.5,onComplete: 
            function() {
                try{document.getElementById("particle_"+id_n).remove()}catch(e){
                }

            } });
    }
    
}
    

function colors_div_block(){
    try{
        return(
            <div id="box" className = "overflow-hidden
             w-full h-screen select-none" style={{backgroundColor:'rgb('+this.state.bg_color[0]+', '+this.state.bg_color[1]+', '+this.state.bg_color[2]+')', fontFamily: 'Roboto, sans-serif', 'color': change_txt_color(this.state.bg_color[0],this.state.bg_color[1],this.state.bg_color[2])}}>
                
                <div id="colors_to_choice" className="top-1/3 h-2/3 w-full absolute">
                    <motion.div id="colors" className=" h-full w-full flex flex-row place-content-center" >
                        {this.state.colors_id.map(color => 
                            <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }} key={color} id={'color_'+color} onClick={(event)=>this.check_answer(this.state.color_array[color], event.clientX, event.clientY)}  className=" p-0 m-0 h-full" style={{backgroundColor:'rgb('+this.state.color_array[color][1][0]+', '+this.state.color_array[color][1][1]+', '+this.state.color_array[color][1][2]+')', 'width':'100%'}}> 
                            <div className=" w-full h-1/6" onClick={(event)=>this.check_answer(this.state.color_array[color], event.clientX, event.clientY)}>
                                <div onClick={(event)=>this.check_answer(this.state.color_array[color], event.clientX, event.clientY)} id='colb_top' className="relative w-full h-1/3 bg-blue-400" style={{backgroundColor:'rgb('+this.state.color_array[color][1][0]+', '+this.state.color_array[color][1][1]+', '+this.state.color_array[color][1][2]+')', borderRadius: '100% / 100%', top: '-17%'}}> 
                                    <div onClick={(event)=>this.check_answer(this.state.color_array[color], event.clientX, event.clientY)} id='colb_top_inside' className="relative w-full h-full w-11/12 bg-blue-400" style={{margin: '0 auto', backgroundColor:'rgb('
                                    + this.state.color_array[color][1][0]*0.7+
                                    ', '+this.state.color_array[color][1][1]*0.7+
                                    ', '+this.state.color_array[color][1][2]*0.7+
                                    ')', borderRadius: '100% / 100%', top: '+20%'}}>           
                                </div>
                                </div>
                            </div>
                            </motion.div>) }
                    </motion.div>
                </div>
                <div  id='text_area_lol' className=" relative w-full h-1/3 text-center text-4xl " > 
                    <div id='sub_erea_text' className="w-full h-full  ">
                        <div className="absolute w-full h-full" style={{display: 'table',  top: '-10%', left: '0'}}>
                            <div style={{display: 'table-cell', verticalAlign: 'middle', zIndex: 99}} >
                                <div id="test" style={{marginLeft: 'auto', marginRight: 'auto'}} >
                                    <div id="viberi_color" style={{fontSize: '80%'}}>
                                    Выбери цвет:
                                    </div>
                                    <div id='color_name'>
                                        {this.state.true_color[0]}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='timer' className="absolute top-2 left-2" style={{width: '10%', aspectRatio: '1 / 1'}}>
                    <div id="activeBorder" style={{ display: 'table', textAlign: 'center', position: 'absolute', textAlign: 'center', width: '100%', aspectRatio: '1 / 1', borderRadius: '100%', backgroundColor:'rgb('+
                    this.state.timer_colors[1][1][0]+', '+
            this.state.timer_colors[1][1][1]+','
            +this.state.timer_colors[1][1][2]+')', backgroundImage: 'linear-gradient(91deg, transparent 50%, rgb('+
            this.state.timer_colors[0][1][0]+', '+
            this.state.timer_colors[0][1][1]+','
            +this.state.timer_colors[0][1][2]+') 50%), linear-gradient(90deg, rgb('+
            this.state.timer_colors[0][1][0]+', '+
            this.state.timer_colors[0][1][1]+','
            +this.state.timer_colors[0][1][2]+') 50%, transparent 50%)'}}>
                        <div id="circle" style={{display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', aspectRatio: '1 / 1'}}>
                            <div style={{display: 'inline-block'}} id='pcnt_text'></div>
                        </div>
                    </div>
                    <div className=" absalute flex flex-row text-center place-content-center" style={{width:'100%', height: '100%', marginTop: '100%'}}>
                        <div>
                            Очки:
                        </div>
                        <div id="good_answers_counter" >
                            {this.state.points_count}
                        </div>
                    </div>
                </div>
            </div>

        );
    } finally{
        dlt_prtcles('particle_');
        this.state.need_timer = 1;
        startTimer();
        var particles_main = setInterval(function(){   
            let game_state = game_state_checker();
            if( game_state != 'game'){
                clearInterval(particles_main);
            }
            particle('game'); 
        }, Math.random()*600 + 200);
    };
}


function set_timer_color(){
    this.state.timer_colors[0] = arrayRandElement(this.state.color_array);
    do{
        this.state.timer_colors[1] = arrayRandElement(this.state.color_array);

    }while(this.state.timer_colors[0] == this.state.timer_colors[1]);
}

function draw_sector(prec) {
    let active_border = document.getElementById('activeBorder');
    if(this.state.game_state == 'game'){
        try{
        document.getElementById('pcnt_text').textContent = this.state.timer_s_left;
        }
        catch(e){
            return
        }
    }
    else{
        return
    }
    if (prec > 100)
        prec = 100;
    var deg = prec*3.6;
    if (deg <= 180){
        active_border.style.backgroundImage = ('linear-gradient(' + (90+deg) + 'deg, transparent 50%, rgb('+
            this.state.timer_colors[0][1][0]+', '+
            this.state.timer_colors[0][1][1]+','
            +this.state.timer_colors[0][1][2]+') 50%),linear-gradient(90deg, rgb('+
            this.state.timer_colors[0][1][0]+', '+
            this.state.timer_colors[0][1][1]+','
            +this.state.timer_colors[0][1][2]+') 50%, transparent 50%)');
    }
    else{
        active_border.style.backgroundImage = ('linear-gradient(' + (deg-90) + 'deg, transparent 50%, rgb('+
            this.state.timer_colors[1][1][0]+', '+
            this.state.timer_colors[1][1][1]+','
            +this.state.timer_colors[1][1][2]+') 50%),linear-gradient(90deg, rgb('+
            this.state.timer_colors[0][1][0]+', '+
            this.state.timer_colors[0][1][1]+','
            +this.state.timer_colors[0][1][2]+') 50%, transparent 50%)');
    }
}

function countDown() {
    let seconds = this.state.timer_s_left - 1;
    let prec = 100 - Math.round(((Number(this.state.timer_s_left)*100)/this.state.timer_max_time));
    draw_sector(prec);
    this.state.timer_s_left = seconds;
    if (seconds == -1) { 
        this.state.need_timer = 0;
        clearInterval(this.timer);
        this.timer = 0;
        this.check_answer("No answer");
    }
    else if(this.state.need_timer == 0){
        clearInterval(this.timer);
        this.timer = 0;
    }
}


function startTimer() {
    this.state.timer_s_left = this.state.timer_max_time;
    if ((this.state.timer_s_left > 0) && (this.state.need_timer == 1) && (this.timer == 0)) {
        draw_sector(100);
        this.timer = setInterval(countDown, 1000);
    }
}
function dlt_prtcles(pattern){
    let elements = document.querySelectorAll('[id^="'+pattern+'"]');
    for(let i = 0; i < elements.length; i ++){ 
        document.getElementById(elements[i].id).remove()
    }
}

function game_state_checker(){
    let game_state = this.state.game_state;
    return game_state;
}

function expand_block(color, event, x, y){
    var element = document.createElement("div");
    if(x && y){
        this.state.click_coord = [x, y];
    }
    let to_narrow_x = this.state.click_coord[0];
    let to_narrow_y = this.state.click_coord[1];
    element.setAttribute('style','background-color: '+'rgb('+
        color[1][0]+
        ', '+color[1][1]+
        ', '+color[1][2]+
        ')'+'; width: 15%; aspect-ratio: 1/ 1; top:'+
        this.state.click_coord[1]+'px; left:'+
        this.state.click_coord[0]+'px;');
    element.setAttribute('class','absolute rounded-full');
    element.setAttribute('id','expanded_div');
    document.getElementById('box').after(element);
    const timeline = gsap.timeline({
          repeat: 0,
          yoyo: false,
          defaults: { ease: ("custom", "M0,0 C0,0 0.507,-0.008 0.742,0.226 1.005,0.489 1,1 1,1 ") }
        });
        
        timeline.to(element,{scale:30, duration:0.7, onComplete:function(){
            if(event == 'restart'){
                dlt_prtcles('expanded_div');
                narrow_div('restart', to_narrow_x, to_narrow_y);
                setTimeout(()=>{change_state_from_expnd('restart');},100); 
            }else if(event == 'wrong_answer'){
                dlt_prtcles('expanded_div');
                narrow_div('wrong_answer', to_narrow_x, to_narrow_y, color);
                change_state_from_expnd('wrong_answer'); 
            }
            else{
                change_state_from_expnd('points_up');
            }} 
        })
        .to(element, {opacity: 0, duration:0.3, onComplete:function(){
            dlt_prtcles('expanded_div');
        }});
}

function change_state_from_expnd(state){
    if(state == 'points_up'){
        this.check_answer('points_up');
    }
    else if(state == 'restart'){
        this.restart_game()
    }
    else{
        return
    }
    
}

function points_div_block(){
    try{
        return(
        <div id="box" className="w-full h-full relative overflow-hidden" style={{fontFamily: 'Roboto, sans-serif'}}>
            <div id="good_aswer_div" className="w-full h-screen select-none text-center text-4xl relative" style={{backgroundColor:'rgb('+this.state.true_color[1][0]+
            ', '+this.state.true_color[1][1]+
            ', '+this.state.true_color[1][2]+
            ')', 'width':'100%', 'color': 
            change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}} onClick={(event)=>narrow_div('next_lvl', event.clientX, event.clientY)} >
                <div className="w-full h-full relative ">
                    <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                        <p id="timer_sum_div" className="absolute" style={{top: '5%', left: '5%', fontSize: '50%'}}>Таймер++</p>
                        <div id="good_answer_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                            <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                <motion.div transition={{duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01]}} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} id="good_aswer" className="w-full h-full "  >
                                    <p id="otli4no_div">Отлично!</p>
                                    <p id="points_div">Очки++</p>
                                    <p id = "true_clr_div" style={{opacity: 0}}>{this.state.true_color[0]}</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>)
    }finally{
        var good_answer = setInterval(function(){   
            good_answer_anim();
            clearInterval(good_answer);
        },  100);
    }
}

function good_answer_anim(){
    let points_anim = document.getElementById('points_div');
    let timer_sum = document.getElementById('timer_sum_div');
    let otli4no = document.getElementById('otli4no_div');
    let true_clr_div = document.getElementById('true_clr_div');
    const timeline = gsap.timeline({
        repeat: 0,
        yoyo: false,
        defaults: { ease: ("custom", "M0,0 C0,0 0.507,-0.008 0.742,0.226 1.005,0.489 1,1 1,1 ") }
    });
    let points = this.state.points_count + 1;
    let time = Number(this.state.timer_s_left + 5);

    timeline
    .to(otli4no,{scale: 1.5, duration:0.8})
    .to(otli4no,{opacity: 0, duration:0.5})
    .to(points_anim,{scale: 1.2, duration:0.4})
    .to(points_anim,{scale: 1, duration:0.4, onComplete:function(){points_anim.innerHTML = ("Очки: "+ points)}}, ) 
    .to(points_anim,{opacity: 0, duration: 1}, ) 
    .to(timer_sum,{scale: 1.2, duration:0.4}, 0.4)
    .to(timer_sum,{scale: 1, duration:0.4, onComplete:function(){timer_sum.innerHTML = ("Таймер: "+time)}}, 0.8)
    .to(timer_sum,{opacity: 0, duration:1}, 1.8)
    .to(true_clr_div,{y:'-75%', opacity:1 ,duration:1}); 
}

function narrow_div(event, clck_x, clck_y, color){
    let diment = getWindowDimensions();
    var element = document.createElement("div");
    element.setAttribute('id','narrow_div');
    if(event == 'wrong_answer'){
        element.setAttribute('style','background-color: '+'rgb('+
        color[1][0]+
        ', '+color[1][1]+
        ', '+color[1][2]+
        ')'+'; width: 450%; aspect-ratio: 1/ 1; top:'+ Number(clck_y - diment.width*2.25)+'px; left:'+Number(clck_x- diment.width*2.25)+'px;');    
    }
    else{
        element.setAttribute('style','background-color: '+'rgb('+
        this.state.true_color[1][0]+
        ', '+this.state.true_color[1][1]+
        ', '+this.state.true_color[1][2]+
        ')'+'; width: 450%; aspect-ratio: 1/ 1; top:'+ Number(clck_y - diment.width*2.25)+'px; left:'+Number(clck_x- diment.width*2.25)+'px;');
    }
    element.setAttribute('class','absolute rounded-full');
    document.getElementById('box').after(element);
    const timeline = gsap.timeline({
          repeat: 0,
          yoyo: false,
          defaults: { ease: ("custom", "M0,0 C0,0 0.507,-0.008 0.742,0.226 1.005,0.489 1,1 1,1 ") }
        });
        if(event == 'next_lvl'){
            this.check_answer("next");
        }
        timeline.to(element,{scale: 0, duration:0.7, onComplete:function(){dlt_prtcles('narrow_div')}} );   
}

function game_over_div_block(){
    try{
        return(
            <div id="box" className = "w-full h-screen select-none"  style={{fontFamily: 'Roboto, sans-serif', fontWeight: 'medium'}} >
                <div id="answer_div" className=" h-1/2 w-full " style={{backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', 'width':'100%', 'color': change_txt_color(this.state.presed_color[1][0], this.state.presed_color[1][1], this.state.presed_color[1][2])}}>
                    <div id = "sub_answer_div" className="flex flex-col h-full w-full text-center text-3xl">
                        <div className="w-full h-1/2 relative ">
                            <div className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                                <div id="what_prsd_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                    <div id = "text_selected_color"style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                        <div className="w-full h-1/2"   id="what_pressed">{this.state.presed_color[0]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="target_color" className="overflow-hidden w-full h-1/2 relative " style={{backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'width':'100%', 'color': change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}}>
                            <div id= "sub_target_color"className="absolute w-full h-full" style={{display: 'table',  top: '0', left: '0'}}>
                                <div id="clr_to_prs_out_div" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                        <div className="w-full h-1/2" id="color_to_press" >Искомый цвет: {this.state.true_color[0]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="end_game" className="overflow-hidden w-full h-1/2 text-center text-4xl" style={{backgroundColor:'rgb('+this.state.bg_color[0]+', '+this.state.bg_color[1]+', '+this.state.bg_color[2]+')', 'width':'100%', 'color': change_txt_color(this.state.bg_color[0], this.state.bg_color[1], this.state.bg_color[2])}}>
                    <div id="end_game_next"className="overflow-hidden w-full h-full relative ">
                        <div id="end_game_next2" className="overflow-hidden relative w-full h-1/2" style={{display: 'table',  top: '0', left: '0'}}>
                            <div id="end_game_out_div" className="overflow-hidden h-full">
                                <div  className="h-full" style={{marginLeft: 'auto', marginRight: 'auto', fontWeight:'bold'}}>
                                    <div className="h-full" id="btn_rstrt_div">
                                        <div  className="h-1/2" style={{fontSize: '70%'}}>
                                            <p>Очки: {this.state.old_points_count}</p>
                                            <p>Рекорд: {this.state.local_best_score}</p>
                                        </div>
                                        <div className="pt-3 pb-3 h-1/2 w-full">
                                            <motion.div animate={{scale: [1, 1.2, 1]}} transition={{duration: 0.5,ease: "easeInOut",repeat: Infinity,repeatDelay: 3}} 
                                            onClick={(event)=>expand_block( this.state.true_color, 'restart', event.clientX, event.clientY)} className="h-full px-5"  
                                            style={{ borderRadius: '20px',margin: "0 auto", display: 'table',  top: '0', left: '0', backgroundColor:'rgb('+this.state.true_color[1][0]+', '+this.state.true_color[1][1]+', '+this.state.true_color[1][2]+')', 'color': change_txt_color(this.state.true_color[1][0], this.state.true_color[1][1], this.state.true_color[1][2])}}>
                                                <div  className="mt-2 w-full text-center h-2/3" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                                                    <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                                        <div className="h-2/3" >Начать занаво</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="relative text-bottom h-1/2 text-xl w-full" style={{ 'color': change_txt_color(this.state.presed_color[1][0], this.state.presed_color[1][1], this.state.presed_color[1][2])}}>
                            <div className="h-full w-full ">
                                <div className="flex flex-col absolute bottom-0 right-0 left-0">
                                    <motion.div initial={{ opacity: 0, scale: 1 }} animate={{x: [-400, 0], opacity: 1, scale: 1 }} transition={{duration: 0.5, delay: 1}} className="h-1/4 text-center pt-1 pb-1" style={{margin: "0 auto", display: 'table'}}>
                                        <div className=" px-5 py-1" onClick={()=>app_share()} style={{borderRadius: '10px', backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', display: 'table-cell', verticalAlign: 'middle'}}>
                                            <motion.div animate={{rotate: [0, 1, -1, 0]}} transition={{duration: 3, repeat: Infinity, repeatDelay: Math.random() * 5 +3}}> Поделиться игрой</motion.div>   
                                        </div>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, scale: 1 }} animate={{y: [400, 0], opacity: 1, scale: 1 }} transition={{duration: 0.5, delay: 1}} className="h-1/4  text-center pb-1" style={{margin: "0 auto", display: 'table', left:0,  right:0, marginLeft: 'auto', marginRight: 'auto'}}>
                                        <div className=" px-5 py-1" onClick={()=>post_to_wall()} style={{borderRadius: '10px', backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', display: 'table-cell', verticalAlign: 'middle'}}>
                                            <motion.div animate={{rotate: [0, 2, -2, 0]}} transition={{duration: 2, repeat: Infinity, repeatDelay: Math.random() * 5 +2}}> Поделиться результатом</motion.div>   
                                        </div>
                                    </motion.div>


                                    <motion.div initial={{ opacity: 0, scale: 1 }} animate={{x: [400, 0], opacity: 1, scale: 1 }} transition={{duration: 0.5, delay: 1}} className="h-1/4 text-center pb-1" style={{margin: "0 auto", display: 'table'}}>
                                        <div className="px-5 py-1" onClick={()=>invite_to_game()} style={{borderRadius: '10px', backgroundColor:'rgb('+this.state.presed_color[1][0]+', '+this.state.presed_color[1][1]+', '+this.state.presed_color[1][2]+')', display: 'table-cell', verticalAlign: 'middle'}}>
                                            <motion.div animate={{rotate: [0, 4, -4, 0]}} transition={{duration: 1, repeat: Infinity, repeatDelay: Math.random() * 5 +4}}> Пригласить друга</motion.div>   
                                        </div>
                                    </motion.div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>

            </div>
        )
    } finally{
        var particles_gg = setInterval(function(){   
            let game_state = game_state_checker();
            if( game_state != 'loose'){
                clearInterval(particles_gg);
            }
            particle('loose'); 
        }, Math.random()*2000 + 800);
    }
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

function add_app_event(value){
    console.log('addAppEvent_init', value, this.state.user_id);
    let url = 'https://api.vk.com/method/secure.addAppEvent?access_token=98be54a898be54a898be54a8799bae63a8998be98be54a8fa5277b47cc403e32b2a2005&user_id='+
    this.state.user_id+'&activity_id=2&value='+value;

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
      console.log('addAppEvent_exit');
}

function get_lauch_params(){
    console.log('gl_prm_init');
    bridge.send('VKWebAppGetLaunchParams')
      .then((data) => { 
        console.log(data);
        this.state.user_id = data['detail']['data']['vk_user_id'];
        console.log(this.state.user_id);
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
      console.log('gl_prm_exit');
}

function dlt_particles(id){
    let arr = this.state.particles;
    let index = arr.indexOf(id);
    arr = arr.splice(index, 1);
    this.state.particles = arr;
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
            timer_s_left: 0,
            need_timer: 0,
            timer_max_time: 20,
            click_coord:[],
            timer_colors:[],
            user_id:0,
        };
        
        this.timer = 0;

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
        countDown = countDown.bind(this);
        startTimer = startTimer.bind(this);
        draw_sector = draw_sector.bind(this);
        expand_block = expand_block.bind(this);
        change_state_from_expnd = change_state_from_expnd.bind(this);
        set_timer_color = set_timer_color.bind(this);
        narrow_div = narrow_div.bind(this);
        good_answer_anim = good_answer_anim.bind(this);
        get_lauch_params = get_lauch_params.bind(this);
        add_app_event = add_app_event.bind(this);
        

        this.state.color_array[0] = this.get_random_color(); 
        this.state.color_array[1] = this.get_random_color(); 
        this.state.true_color = arrayRandElement(this.state.color_array);
        change_bg_color();
        get_lauch_params();
        }

    get_random_color(){
        var color =  arrayRandElement(colors_data).slice(0);
        var numbers = get_numbers_from_text(color[1].slice(4,color[1].length-1));
        color[1] = numbers;
        return color;
    }


    check_answer(presed_color, mouse_x, mouse_y){
        this.state.need_timer = 0;
        this.state.click_coord = [mouse_x, mouse_y];
        if (presed_color == "next") {
            if(((this.state.points_count+1)%5==0)){
                this.setState(previousState => ({
                    color_array: [...previousState.color_array, this.get_random_color()],
                    colors_id:[...previousState.colors_id, previousState.colors_id[previousState.colors_id.length-1]+1],
                    points_count: this.state.points_count + 1,
                }));
                this.setState(prevState => ({
                    color_array: prevState.color_array.map(
                    obj => (Object.assign(this.get_random_color())))
                }));
            }
            else{
                this.setState(prevState => ({
                    points_count: this.state.points_count + 1,
                    color_array: prevState.color_array.map(
                    obj => (Object.assign(this.get_random_color()))
                )}));    
            }
            this.setState({game_state: 'game'});
        }
        else if(presed_color === this.state.true_color){
            expand_block(this.state.true_color);
        }
        else if(presed_color == 'points_up'){
            this.state.timer_max_time = Number(5 + Math.round(this.state.timer_s_left));
            this.setState({game_state: 'points_up'});
        }
        else if (presed_color == "No answer"){ 
            let diment = getWindowDimensions();
            this.state.click_coord = [Number(diment.width*0.5),Number(diment.height*0.5)];
            expand_block(this.state.true_color, 'wrong_answer', 0, 0);
            if(this.state.points_count > this.state.local_best_score){
                this.state.local_best_score = this.state.points_count;
                add_app_event(this.state.local_best_score);
            }
            let hui = ["Время вышло!", [this.state.bg_color[0],this.state.bg_color[1],this.state.bg_color[2]]];
            this.state.presed_color = hui;
            setTimeout(() => {  
                this.setState({color_array: [this.get_random_color(),this.get_random_color()], colors_id:[0, 1], old_points_count: this.state.points_count, points_count:0, game_state: 'loose',  play_try_count: this.state.play_try_count+1, presed_color: this.state.presed_color});
                if(((this.state.play_try_count)%3 == 0) && (this.state.play_try_count != 0)){
                    console.log('AD NOW');
                    bridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
                    .then(data => console.log(data.result))
                    .catch(error => console.log(error));
                }
            }, 700);
        }
        else{
            expand_block(presed_color, 'wrong_answer');
            if(this.state.points_count > this.state.local_best_score){
                this.state.local_best_score = this.state.points_count;
                add_app_event(this.state.local_best_score);
            }
            presed_color[0] = "Вы выбрали:\n " + presed_color[0];
            setTimeout(() => {  
                this.setState({color_array: [this.get_random_color(),this.get_random_color()], colors_id:[0, 1], old_points_count: this.state.points_count, points_count:0, game_state: 'loose', presed_color: presed_color,  play_try_count: this.state.play_try_count+1});
                if(((this.state.play_try_count)%3 == 0) && (this.state.play_try_count != 0)){
                    console.log('AD NOW');
                    bridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
                    .then(data => console.log(data.result))
                    .catch(error => console.log(error));
                } 
            }, 700);
            
        }
    }

    set_true_color(){
        let color = arrayRandElement(this.state.color_array);
        this.state.true_color = color;
        set_timer_color();
    }

    restart_game(){
        this.state.timer_max_time = 20;
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
        this.set_true_color();
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