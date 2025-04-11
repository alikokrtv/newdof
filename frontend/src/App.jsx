import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import AdimaAcilanDofler from './components/AdimaAcilanDofler';
import DofAc from './components/DofAc';
import RaporCalistir from './components/RaporCalistir';
import ActigimDofler from './components/ActigimDofler';
import DofKontrol from './components/DofKontrol';
import DofDetay from './components/DofDetay';
import Profile from './components/Profile';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                {isLoggedIn && (
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        setIsLoggedIn={setIsLoggedIn} // Çıkış yap için prop ekledik
                    />
                )}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'margin-left 0.3s ease', // Animasyonlu geçiş
                    }}
                >
                    {isLoggedIn && (
                        <Header
                            toggleSidebar={toggleSidebar}
                            isSidebarOpen={isSidebarOpen}
                        />
                    )}
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Routes>
                            <Route
                                path="/actigim-dofler"
                                element={<ActigimDofler />}
                            />
                            <Route path="/dof-ac" element={<DofAc />} />
                            <Route
                                path="/rapor-calistir"
                                element={<RaporCalistir />}
                            />
                            <Route
                                path="/dof-kontrol"
                                element={<DofKontrol />}
                            />
                            <Route
                                path="/dof-detay/:id"
                                element={<DofDetay />}
                            />
                            <Route
                                path="/profil"
                                element={<Profile currentUser={{ id: 1, username: 'user2' }} isAdmin={true} />}
                            />
                            <Route
                                path="/"
                                element={<Navigate to="/actigim-dofler" />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

export default App;