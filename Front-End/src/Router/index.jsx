// DynamicRouter.jsx

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GuestLayout from "../Layouts/GuestLayouts/GuestLayout";
// import UserLayout from "../Layouts/UsersLayouts/UserLayout";
// import AboutUs from "../Pages/AboutUs";

import LoginLayouts from "../Layouts/GuestLayouts/LoginLayouts";
// import Login from "../Pages/Login/Login";
// import AuthHome from './../Pages/AuthPages/AuthHome/AuthHome';
// import Contact from './../Pages/GuestPages/contact/Contact';
// import Blog from './../Pages/GuestPages/blog/Blog';
// import Pricing from './../Pages/GuestPages/pricing/Pricing';
// import Team from './../Pages/GuestPages/team/Team';
// import CourseHome from './../Pages/GuestPages/allcourses/CourseHome';
// import About from './../Pages/GuestPages/about/About';
import Home from './../Pages/GuestPages/home/Home';
import AuthAdmin from "@/Pages/AuthPages/AuthHome/AuthAdmin";
// import { Usercontext } from "@/Context/AuthProvider";
import AdminLayout from "@/Layouts/UsersLayouts/AdminLayout";
import ModeratorLayout from "@/Layouts/UsersLayouts/ModeratorLayout";
import CreatorLayout from "@/Layouts/UsersLayouts/CreatorLayout";
import StandarLayout from "@/Layouts/UsersLayouts/StandarLayout";
import NotFoundPage from "@/Pages/GuestPages/NotFound/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import GestUsers from "@/Pages/AuthPages/ADMIN/Pages/GestUsers";
import Login from "@/Pages/authentication/login";
import Register from "@/Pages/authentication/register";
import AjouterUser from "@/Pages/AuthPages/ADMIN/Pages/Forms/AjouterUser";
import UpdateUser from "@/Pages/AuthPages/ADMIN/Pages/Forms/UpdateUser";
import About from "@/Pages/GuestPages/about/About";
import CourseHome from "@/Pages/GuestPages/allcourses/CourseHome";
import Team from "@/Pages/GuestPages/team/Team";
import Pricing from "@/Pages/GuestPages/pricing/Pricing";
import Blog from "@/Pages/GuestPages/blog/Blog";
import Contact from "@/Pages/GuestPages/contact/Contact";
import Tutorials from "@/Pages/AuthPages/CREATOR/Pages/Tutorials";
import AjouterTutorial from "@/Pages/AuthPages/CREATOR/Pages/Forms/AjouterTutorial";
// import AuthLogin from "@/Pages/authentication/login";
// import Register from './../Pages/authentication/register';
import AdminDashboard from "@/Pages/AuthPages/ADMIN/Pages/AdminDashboard";
import CreatorDashboard from "../Pages/AuthPages/CREATOR/Pages/CreatorDashboard";
import CreatorAnalytics from "@/Pages/AuthPages/CREATOR/Pages/CreatorAnalytics";
import CreatorLikesTuto from "@/Pages/AuthPages/CREATOR/Pages/CreatorLikesTuto";
import CreatorCategory from "@/Pages/AuthPages/CREATOR/Pages/CreatorCategory";
import TutorialDetails from "@/Pages/AuthPages/CREATOR/Pages/TutorialDetails";
import AdminProfile from "@/Pages/AuthPages/ADMIN/Pages/AdminProfile";
import AdminCategory from "@/Pages/AuthPages/ADMIN/Pages/AdminCategory";
import AdminEdit from "@/Pages/AuthPages/ADMIN/Pages/AdminEdit";
import GestAdminCategory from "@/Pages/AuthPages/ADMIN/Pages/GestAdminCategory";
import UpdateTutorials from "@/Pages/AuthPages/CREATOR/Pages/Forms/UpdateTutorials";
import GestAdminSubCategory from "@/Pages/AuthPages/ADMIN/Pages/GestAdminSubCategory";
import StandardLikes from "@/Pages/AuthPages/STANDARD/Pages/StandardLikes";
import StandardComments from "@/Pages/AuthPages/STANDARD/Pages/StandardComments";
import Allcategory from "@/Pages/AuthPages/ALL_ACCES/AllCategory";
import AllSubCategory from "@/Pages/AuthPages/ALL_ACCES/AllSubCategory";
import StandardDashboard from "@/Pages/AuthPages/STANDARD/Pages/StandardDashboard";
import ModerateurDashboard from "@/Pages/AuthPages/MODERATOR/Pages/ModerateurDashboard";
import SignaledTutorials from "@/Pages/AuthPages/MODERATOR/Pages/SignaledTutorials";
import AdminLikes from "@/Pages/AuthPages/ADMIN/Pages/AdminLikes";
import AdminComments from "@/Pages/AuthPages/ADMIN/Pages/AdminComments";
import AllTutorials from "@/Pages/AuthPages/ALL_ACCES/AllTutorials";
import AllTutorialDetails from "@/Pages/AuthPages/ALL_ACCES/AllTutorialDetails";

const DynamicRouter = () => {
    //   const { user,setUser } = Usercontext();
    // const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    //   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [router, setRouter] = useState(null);
    useEffect(() => {
        const checkUser = async () => {
            const fetchedUser = JSON.parse(localStorage.getItem('user'));
            if (!user && fetchedUser) {
                dispatch(setUser(fetchedUser));
            }
        };

        checkUser();
    }, [dispatch, user]);

    console.log('this is the user from router ' + user);



    const getRoleBasedRoutes = (role_id) => {
        switch (role_id) {
            case 1: // Admin
                return {
                    element: <AdminLayout />,
                    children: [
                        {
                            path: '/admin',
                            element: <AdminDashboard />
                        },
                        {
                            path: '/admin/dashboard',
                            element: <AdminDashboard />
                        },
                        {
                            path: '/admin/gestion-users',
                            element: <GestUsers />
                        },
                        {
                            path: '/admin/gestion-users/ajouter-user',
                            element: <AjouterUser />
                        },
                        {
                            path: '/admin/gestion-users/update-user/:userId',
                            element: <UpdateUser />
                        },
                        {
                            path: '/admin/admin-profile',
                            element: <AdminProfile />
                        },
                        {
                            path: '/admin/gestion-category',
                            element: <AdminCategory />
                        },
                        {
                            path: '/admin/edit-profile',
                            element: <AdminEdit />
                        },
                        {
                            path: '/admin/gestion-sub-category',
                            element: <GestAdminCategory />
                        },
                        {
                            path: '/admin/gestion-sub-category/:id',
                            element: <GestAdminSubCategory />
                        },
                        { path: 'all/category', element: <Allcategory /> },
                        { path: '/all/category/subcategory/:id', element: <AllSubCategory /> },
                        { path: '/admin/tutorials/mylikes', element: <AdminLikes /> },
                        { path: '/admin/tutorials/mycomments', element: <AdminComments /> },
                        { path: '/all/category/subcategory/tutorials/:id', element: <AllTutorials /> },
                        { path: '/all/category/subcategory/tutorialsdeatail/:id', element: <AllTutorialDetails /> },



                        // Other admin-specific routes
                    ]
                };
            case 2: // Moderator
                return {
                    element: <ModeratorLayout />,
                    children: [
                        { path: '/moderator', element: <ModerateurDashboard /> },
                        { path: '/moderator/dashboard', element: <ModerateurDashboard /> },
                        { path: '/moderator/signals', element: <SignaledTutorials /> },
                        { path: '/all/category', element: <Allcategory /> },
                        { path: '/all/category/subcategory/:id', element: <AllSubCategory /> },
                        { path: '/moderator/tutorials/mylikes', element: <AllSubCategory /> },
                        { path: '/moderator/tutorials/mycomments', element: <AllSubCategory /> },
                        { path: '/all/category/subcategory/tutorials/:id', element: <AllTutorials /> },
                        { path: '/all/category/subcategory/tutorialsdeatail/:id', element: <AllTutorialDetails /> },




                        // Other moderator-specific routes
                    ]
                };
            case 3: // Creator
                return {
                    element: <CreatorLayout />,
                    children: [
                        { path: '/creator', element: <CreatorDashboard /> },
                        {
                            path: '/creator/dashboard',
                            element: <CreatorDashboard />
                        },
                        { path: '/creator/gestion-tutorials', element: <Tutorials /> },
                        { path: '/creator/add-tutorial', element: <AjouterTutorial /> },
                        { path: '/creator/creator-analytics', element: <CreatorAnalytics /> },
                        { path: '/creator/creator-tutorials-likes', element: <CreatorLikesTuto /> },
                        { path: '/creator/category', element: <CreatorCategory /> },
                        { path: '/creator/tutorial-detail/:id/:titre', element: <TutorialDetails /> },
                        { path: '/creator/update-tutorial/:id', element: <UpdateTutorials /> },
                        { path: '/all/category', element: <Allcategory /> },
                        { path: '/all/category/subcategory/:id', element: <AllSubCategory /> },
                        { path: '/all/category/subcategory/tutorials/:id', element: <AllTutorials /> },
                        { path: '/all/category/subcategory/tutorialsdeatail/:id', element: <AllTutorialDetails /> },










                        // Other creator-specific routes
                    ]
                };
            case 4: // Standard User
                return {
                    element: <StandarLayout />,
                    children: [
                        { path: '/standard', element: <StandardDashboard /> },
                        { path: '/standard/dashboard', element: <StandardDashboard /> },
                        { path: '/standard/tutorials/mylikes', element: <StandardLikes /> },
                        { path: '/standard/tutorials/mycomment', element: <StandardComments /> },
                        { path: '/all/category', element: <Allcategory /> },
                        { path: '/all/category/subcategory/:id', element: <AllSubCategory /> },
                        { path: '/all/category/subcategory/tutorials/:id', element: <AllTutorials /> },
                        { path: '/all/category/subcategory/tutorialsdeatail/:id', element: <AllTutorialDetails /> },



                        // Other standard user-specific routes
                    ]
                };
            default: // Guest
                return {
                    element: <GuestLayout />,
                    children: [
                        { path: '/', element: <Home /> },
                        {
                            path: '/about',
                            element: <About />
                        },
                        {
                            path: '/tutorials',
                            element: <CourseHome />
                        },
                        {
                            path: '/team',
                            element: <Team />
                        },
                        {
                            path: '/pricing',
                            element: <Pricing />
                        },
                        {
                            path: '/blog',
                            element: <Blog />
                        },
                        {
                            path: '/contact',
                            element: <Contact />
                        },
                        // Other guest accessible routes
                    ]
                };
        }
    };

    // const roleBasedRoutes = user ? getRoleBasedRoutes(user.role_id) : getRoleBasedRoutes(null);return  createBrowserRouter([
    //     roleBasedRoutes,
    //         {
    //             element: <LoginLayouts />,
    //             children: [
    //                 { path: '/login', element: <Login /> }
    //             ]
    //         },
    //         { path: "*", element: <NotFoundPage  /> } 
    //     // {
    //     //   path: '/',
    //     //   element: roleBasedElement,
    //     //   children: [
    //     //     // Define paths common to all roles here or within each layout component
    //     //     { path: '/user', element: <AuthAdmin /> },
    //     //     // other paths...
    //     //   ]
    //     // },

    //     // {
    //     //   element: <GuestLayout />,
    //     //   children: [
    //     //     {
    //     //       path: '/',
    //     //       element: <Home />
    //     //     },
    //     //     {
    //     //       path: '/about',
    //     //       element: <About />
    //     //     },
    //     //     {
    //     //       path: '/tutorials',
    //     //       element: <CourseHome />
    //     //     },
    //     //     {
    //     //       path: '/team',
    //     //       element: <Team />
    //     //     },
    //     //     {
    //     //       path: '/pricing',
    //     //       element: <Pricing />
    //     //     },
    //     //     {
    //     //       path: '/blog',
    //     //       element: <Blog />
    //     //     },
    //     //     {
    //     //       path: '/contact',
    //     //       element: <Contact />
    //     //     },
    //     //   ]
    //     // },
    //     // {
    //     //   element: <LoginLayouts />,
    //     //   children: [
    //     //     {
    //     //       path: '/login',
    //     //       element: <Login />
    //     //     },
    //     //   ]
    //     // },
    //     // {
    //     //   element: <UserLayout />,
    //     //   children: [
    //     //     {
    //     //       path: '/user',
    //     //       element: <AuthAdmin />
    //     //     },
    //     //     {
    //     //       path: '/',
    //     //       element: <Home />
    //     //     },
    //     //   ]
    //     // },

    //   ]);
    // },[user]);
    const routes = useMemo(() => [
        user ? getRoleBasedRoutes(user.role_id) : {
            path: '/',
            element: <GuestLayout />,
            children: [
                { path: '/', element: <Home /> },
                {
                    path: '/about',
                    element: <About />
                },
                {
                    path: '/tutorials',
                    element: <CourseHome />
                },
                {
                    path: '/team',
                    element: <Team />
                },
                {
                    path: '/pricing',
                    element: <Pricing />
                },
                {
                    path: '/blog',
                    element: <Blog />
                },
                {
                    path: '/contact',
                    element: <Contact />
                },
            ]
        },
        {
            path: '/login',
            element: <LoginLayouts />,
            children: [
                { path: '', element: <Login /> }
            ]
        },
        {
            path: '/register',
            element: <LoginLayouts />,
            children: [
                { path: '', element: <Register /> }
            ]
        },
        { path: '*', element: <NotFoundPage /> }
    ], [user]);
    useEffect(() => {
        // Recreate the router every time routes change
        setRouter(createBrowserRouter(routes));
    }, [routes]);
    // const router = useMemo(() => createBrowserRouter(routes), [routes]);

    // return <RouterProvider router={router} />;
    return router ? <RouterProvider router={router} /> : null;
}




export default DynamicRouter;