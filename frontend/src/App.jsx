import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AdimaAcilanDofler from './components/AdimaAcilanDofler';
import DofAc from './components/DofAc';
import RaporCalistir from './components/RaporCalistir';
import Login from './components/Login';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {isLoggedIn && <Sidebar setIsLoggedIn={setIsLoggedIn} />}
                <div style={{ marginLeft: isLoggedIn ? 240 : 0, padding: '20px', width: '100%' }}>
                    <Routes>
                        <Route
                            path="/login"
                            element={<Login setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route
                            path="/"
                            element={isLoggedIn ? <AdimaAcilanDofler /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/dof-ac"
                            element={isLoggedIn ? <DofAc /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/rapor-calistir"
                            element={isLoggedIn ? <RaporCalistir /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;