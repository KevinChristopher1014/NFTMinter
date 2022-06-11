import React, { memo } from "react";
// import PropTypes from "prop-types";

import { Routes , Route } from "react-router-dom";

import ProtectedRoute from "../utils/ProtectedRoute";

// Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Mint from "../pages/Mint";
import NFTs from "../pages/NFTs";

const Routing = () => {
    // const { selectLanding } = props;

    return (
        <Routes>
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={< Register />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<NFTs />} />
                <Route path="/mint" element={< Mint/>} />
                <Route path="/nfts" element={< NFTs/>} />
            </Route>
        </Routes>
    );
}

Routing.propTypes = {
    // selectLanding: PropTypes.func.isRequired,
};

export default memo(Routing);
