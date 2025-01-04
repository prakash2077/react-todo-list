import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import Homepage from "./pages/HomePage";
import Hero from "./components/Hero";
import Tasks from "./components/Tasks";
import ContactUs from "./components/ContactUs";

const App = () => {
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the mini-infobar from appearing on mobile
      console.log("beforeinstallprompt event triggered");

      // Show your custom install prompt UI if desired
      // Example: Store event for later use
      const installButton = document.getElementById("install-button");
      if (installButton) {
        installButton.style.display = "block";
        installButton.onclick = () => {
          event.prompt(); // Show the browser's install prompt
          event.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the PWA installation");
            } else {
              console.log("User dismissed the PWA installation");
            }
          });
          installButton.style.display = "none";
        };
      }
    };

    // Register the event listener
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
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