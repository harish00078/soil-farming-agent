import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import SoilList from "./pages/SoilList";
export default function App(){
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/soils" element={<SoilList/>} />
   </Routes>
  </BrowserRouter>
 );
}
