import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InstallPWAButton from '../InstallPWAButton';
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <InstallPWAButton />
    </>
  )
}

export default HomePage