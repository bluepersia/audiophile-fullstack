import type { JSX } from "react/jsx-runtime";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import AuthProvider from "../../contexts/AuthContext/AuthProvider";
import CartProvider from "../../contexts/CartContext/CartProvider";
import ModalProvider from "../../contexts/ModalContext/ModalProvider";
import Modal from "../Modal/Modal";

export default function AppLayout(): JSX.Element {
  return (
    <AuthProvider>
      <CartProvider>
        <ModalProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Modal />
          <Footer />
        </ModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}
