import Textarea from '@mui/joy/Textarea';
import { FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { connect } from 'react-redux';
import { ADDRESS } from '../../redux/constants';
import './AddressSelected.css';

function AddressSelected(props) {
    const handleUserInput = (e) => {
        props.dispatch({
            type: ADDRESS,
            key: e.target.name,
            value: e.target.value
        })
    };

    return (
        <div className="cart-address-selected-box">
            <div className='cart-address-selected-address-textarea'>
                <Textarea name="fullAddress" placeholder="Address" lable="Address" variant="outlined" fullWidth={true} onChange={handleUserInput}>
                    {props.fullAddress}
                </Textarea>
            </div>
            <div className='cart-address-selected-city-n-state'>
                <TextField size="small" fullWidth={true} label="City/Town" name="city" onChange={handleUserInput} value={props.city}/>
                <TextField size="small" fullWidth={true} label="State" name="state" onChange={handleUserInput} value={props.state}/>
            </div>
            <div>
                <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="addressType"
                    value={props.addressType}
                    onChange={handleUserInput}
                >
                    <FormControlLabel value="home" control={<Radio style={{color: '#A03037'}} />} label="Home" />
                    <FormControlLabel value="work" control={<Radio style={{color: '#A03037'}} />} label="Work" />
                    <FormControlLabel value="other" control={<Radio style={{color: '#A03037'}} />} label="Other" />
                </RadioGroup>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.AddressReducer
    };
}

export default connect(mapStateToProps) (AddressSelected);