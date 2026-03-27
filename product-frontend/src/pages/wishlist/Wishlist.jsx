import { Breadcrumbs, Container, Link } from "@mui/material";
import Header from "../../components/header/Header";
import './Wishlist.css';
import WishlistBook from "../../components/books/WishlistBook";
import { GetWishlistApi, RemoveFromWishlistApi } from "../../services/DataService";
import { WISHLIST_DATA } from "../../redux/constants";
import { connect } from "react-redux";
import Footer from "../../components/footer/Footer";

function Wishlist(props) {
    const updateWishlist = () => {
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
    }

    const deleteHandler = (bookID) => {
        RemoveFromWishlistApi(bookID)
        .then(response => {
            if(response.status == 202) {
                updateWishlist();
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="main-wishlist-page">
            <Header />
            <Container>
                <div className="wishlist-page-breadcrum-n-content">
                    <div className="wishlist-page-breadcrum">
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
                                My Whishlist
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <div className="wishlist-page-content">
                        <div className="wishlist-page-table-head">
                            <div >
                                My Wishlist ({props.wishlistData.books.length})
                            </div>
                        </div>
                        {
                            props.wishlistData.books.map(book => (
                                <div className="wishlist-page-table-content">
                                    <WishlistBook key={book.prductID} data={book} deleteHandler={deleteHandler}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        wishlistData: state.WishlistReducer.wishlistData
    }
}

export default connect(mapStateToProps) (Wishlist);