import { Breadcrumbs, Link } from "@mui/material";
import CloseBox from "./CloseBox";
import CustomerDetail from "./CustomerDetail";
import OrderSummery from "./OrderSummery";
import PlaceOrder from "./PlaceOrder";
import './CartPage.css';
import { useState } from "react";

export default function CartPage() {
    const [state, setState] = useState({
        placeOrderGetSet: 1
    });

    const countPlaceOrderGetSet = (count) => {
        setState(prevState => ({
            ...prevState,
            placeOrderGetSet: count
        }));
    }

    return (
        <div className="cart-page-breadcrum-n-content">
            <div className="cart-page-breadcrum">
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
                        My Cart
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="cart-page-content">
                <PlaceOrder placeOrderGetSet={state.placeOrderGetSet} countPlaceOrderGetSet={countPlaceOrderGetSet}/>
                {state.placeOrderGetSet > 1 ? <CustomerDetail placeOrderGetSet={state.placeOrderGetSet} countPlaceOrderGetSet={countPlaceOrderGetSet}/> : <CloseBox name="Address Details" />}
                {state.placeOrderGetSet > 2 ? <OrderSummery placeOrderGetSet={state.placeOrderGetSet} countPlaceOrderGetSet={countPlaceOrderGetSet}/> : <CloseBox name="Order summery" />}
            </div>
        </div>
    );
}