import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    sign: build.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: "/api/users/auth",
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: "/api/users/updateprofile",
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: build.query({
      query: () => ({
        url: "/api/users",
      }),
      providesTags: ["users"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["users"],
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/api/users/${id}`,
      }),
      providesTags: ["users"],
    }),
    editUser: build.mutation({
      query: (data) => ({
        url: `/api/users/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useSignMutation, useLoginMutation, useLogoutMutation, useUpdateUserProfileMutation, useGetUsersQuery, useDeleteUserMutation ,useGetUserByIdQuery,useEditUserMutation} = userApi;
