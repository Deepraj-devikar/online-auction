import { Container } from "@mui/material";
import './Footer.css';

export default function Footer() {
    return (
        <div className="footer-box">
            <Container maxWidth="lg" sx={{height: '100%'}}>
                <div className="footer-copyright-text">
                    Copyright © 2020, Bookstore Private Limited. All Rights Reserved
                </div>
            </Container>
        </div>
    );
}