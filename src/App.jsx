import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import Homepage from "./pages/HomePage";
import Hero from "./components/Hero";
import Tasks from "./components/Tasks";
import ContactUs from "./components/ContactUs";

const App = () => {

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // console.log("beforeinstallprompt event triggered");

      // Trigger the browser's native install prompt
      event.prompt();

      // Handle the user's choice
      event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation");
        } else {
          console.log("User dismissed the PWA installation");
        }
      });
    };

    // Register the beforeinstallprompt event listener
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup the listener when the component unmounts
    // return () => {
    //   window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    // };
  }, []); // Empty dependency array ensures this runs only once on mount
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