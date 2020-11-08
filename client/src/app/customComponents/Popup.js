import React from "react";

const Popup = ({ children, show = false, className = "" }) => {
    return (
        <React.Fragment>
            {
                show && (
                    <div className="popup">
                        <div className={`popup__modal ${className}`}>
                            {children}
                        </div>
                    </div>
                )
            }
            
        </React.Fragment>
    )
}

export default Popup;