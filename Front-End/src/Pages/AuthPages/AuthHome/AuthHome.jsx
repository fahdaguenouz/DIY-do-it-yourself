import React, { useEffect, useState } from 'react';
import { CAlert } from "@coreui/react";



const AuthHome = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Automatically show the alert when the component mounts
        setVisible(true);

        // Optional: Automatically hide after a delay
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {visible && (
                <CAlert color="success" dismissible style={{
                    position: 'absolute', // Use 'fixed' if you want it to stay in place while scrolling
                    top: '20px',          // Adjust top positioning as needed
                    right: '20px',        // Places it on the right side of the page
                    width: '300px',        // Width of the alert
                    height: '70px',       // Height of the alert
                    textAlign: 'center',
                    margin: "auto",
                }} onClose={() => setVisible(false)}>
                    Login successful - Welcome!
                </CAlert>
            )}
            
            <p>Login successful</p>
        </div>
    );
}

export default AuthHome;
