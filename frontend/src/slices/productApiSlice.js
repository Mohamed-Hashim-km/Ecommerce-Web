import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ pageNumber, keyword }) => ({
        url: "/api/products",
        params: { pageNumber, keyword },
      }),
      providesTags: ["Products"],
    }),
    getAllProducts: build.query({
      query: () => ({
        url: "/api/products/getAllProducts",
      }),
      providesTags: ["Products"],
    }),
    getProductById: build.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
      providesTags: ["product"],
    }),
    createProducts: build.mutation({
      query: () => ({
        url: `/api/products`,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProducts: build.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "product"],
    }),
    uploadProductsImage: build.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "product"],
    }),
    reviewProducts: build.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductsMutation,
  useCreateProductsMutation,
  useUploadProductsImageMutation,
  useDeleteProductMutation,
  useReviewProductsMutation,
} = productApiSlice;
