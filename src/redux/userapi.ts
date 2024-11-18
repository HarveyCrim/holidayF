import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {LoginType, UserType} from '../utils/zod-types'

type SignupUser = Omit<UserType, "confirmPassword"> 
export const userapi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL
    }),
    reducerPath: "userapi",
    tagTypes:["user"],
    endpoints: builder => ({
        registerUser: builder.mutation<{message:string}, SignupUser>({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                body:data,
                credentials:"include"
            })
        }),
        loginUser: builder.mutation<{userId:string}, LoginType>({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["user"]
        }),
        loggedInUser: builder.query<{userId: number | undefined}, void>({
            query:() => ({
                url: "/user/validate",
                method: "GET",
                credentials: "include"
            }),
            providesTags: ["user"]
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: "/user/logout",
                method: "PUT",
                credentials: "include"
            }),
            invalidatesTags: ["user"]
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation, useLoggedInUserQuery, useLogoutUserMutation} = userapi