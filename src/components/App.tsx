import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/main-page/MainPage";
import {MainLayout} from "./layouts/MainLayout";
import '@assets/css/reset.css'
import '@assets/css/index.css'
import {NotFoundPage} from "@comp/pages/not-found-page/NotFoundPage";
import {CatalogPage} from "@comp/pages/catalog-page/CatalogPage";
import {ProductPage} from "@comp/pages/product-page/ProductPage";
import {OrderPage} from "@comp/pages/order-page/OrderPage";
import {CartPage} from "@comp/pages/cart-page/CartPage";
import {AdminLoginPage} from "@comp/pages/admin-login-page/AdminLoginPage";
import {AdminLayout} from "@comp/layouts/AdminLayout";
import {AdminChangeCatalogPage} from "@comp/pages/admin-change-catalog-page/AdminChangeCatalogPage";
import {AdminAddProductPage} from "@comp/pages/admin-add-product-page/AdminAddProductPage";
import {RequiredAuth} from "@comp/hoc/required-auth/RequiredAuth";
import {AdminStatPage} from "@comp/pages/admin-stat-page/AdminStatPage";
import {AdminEditProductPage} from "@comp/pages/admin-edit-product-page/AdminEditProductPage";
import {RequiredGuest} from "@comp/hoc/required-guest/RequiredGuest";

export const App = () => {
    return (
        <>
            <Routes>
                <Route index element={<MainPage/>}/>

                <Route path="admin" element={<AdminLayout/>}>
                    <Route index element={<Navigate to={'/admin/login'}/>}/>
                    <Route
                        path="catalog"
                        element={
                            <RequiredAuth fallbackUrl="/admin/login">
                                <AdminChangeCatalogPage/>
                            </RequiredAuth>
                        }
                    />
                    <Route
                        path="product"
                        element={
                            <RequiredAuth fallbackUrl="/admin/login">
                                <AdminAddProductPage/>
                            </RequiredAuth>
                        }
                    />

                    <Route
                        path="product/:id/edit"
                        element={
                            <RequiredAuth fallbackUrl="/admin/login">
                                <AdminEditProductPage/>
                            </RequiredAuth>
                        }
                    />

                    <Route
                        path="stat"
                        element={
                            <RequiredAuth fallbackUrl="/admin/login">
                                <AdminStatPage/>
                            </RequiredAuth>
                        }
                    />

                    <Route
                        path="login"
                        element={
                            <RequiredGuest fallbackUrl={'/admin/catalog'}>
                                <AdminLoginPage/>
                            </RequiredGuest>
                        }
                    />

                </Route>
                <Route element={<MainLayout/>}>
                    <Route path="catalog" element={<CatalogPage/>}/>
                    <Route path="product/:id" element={<ProductPage/>}/>
                    <Route path="order" element={<OrderPage/>}/>
                    <Route path="cart" element={<CartPage/>}/>
                </Route>


                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
};
