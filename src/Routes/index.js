import ProductDetailPage from "../Components/ProductDetailPage/ProductDetailPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import Homepage from "../Pages/HomePage/HomePage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import OrderPage from "../Pages/OrderPage/OrderPage";
import ProductsPage from "../Pages/ProductsPage/ProductsPage";
import SignInPage from "../Pages/SignInPage/SignInPage";
import TypeProductPage from "../Pages/TypeProductPage/TypeProductPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import AdminPage from "../Pages/AdminPage/AdminPage";

export const routes = [
    {
        path:'/',
        page: Homepage,
        isShowHeader: true,
    },
    {
        path:'/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path:'/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path:'/type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path:'/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path:'/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path:'/product-detail',
        page: ProductDetailPage,
        isShowHeader: true,
    },
    {
        path:'/profile-user',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path:'/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path:'*',
        page: NotFoundPage,
    },
]