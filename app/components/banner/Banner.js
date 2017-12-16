import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';

class Banner extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
	    <Carousel>
        <Carousel.Item>
          <img width={900} height={500} alt="轮播图一" src="./images/banner_1.jpg" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="轮播图二" src="./images/banner_2.jpg" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
		)
	}
}

export default Banner