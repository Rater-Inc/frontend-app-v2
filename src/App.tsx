import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateSpacePage from "./pages/CreateSpacePage";
import SelectionPage from "./pages/SelectionPage";
import RatingPage from "./pages/RatingPage";
import OverallResultsPage from "./pages/OverallResultsPage";
import IndividualResultsPage from "./pages/IndividualResultsPage";
import JoinSpacePage from "./pages/JoinSpacePage";
import EnterSpaceIdPage from "./pages/EnterSpaceIdPage";
import NotFoundPage from "./pages/NotFoundPage";

import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
    return (
        <div className="min-h-screen relative bg-gradient-to-br from-purple-500/30 to-pink-500/30 ">
            {/* Background container */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "url('https://gartic.io/static/images/new/textura.png')",
                    backgroundRepeat: "repeat",
                    opacity: 0.7,
                }}
            ></div>

            {/* Content container */}
            <div className="relative z-10">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/create-space"
                            element={<CreateSpacePage />}
                        />
                        <Route
                            path="/enter-space"
                            element={<EnterSpaceIdPage />}
                        />
                        <Route
                            path="/join/:spaceId"
                            element={<JoinSpacePage />}
                        />
                        <Route
                            path="/space/:spaceId/select-action"
                            element={
                                <ProtectedRoute>
                                    <SelectionPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/space/:spaceId/rate"
                            element={
                                <ProtectedRoute>
                                    <RatingPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/space/:spaceId/results/overall"
                            element={
                                <ProtectedRoute>
                                    <OverallResultsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/space/:spaceId/results/individual"
                            element={
                                <ProtectedRoute>
                                    <IndividualResultsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
