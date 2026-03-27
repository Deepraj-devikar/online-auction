import { Button, Paper, TextField } from "@mui/material";
import { connect } from "react-redux";
import { ADDRESS } from "../../redux/constants";
import { AddAddressApi } from "../../services/DataService";
import AddressSelected from "../addresses/AddressSelected";
import './CustomerDetail.css';

function CustomerDetail(props) {
    const handleUserInput = (e) => {
        props.dispatch({
            type: ADDRESS,
            key: e.target.name,
            value: e.target.value
        })
    };

    const continueClickHandler = () => {
        let isValidAddress = true;
        for(let key in props.addressData){
            if(props.addressData[key] == ''){
                isValidAddress = false;
            }
        }
        if(isValidAddress){
            AddAddressApi(props.addressData)
            .then(response => {
                console.log('Add Address, ', response);
                if (response.status == 201) {
                    props.countPlaceOrderGetSet(3);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }else{
            alert("Enter Address...")
        }
    }

    return (
        <div className="cart-customer-detail-box">
            <Paper style={{
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #DCDCDC',
                borderRadius: '1px',
                opacity: 1
            }}>
                <div className="cart-customer-detail-content">
                    <div className="cart-customer-detail-title-n-add-new">
                        <div className="cart-customer-detail-title">
                            Customer Details
                        </div>
                        <div className="cart-customer-detail-add-new">
                            <Button variant="outlined" sx={{
                                textTransform: 'none', 
                                color: '#A03037', 
                                borderColor: '#A03037'
                            }}>
                                Add New Address
                            </Button>
                        </div>
                    </div>
                    <div className="cart-customer-detail-addresses">
                        <div className="cart-customer-detail-user-detail">
                            <TextField size="small" fullWidth={true} label="Full Name" name="name" onChange={handleUserInput} value={props.addressData.name}/>
                            <TextField size="small" fullWidth={true} label="Mobile Number" name="phoneNumber" onChange={handleUserInput} value={props.addressData.phoneNumber}/>
                        </div>
                        <AddressSelected />
                    </div>
                    <div className="cart-customer-detail-continue-button" style={{
                        display: props.placeOrderGetSet == 2 ? 'visible' : 'none'
                    }}>
                        <Button variant="contained" onClick={continueClickHandler}>
                            CONTINUE
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        addressData: state.AddressReducer
    }
}

export default connect(mapStateToProps) (CustomerDetail);