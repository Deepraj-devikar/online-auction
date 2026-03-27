import './Feedback.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { yellow, grey } from '@mui/material/colors';

export default function Feedback() {
    return (
        <div className='feedback-box-outer'>
            <div className='feedback-box-profile-circle'> 
                AC
            </div>
            <div className='feedback-box-detail'>
                <div className='feedback-box-detail-user-name'>
                    Aniket Chile
                </div>
                <div className='feedback-box-input-stars'>
                    <StarRateIcon sx={{ color: yellow[700] }}/>
                    <StarRateIcon sx={{ color: yellow[700] }}/>
                    <StarRateIcon sx={{ color: yellow[700] }}/>
                    <StarOutlineIcon sx={{ color: grey[700] }}/>
                    <StarOutlineIcon sx={{ color: grey[700] }}/>
                </div>
                <div className='feedback-box-detailed-text'>
                    Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.
                </div>
            </div>
        </div>
    );
}