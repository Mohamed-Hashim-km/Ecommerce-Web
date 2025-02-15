import { apiSlice } from "./apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "/api/order",
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: build.query({
      query: (id) => ({
        url: `/api/order/${id}`,
      }),
    }),
    getMyorder: build.query({
      query: () => ({
        url: `/api/order/mine`,
      }),
    }),
    getorder: build.query({
      query: () => ({
        url: `/api/order`,
      }),
    }),
    orderDeliver: build.mutation({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "PUT",
        body: id,
      }),
    }),
    orderToPaid: build.mutation({
      query: (id) => ({
        url: `/api/order/${id}/pay`,
        method: "PUT",
        body: id,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, useGetMyorderQuery, useGetorderQuery, useOrderDeliverMutation, useOrderToPaidMutation } = orderApi;
