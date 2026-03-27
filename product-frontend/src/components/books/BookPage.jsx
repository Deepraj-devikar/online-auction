import { Breadcrumbs, Button, ButtonGroup, Link } from "@mui/material";
import './BookPage.css';
import smallImage from '../../images/Image-2@2x.png'
import bigImage from '../../images/Image-23@2x.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Textarea from '@mui/joy/Textarea';
import Feedback from "../../components/feedback/Feedback";
import { useEffect, useState } from "react";
import { AddToCartApi, AddToWishlistApi, GetCartApi, GetWishlistApi, RemoveFromCartApi } from "../../services/DataService";
import { connect } from "react-redux";
import { CART_DATA, WISHLIST_DATA } from "../../redux/constants";

function BookPage(props) {
    const [state, setState] = useState({
        addedToCart: props.cartData != 0 && props.cartData.books.filter(book => book.productID == props.data._id).length > 0 ? true : false,
        countAddedToCart: props.cartData != 0 && props.cartData.books.filter(book => book.productID == props.data._id).length > 0 ? props.cartData.books.filter(book => book.productID == props.data._id)[0].quantity : 0,
        cartUpdateCount: 0,
        wishlistUpdateCount: 0,
        isInWishlist: false
    });

    const addToBagClickHandler = () => {
        AddToCartApi(props.data._id)
        .then(response => {
            if(response.status == 201){
                setState(prevState => ({
                    ...prevState,
                    addedToCart: true,
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
        RemoveFromCartApi(props.data._id)
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

    useEffect(
        () => {
            for(let index = 0; index < props.wishlistData.books.length; index++){
                if(props.wishlistData.books[index].productID == props.data._id){
                    setState(prevState => ({
                        ...prevState,
                        isInWishlist: true
                    }));
                }
            }
        },
        []
    )

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

    useEffect(
        () => {
            GetWishlistApi()
            .then(response => {
                if(response.status == 200){
                    props.dispatch({
                        type: WISHLIST_DATA,
                        wishlistData: response.data.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        [state.wishlistUpdateCount]
    );

    const addToWishlistClickHandler = () => {
        AddToWishlistApi(props.data._id)
        .then(response => {
            if(response.status == 201) {
                console.log("Book added to wishlist");
                setState(prevState => ({
                    ...prevState,
                    isInWishlist: true,
                    wishlistUpdateCount: prevState.wishlistUpdateCount + 1
                }));
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="book-page-breadcrum-n-content">
            <div className="book-page-breadcrum">
                <Breadcrumbs>
                    <Link underline="hover" color="inherit" href="/dashboard" sx={{
                        textAlign: 'left',
                        font: 'normal normal normal 12px/16px Roboto',
                        letterSpacing: '0px',
                        color: '#9D9D9D',
                        opacity: 1
                    }}>
                        Home
                    </Link>
                    <Link underline="hover" color="text.primary" sx={{
                        textAlign: 'left',
                        font: 'normal normal normal 12px/16px Roboto',
                        letterSpacing: '0px',
                        color: '#0A0102',
                        opacity: 1
                    }}>
                        Book(04)
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="book-page-image-detail-feedback">
                <div className="book-page-image">
                    <div className="book-page-small-images">
                        <div className="book-page-small-image-holder-active">
                            <img src={smallImage} width='80%'/>
                        </div>
                        <div className="book-page-small-image-holder">
                            <img src={smallImage} width='80%'/>
                        </div>
                    </div>
                    <div className="book-page-big-image-n-buttons">
                        <div className="book-page-big-image">
                            <img src={props.data.bookImage ? props.data.bookImage : bigImage} width='80%'/>
                        </div>
                        <div className="book-page-image-buttons">
                            {
                                !state.addedToCart ?
                                    <Button sx={{
                                        width: '100%',
                                        background: '#A03037 0% 0% no-repeat padding-box',
                                        borderRadius: '2px',
                                        opacity: 1,
                                        color: '#fff',
                                        '&:hover': {
                                            width: '100%',
                                            background: '#A03037 0% 0% no-repeat padding-box',
                                            borderRadius: '2px',
                                            opacity: 1,
                                            color: '#fff',
                                        }
                                    }} onClick={addToBagClickHandler}>
                                        ADD TO BAG
                                    </Button>
                                :
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button onClick={removeFromBagClickHadler}> - </Button>
                                        <Button> {state.countAddedToCart} </Button>
                                        <Button onClick={addToBagClickHandler}> + </Button>
                                    </ButtonGroup>
                            }
                            {
                                state.isInWishlist ? 
                                    <Button sx={{
                                        width: '100%',
                                        background: '#fff 0% 0% no-repeat padding-box',
                                        borderRadius: '2px',
                                        opacity: 1,
                                        color: '#A03037',
                                        '&:hover': {
                                            width: '100%',
                                            background: '#fff 0% 0% no-repeat padding-box',
                                            borderRadius: '2px',
                                            opacity: 1,
                                            color: '#A03037'
                                        }
                                    }}>
                                        <div className="book-page-image-burron-wishlit">
                                            <FavoriteIcon />
                                            FAVORITE
                                        </div>
                                    </Button>
                                :
                                    <Button sx={{
                                        width: '100%',
                                        background: '#333333 0% 0% no-repeat padding-box',
                                        borderRadius: '2px',
                                        opacity: 1,
                                        color: '#fff',
                                        '&:hover': {
                                            width: '100%',
                                            background: '#333333 0% 0% no-repeat padding-box',
                                            borderRadius: '2px',
                                            opacity: 1,
                                            color: '#fff'
                                        }
                                    }} onClick={addToWishlistClickHandler}>
                                        <div className="book-page-image-burron-wishlit">
                                            <FavoriteIcon />
                                            WISHLIST
                                        </div>
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
                <div className="book-page-detail-feedback">
                    <div className="book-page-info">
                        <div className="book-page-book-name">
                            {props.data.bookName}
                        </div>
                        <div className="book-page-author-name">
                            {props.data.author}
                        </div>
                        <div className="book-page-rating-n-comments">
                            <div className="book-page-rating">
                                4.5
                                <StarRateIcon fontSize="16px"/>
                            </div>
                            <div className="book-page-comment">
                                (20)
                            </div>
                        </div>
                        <div className="book-page-price">
                            <div className="book-page-price-right">
                                Rs. {props.data.price}
                            </div>
                            <div className="book-page-price-wrong">
                                Rs. 2000
                            </div>
                        </div>
                    </div>
                    <div className="book-page-horizontal-line"></div>
                    <div className="book-page-book-detail">
                        <ul>
                            <li>
                                <div className="book-page-book-detail-key">
                                    Book Detail
                                </div>
                                <div className="book-page-book-detail-value">
                                    {props.data.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="book-page-horizontal-line"></div>
                    <div className="book-page-feedback">
                        <div className="book-page-feedback-title">
                            Customer Feedback
                        </div>
                        <div className="book-page-feedback-input">
                            <div className="book-page-feedback-input-title">
                                Overall Rating
                            </div>
                            <div className="book-page-feedback-input-stars">
                                <StarOutlineIcon />
                                <StarOutlineIcon />
                                <StarOutlineIcon />
                                <StarOutlineIcon />
                                <StarOutlineIcon />
                            </div>
                            <div className="book-page-feedback-input-textarea">
                                <Textarea name="review" placeholder="Write your review" variant="soft" fullWidth={true}/>
                            </div>
                            <div className="book-page-feedback-input-button">
                                <Button variant="contained" sx={{
                                    textTransform: 'none'
                                }}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <div className="book-page-feedback-got">
                            <Feedback />
                            <Feedback />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartData: state.CartReducer.cartData,
        wishlistData: state.WishlistReducer.wishlistData
    }
}

export default connect(mapStateToProps) (BookPage);