import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductsResponse {
  id: number;
  images: [];
  nume: string;
  manufacturer: string;
  price: number;
  product_description: any;
  currency: number;
  created_date: string;
  updated_date: any;
  checkout: boolean;
  SubCategoriesType: number;
}
interface ImagesResponse {
  id: number;
  image: string;
  produs: number;
}

interface FilterProducts {
  query?: string;
  nume?: string;
  manufacturer?: string;
  price?: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/products`,
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse[], { query?: string }>({
      query: ({ query = "" }) => {
        return {
          url: `/get-produs?nume=${query}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    imagesProducts: builder.query<ImagesResponse[], void>({
      query: () => {
        return {
          url: "/get-produs",
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    filterProducts: builder.query<ProductsResponse[], FilterProducts>({
      query: ({ query = "", manufacturer = "" }) => {
        console.log(query);

        return `/produs-filter?nume=${query}&manufacturer=${manufacturer}`;
      },
      providesTags: ["Products"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useImagesProductsQuery,
  useFilterProductsQuery,
  useLazyFilterProductsQuery,
} = productsApi;

const initialState: ProductsResponse = {
  id: 0,
  images: [],
  nume: "",
  manufacturer: "",
  price: 0,
  product_description: "",
  currency: 0,
  created_date: "",
  updated_date: "",
  checkout: false,
  SubCategoriesType: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

const initialImageState: ImagesResponse = {
  id: 0,
  image: "",
  produs: 0,
};

export const imagesSlice = createSlice({
  name: "images",
  initialState: initialImageState,
  reducers: {},
});

export const imagesReducer = imagesSlice.reducer;
export const productsReducer = productSlice.reducer;
