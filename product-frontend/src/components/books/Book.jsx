import { Paper } from "@mui/material";
import bookImage from '../../images/Image-10@2x.png';
import './Book.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import { BOOK_PAGE } from "../../redux/constants";
import { connect } from "react-redux";

function Book(props) {
    const bookViewHandler = () => {
        props.dispatch({
            type: BOOK_PAGE,
            book: props.data
        });
    };

    return (
        <div className="book-outer">
            <Paper onClick={bookViewHandler}>
                <div className="book-in-paper">
                    <div className="book-image-holder">
                        <img src={props.data.bookImage ? props.data.bookImage : bookImage} width='60%'/>
                    </div>
                    <div className="book-detail-holder">
                        <div className="book-book-name-text">
                            {props.data.bookName}
                        </div>
                        <div className="book-author-name-text">
                            {props.data.author}
                        </div>
                        <div className="book-rating-n-comments">
                            <div className="book-rating">
                                4.5
                                <StarRateIcon fontSize="8px"/>
                            </div>
                            <div className="book-comment">
                                (20)
                            </div>
                        </div>
                        <div className="book-price">
                            <div className="book-price-right">
                                Rs. {props.data.price}
                            </div>
                            <div className="book-price-wrong">
                                Rs. 2000
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(Book);