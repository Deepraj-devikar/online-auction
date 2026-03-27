import image from '../../images/Image-11@2x.png';
import './CartOrderSummeryBook.css';

export default function CartOrderSummeryBook(props) {
    return (
        <div className="cart-order-summery-product">
            <div className="cart-order-summery-product-image">
                <img src={image} width="100%"/>
            </div>
            <div className="cart-order-summery-product-detail">
                <div className="cart-order-summery-product-detail-book-name">
                    {props.data.bookName}
                </div>
                <div className="cart-order-summery-product-detail-author-name">
                    {props.data.author}
                </div>
                <div className="cart-order-summery-product-detail-price">
                    <div className="cart-order-summery-product-detail-price-right">
                        Rs. {props.data.price}
                    </div>
                    <div className="cart-order-summery-product-detail-price-wrong">
                        Rs. 2000
                    </div>
                </div>
            </div>
        </div>
    );
}