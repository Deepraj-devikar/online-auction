import './CartPlaceOrderBook.css';
import { Button, ButtonGroup } from "@mui/material";
import image from '../../images/Image-11@2x.png';
import { useState, useEffect } from 'react';
import { CART_DATA } from '../../redux/constants';
import { connect } from 'react-redux';
import { AddToCartApi, GetCartApi, RemoveAllBooksFromCartApi, RemoveFromCartApi } from '../../services/DataService';

function CartPlaceOrderBook(props) {
    const [state, setState] = useState({
        countAddedToCart: props.cartData != 0 && props.cartData.books.filter(book => book.productID == props.data._id).length > 0 ? props.cartData.books.filter(book => book.productID == props.data._id)[0].quantity : 0,
        cartUpdateCount: 0
    });

    const addToBagClickHandler = () => {
        AddToCartApi(props.data.productID)
        .then(response => {
            if(response.status == 201){
                setState(prevState => ({
                    ...prevState,
                    countAddedToCart: prevState.countAddedToCart + 1,
                    cartUpdateCount: prevState.cartUpdateCount + 1
                }));
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const removeFromBagClickHadler = () => {
        RemoveFromCartApi(props.data.productID)
        .then(response => {
            if(response.status == 202){
                setState(prevState => ({
                    ...prevState,
                    countAddedToCart: prevState.countAddedToCart - 1,
                    cartUpdateCount: prevState.cartUpdateCount + 1
                }));
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const removeAllFromBagClickHandler = () => {
        RemoveAllBooksFromCartApi(props.data.productID)
        .then(response => {
            if(response.status == 202){
                setState(prevState => ({
                    ...prevState,
                    countAddedToCart: 0,
                    cartUpdateCount: prevState.cartUpdateCount + 1
                }));
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(
        () => {
            GetCartApi()
            .then(response => {
                props.dispatch({
                    type: CART_DATA,
                    cartData: response.data.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        },
        [state.cartUpdateCount]
    );

    return (
        <div className="cart-place-order-product">
            <div className="cart-place-order-product-image">
                <img src={image} width="100%"/>
            </div>
            <div className="cart-place-order-product-detail">
                <div className="cart-place-order-product-detail-book-name">
                    {props.data.bookName}
                </div>
                <div className="cart-place-order-product-detail-author-name">
                    {props.data.author}
                </div>
                <div className="cart-place-order-product-detail-price">
                    <div className="cart-place-order-product-detail-price-right">
                        Rs. {props.data.price}
                    </div>
                    <div className="cart-place-order-product-detail-price-wrong">
                        Rs. 2000
                    </div>
                </div>
                <div className="cart-place-order-product-detail-cart-buttons">
                    <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
                        <Button size="small" onClick={removeFromBagClickHadler}> - </Button>
                        <Button size="small"> {props.data.quantity} </Button>                    
                        <Button size="small" onClick={addToBagClickHandler}> + </Button>
                    </ButtonGroup>
                    <Button variant="text" sx={{
                        textTransform: 'none',
                        textAlign: 'left',
                        font: '15px Lato',
                        letterSpacing: '0px',
                        color: '#0A0102',
                        opacity: 1
                    }} onClick={removeAllFromBagClickHandler}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartData: state.CartReducer.cartData
    }
}

export default connect(mapStateToProps) (CartPlaceOrderBook);