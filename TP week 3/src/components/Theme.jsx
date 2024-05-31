import React, { useState, useEffect } from "react"

import theme_icon from '../assets/images/theme-icon_dark.png'


/**
 * Theme (located in header)
 */
function Theme() {

    const [darkTheme, setDarkTheme] = useState(false);  // to manage theme (duh)


    /* on theme change ==> change theme (no way!) */
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