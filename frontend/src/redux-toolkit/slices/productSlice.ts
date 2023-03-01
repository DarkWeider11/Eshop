import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductsResponse {
  name: string;
  id: number;
  images: [];
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
  name?: string;
  manufacturer?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
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
          url: `/get-produs?name=${query}`,
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
    // filterProducts: builder.query<ProductsResponse[], FilterProducts>({
    //   query: ({ query = "", manufacturer = "", price = "" }) => {
    //     console.log(query);

    //     return `/produs-filter?name=${query}&manufacturer=${manufacturer}&price=${price}`;
    //   },
    //   providesTags: ["Products"],
    // }),
    filterProducts: builder.query<ProductsResponse[], FilterProducts>({
      query: ({ name = "", manufacturer = "", price_min = 0, price_max = 0 }) => {
        const queryString = `name=${name}&manufacturer=${manufacturer}&price_min=${price_min}&price_max=${price_max}`;
        return `/produs-filter?${queryString}`;
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
  name: "",
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
