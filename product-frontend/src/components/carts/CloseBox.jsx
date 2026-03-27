import { Paper } from "@mui/material";
import './CloseBox.css';

export default function CloseBox(props){
    return(
        <div className="cart-close-box">
            <Paper style={{
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #DCDCDC',
                borderRadius: '1px',
                opacity: 1
            }}>
                <div className="cart-close-box-text">
                    {props.name}
                </div>
            </Paper>
        </div>
    );
}