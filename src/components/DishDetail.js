import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Contact from './ContactComponent';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
 

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }
    }

    toggleModal = () =>{
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleComment = (values) =>{
        console.log("Current state is: "+ JSON.stringify(values));
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
        <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span>Add Comment
            </Button>

            <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleComment(values)}>
                        <FormGroup>
                            <Label className="col-12" htmlFor="rating">Rating</Label>
                            
                                <Control.select model=".rating" name="rating" 
                                    className="form-control col-12">
                                        <option>1</option>
                                        <option>2</option>
                                </Control.select>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-12" htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Name"
                                    className="form-group col-12"
                                    validators={{
                                        required
                                    }}
                                    />
                                <Errors
                                    model = ".author"
                                    className="text-danger"
                                    show="touched"
                                    messages={{
                                        required:'Required'
                                    }}
                                    />
                        </FormGroup>
                        <FormGroup>
                            <Label className="col-12" htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name=".comment"
                                    className="form-group col-12"
                                    validators={{
                                        required
                                    }}
                                    />
                                <Errors
                                    model = ".comment"
                                    className="text-danger"
                                    show="touched"
                                    messages={{
                                        required:'Required'
                                    }}
                                    />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
        );
    }
}


    function RenderDish({dish}){
        
            return(
                    <div className="col-6 mt-5">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>

                );
    }
            
    function RenderComments({comments, addComment, dishId }) {
        if(comments != null)
            return(
                <div className = "col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) =>{
                            return(
                                <li>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author},{comment.date}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <CommentForm dishId = {dishId} addComment={addComment}/>
                </div>
            );
        
    }

    const DishDetail = (props) => {
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish != null)
            return(
                  <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId = {props.dish.id}/>
                    </div>
                  </div>
            );
        else
            return(
                <div></div>
            );
    }


export default DishDetail;