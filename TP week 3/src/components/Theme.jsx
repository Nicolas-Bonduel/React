import React, { useState, useEffect } from "react"

import theme_icon from '../assets/images/theme-icon_dark.png';

function Theme() {

    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const root = document.querySelector('#root');
        darkTheme ?
            root?.classList.add('theme-dark') :
            root?.classList.remove('theme-dark');
    }, [darkTheme]);


    return (
        <>
            <div className="theme-option" onClick={() => setDarkTheme(!darkTheme)}>
                <span>Theme</span>
                <img className="theme-icon" alt="theme option" src={theme_icon} />
            </div>
        </>
    )

}

export default Theme;