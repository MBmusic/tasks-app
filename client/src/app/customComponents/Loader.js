import React from "react";

const Loader = ({ children, load = false }) => {
    return (
        <React.Fragment>
            { 
                load ? (
                    children
                ) : (
                    <div className="text--center">
                        <div className="preloader-wrapper small active">
                            <div className="spinner-layer">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>

                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>

                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Loader;