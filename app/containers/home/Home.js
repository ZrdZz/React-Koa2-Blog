import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Pagination, Button} from 'antd';
import {actions as tagArticlesActions} from '../../reducers/front';
import style from './style.css';

class Home extends Component{
  constructor(props){
  	super(props);
  }

  render(){
    const that = this;
    return(
      <div>
  	    <section>
          { 
            this.props.articlesList.filter(function(item){
              return item.isPublish === '已发布';
            }).map(function(item, index){
              return(
                <div className={style.article} key={index}> 
                  <div>
                    <img src={`/images${item.coverImg}`} alt=""/>
                  </div>
                  <div className={style.msg}>
                    <p className={style.title}>
                      {item.title}
                    </p>
                    <div>
                      <div>
                        <div>                          
                          时间:{item.time}
                        </div>
                        <span>                   
                          阅读数:{item.viewCounts}
                        </span>
                        <span>                        
                          评论数:{item.commentsCounts}
                        </span>
                      </div>
                      <Button type="primary" onClick={() => {that.props.get_article_detail(item._id); that.props.history.push(`/detail/${item._id}`)}} className={style.detail}>
                        阅读全文 >>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
        <Pagination current = {this.props.pageNum} total = {this.props.total} onChange = {(pageNum) => {
            this.props.get_tag_articles(this.props.match.params.tag, pageNum);
          }} defaultPageSize={5} />
      </div>
  	)
  }
}

function mapStateToProps(state){
  let {articlesList, total, pageNum} = state.front;
  return{
    articlesList,
    total,
    pageNum
  }
}

function mapDispatchToProps(dispatch){
  return{
    get_tag_articles: bindActionCreators(tagArticlesActions.get_tag_articles, dispatch),
    get_article_detail: bindActionCreators(tagArticlesActions.get_article_detail, dispatch)
  }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home