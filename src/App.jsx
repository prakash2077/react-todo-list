import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import Homepage from "./pages/HomePage";
import Hero from "./components/Hero";
import Tasks from "./components/Tasks";
import ContactUs from "./components/ContactUs";

const App = () => {

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log('beforeinstallprompt event triggered');
      // Let the browser display the native "Install App" prompt
      event.prompt(); // This triggers the browser's "Install App" dialog
      event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }
      });
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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