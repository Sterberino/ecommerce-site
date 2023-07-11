import React from "react";
import '../Styles/BlackMirrorSpinner.css'

export default function BlackMirrorSpinner({style})
{
    return (
        <div className = "blackmirrorSpinner" style = {style !==null && style !== undefined ? style : null}>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
            <div className = "blackmirrorSpinner-part"></div>
        </div>
    )
}