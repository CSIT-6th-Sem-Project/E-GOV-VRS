import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "./pages/BaseLayout";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { FAQ } from "./pages/FAQ";
import { TransportLaw } from "./pages/TransportLaw";
import { Single_VRS } from "./pages/VehicleRegistrationForm";
import { Lab } from "./pages/Lab4";
import { Accounts } from "./pages/Accounts";
import { VRSUpdate } from "./pages/updateRegistrationForm";
export const SiteRoute = () => {
    return <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<BaseLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/FAQ" element={<FAQ/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/transport-laws" element={<TransportLaw/>}/>
            <Route path="/vrs-single" element={<Single_VRS/>}/>
            <Route path="/update-vrs" element={<VRSUpdate/>}/>
            <Route path="/accounts" element={<Accounts/>}/>
        </Route>
        <Route path="/lab4" element={<Lab/>}/>
    </Routes>
    </BrowserRouter>
    </>
}