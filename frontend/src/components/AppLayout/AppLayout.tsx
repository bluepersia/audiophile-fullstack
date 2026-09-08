import type { JSX } from "react/jsx-runtime";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import AuthProvider from "../../contexts/AuthContext/AuthProvider";
import CartProvider from "../../contexts/CartContext/CartProvider";
import ModalProvider from "../../contexts/ModalContext/ModalProvider";
import Modal from "../Modal/Modal";
import styles from "./AppLayout.module.scss";
import ToastProvider from "../../contexts/ToastContext/ToastProvider";
import Toast from "../Toast/Toast";

export default function AppLayout(): JSX.Element {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <ModalProvider>
            <Header />
            <main className={styles.main}>
              <Outlet />
            </main>
            <Modal />
            <Toast />
            <Footer />
          </ModalProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
