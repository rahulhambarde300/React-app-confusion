import React,{Component} from 'react';
import {Media} from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }


    renderDish(dish) {
        
            
        if (dish != null){
            const ratings = dish.comments.map((comment) => {
                return(
                <Card key={comment.id}>
                    <CardBody>
                        <CardText>{comment.rating} : {comment.author}</CardText>
                        <CardText>--{comment.comment},{comment.date}</CardText>
                    </CardBody>
                </Card>
                
                );
            });
            return(
                <div className="row">
                    <div className="col-6 mt-5">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-6 mt-5">
                        <h4>Comments:</h4>
                        {ratings}
                    </div> 
                    
                    
                </div>
            );
        }
            
        else
            return(
                <div></div>
            );
    }

    render(){
        return(
                  <div className="container">
                    <renderDish dish={this.props.dish}/>
                  </div>
        );
    };

}
export default DishDetail;