import React, {Component} from 'react';
import style from './style.css'

class Home extends Component{
  constructor(props){
  	super(props);
  }

  render(){
  	return(
  	  <section>
        <article className={style.article} key="1">
        </article>
        <article className={style.article} key="2">
        </article>
        <article className={style.article} key="3">
        </article>
      </section>
  	)
  }
}

export default Home