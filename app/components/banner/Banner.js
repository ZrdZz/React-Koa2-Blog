import React, {Component} from 'react';
import {Carousel} from 'antd';
import style from './style.css';

const banner_1 = require("./images/banner_1.png");
const banner_2 = require("./images/banner_2.png");
const banner_3 = require("./images/banner_3.png");

class Banner extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
	    	<Carousel autoplay effect="fade">
        		<div key='benner_1' className={style.carouselImgContainer}><img src={'http://localhost:8080' + banner_1} alt={'轮播图一'}/></div>
        		<div key='banner_2' className={style.carouselImgContainer}><img src={'http://localhost:8080' + banner_2} alt={'轮播图二'}/></div>
        		<div key='banner_3' className={style.carouselImgContainer}><img src={'http://localhost:8080' + banner_3} alt={'轮播图三'}/></div>
      		</Carousel>
		)
	}
}

export default Banner