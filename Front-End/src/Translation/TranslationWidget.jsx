import React, { useEffect, useState } from 'react';

const TranslationWidget = () => {
    const [showWidget, setShowWidget] = useState(false);

    useEffect(() => {
        const loadGoogleTranslateScript = () => {
            if (!window.google || !window.google.translate) {
                const googleTranslateScript = document.createElement('script');
                googleTranslateScript.type = 'text/javascript';
                googleTranslateScript.async = true;
                googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                document.body.appendChild(googleTranslateScript);
            }
        };

        window.googleTranslateElementInit = function() {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',  // Set to your default page language
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        };

        if (showWidget) {
            loadGoogleTranslateScript();
        }
    }, [showWidget]);

    return (
        <div style={{ width:'40px'}}>
            <button onClick={() => setShowWidget(!showWidget)} style={{ padding: '10px 20px' }}>
                {showWidget ? 'Hide Translator' : 'Show Translator'}
            </button>
            {showWidget && <div id="google_translate_element"></div>}
        </div>
    );
};

export default TranslationWidget;
