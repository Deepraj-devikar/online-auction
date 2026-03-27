import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Container } from '@mui/material';
import bookLogo from '../../images/education.svg';
import './Header.css';
import { connect } from "react-redux";
import { useEffect } from 'react';
import { CART_DATA, CART_PAGE, SEARCH, WISHLIST_DATA } from '../../redux/constants';
import { GetCartApi, GetWishlistApi } from '../../services/DataService';
import { useNavigate } from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    '&:hover': {
        backgroundColor: '#fff',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9D9D9D'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#9D9D9D',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Header(props) {
    // cart length will fetch in props.cartData.books.length;
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
        []
    )

    const navigate = useNavigate();

    const cartIconClickHandler = () => {
        navigate('/cart');
    };

    const wishlistIconClickHandler = () => {
        navigate('/wishlist');
    }

    const searchHandler = (e) => {
        props.dispatch({
            type: SEARCH,
            search: e.target.value
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: '#A03037'}}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <div className='header-logo-heading'>
                            <img src={bookLogo}/>
                            Bookstore
                        </div>
                    </Typography>
                    <Search sx={{ flexGrow: 0.7 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            fullWidth={true}
                            onChange={searchHandler}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 0.3 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={cartIconClickHandler}
                        >
                            <Badge badgeContent={props.cartData ? props.cartData.books.length : 0} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={wishlistIconClickHandler}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        cartData: state.CartReducer.cartData
    }
}

export default connect(mapStateToProps) (Header);