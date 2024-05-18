// DynamicRouter.jsx

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GuestLayout from "../Layouts/GuestLayouts/GuestLayout";
import UserLayout from "../Layouts/UsersLayouts/UserLayout";
// import AboutUs from "../Pages/AboutUs";

import LoginLayouts from "../Layouts/GuestLayouts/LoginLayouts";
import Login from "../Pages/Login/Login";
import AuthHome from './../Pages/AuthPages/AuthHome/AuthHome';
import Contact from './../Pages/GuestPages/contact/Contact';
import Blog from './../Pages/GuestPages/blog/Blog';
import Pricing from './../Pages/GuestPages/pricing/Pricing';
import Team from './../Pages/GuestPages/team/Team';
import CourseHome from './../Pages/GuestPages/allcourses/CourseHome';
import About from './../Pages/GuestPages/about/About';
import Home from './../Pages/GuestPages/home/Home';
import AuthAdmin from "@/Pages/AuthPages/AuthHome/AuthAdmin";
import { Usercontext } from "@/Context/AuthProvider";
import AdminLayout from "@/Layouts/UsersLayouts/AdminLayout";
import ModeratorLayout from "@/Layouts/UsersLayouts/ModeratorLayout";
import CreatorLayout from "@/Layouts/UsersLayouts/CreatorLayout";
import StandarLayout from "@/Layouts/UsersLayouts/StandarLayout";
import NotFoundPage from "@/Pages/GuestPages/NotFound/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";

 const DynamicRouter = () => {
//   const { user,setUser } = Usercontext();
  // const storedUser = JSON.parse(localStorage.getItem('user')) || null;
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
const dispatch = useDispatch();
const user = useSelector(state => state.auth.user);

useEffect(() => {
    const checkUser = async () => {
      const fetchedUser = JSON.parse(localStorage.getItem('user'));
      if (!user && fetchedUser) {
        dispatch(setUser(fetchedUser));
      }
    };

    checkUser();
  }, [dispatch, user]);

console.log('this is the user from router '+user);



  const getRoleBasedRoutes = (role_id) => {
    switch (role_id) {
        case 1: // Admin
            return {
                element: <AdminLayout />,
                children: [
                    { path: '/admin', element: <AuthAdmin /> }
                    // Other admin-specific routes
                ]
            };
        case 2: // Moderator
            return {
                element: <ModeratorLayout />,
                children: [
                    { path: '/moderator', element: <AuthAdmin /> }
                    // Other moderator-specific routes
                ]
            };
        case 3: // Creator
            return {
                element: <CreatorLayout />,
                children: [
                    { path: '/creator', element: <AuthAdmin /> }
                    // Other creator-specific routes
                ]
            };
        case 4: // Standard User
            return {
                element: <StandarLayout />,
                children: [
                    { path: '/standard', element: <AuthAdmin /> }
                    // Other standard user-specific routes
                ]
            };
        default: // Guest
            return {
                element: <GuestLayout />,
                children: [
                    { path: '/', element: <Home /> },
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
    user ? getRoleBasedRoutes(user.role_id) : { path: '/', element: <GuestLayout />, children: [{ path: '/', element: <Home /> }] },
    { path: '/login', element: <LoginLayouts />, children: [{ path: '', element: <Login /> }] },
    { path: '*', element: <NotFoundPage /> }
  ], [user]);

  const router = useMemo(() => createBrowserRouter(routes), [routes]);

  return <RouterProvider router={router} />;
}




export default DynamicRouter;