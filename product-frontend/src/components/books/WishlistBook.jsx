import { Button } from '@mui/material';
import image from '../../images/Image-11@2x.png';
import './WishlistBook.css';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export default function WishlistBook(props) {
    return (
        <div className='wishlist-product'>
            <div className="wishlist-product-data-n-delete-button">
                <div className="wishlist-product-image">
                    <img src={image} width="100%"/>
                </div>
                <div className="wishlist-product-detail">
                    <div className="wishlist-product-detail-book-name">
                        {props.data.bookName}
                    </div>
                    <div className="wishlist-product-detail-author-name">
                        {props.data.author}
                    </div>
                    <div className="wishlist-product-detail-price">
                        <div className="wishlist-product-detail-price-right">
                            Rs. {props.data.price}
                        </div>
                        <div className="wishlist-product-detail-price-wrong">
                            Rs. 2000
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={() => props.deleteHandler(props.data.productID)}>
                <DeleteTwoToneIcon color="action"/>
            </Button>
        </div>
    );
}