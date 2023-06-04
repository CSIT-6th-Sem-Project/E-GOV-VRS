import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "./pages/BaseLayout";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
export const SiteRoute = () => {
    return <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<BaseLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
}