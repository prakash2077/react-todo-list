import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/HomePage";
import Hero from "./components/Hero";
import Tasks from "./components/Tasks";
import ContactUs from "./components/ContactUs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}>
          <Route index element={<Hero/>} />
          <Route path="tasks" element={<Tasks/>} />
          <Route path="contact-us" element={<ContactUs/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App