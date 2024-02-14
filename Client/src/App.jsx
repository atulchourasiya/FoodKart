import CarouselSilder from "./Component/Carousel/Carousel";
import NavigationBar from "./Component/Navbar/Navbar";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Testimonial from "./Component/Testimonial/Testimonial";
import Sidebar from "./Component/Sidebar/Sidebar";
import Category from "./Component/Category/Category";
import About from "./Component/About/About";
import Service from "./Component/Service/Service";
import Footer from "./Component/Footer/Footer";
import Menu from "./Component/Menu/Menu";
import Contact from "./Component/Contact/Contact";
import Gallery from "./Component/Gallery/Gallery";
import Reservation from "./Component/Reservation/Reservation";
import Login from "./Component/Login/Login";
import Signup from "./Component/Login/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verification from "./Component/Login/Verification";
import ResetPassword from "./Component/Login/ResetPassword";
import Cart from "./Component/Sidebar/Cart";
import LoadingPage from "./Component/LoadingPage/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Component/Order/Order";
import PaymentVerify from "./Component/Payment/PaymentVerify";
import { useEffect } from "react";
import { setUser } from "./Redux/Slices/authSlice";
import { auth } from "./firebase";

function App() {
  const { initialLoading } = useSelector((state) => state.initialLoadingState);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null && user.emailVerified) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            userid: user.uid,
            emailVerified: user.emailVerified,
          })
        );
      }
    });
  }, []);
  return (
    <HashRouter>
      <div className='App'>
        <div>
          {initialLoading ? (
            <LoadingPage />
          ) : (
            <>
              <ToastContainer />
              <Order />
              <Routes>
                <Route
                  path='/'
                  element={
                    <>
                      <Sidebar />
                      <Cart />
                      <NavigationBar />
                      <CarouselSilder />
                      <About />
                      <Category />
                      <Service />
                      <Testimonial />
                      <Footer />
                    </>
                  }></Route>
                <Route
                  path='/reservation'
                  element={
                    <>
                      <Sidebar />
                      <Cart />
                      <NavigationBar />
                      <CarouselSilder />
                      <Reservation />
                      <Footer />
                    </>
                  }></Route>
                <Route
                  path='/menu'
                  element={
                    <>
                      <Sidebar />
                      <Cart />
                      <NavigationBar />
                      <CarouselSilder />
                      <Menu />
                      <Footer />
                    </>
                  }></Route>
                <Route
                  path='/gallery'
                  element={
                    <>
                      <Sidebar />
                      <Cart />
                      <NavigationBar />
                      <CarouselSilder />
                      <Gallery />
                      <Footer />
                    </>
                  }></Route>
                <Route
                  path='/contact'
                  element={
                    <>
                      <Sidebar />
                      <Cart />
                      <NavigationBar />
                      <CarouselSilder />
                      <Contact />
                      <Footer />
                    </>
                  }></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/verification' element={<Verification />}></Route>
                <Route
                  path='/resetpassword'
                  element={<ResetPassword />}></Route>
                <Route
                  path='/order/:orderId'
                  element={<PaymentVerify />}
                  exact></Route>
              </Routes>
            </>
          )}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
