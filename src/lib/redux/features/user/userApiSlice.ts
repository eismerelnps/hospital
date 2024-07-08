import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL || ''
const API_VERSION: string = process.env.NEXT_PUBLIC_API_VERSION || ''

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // const session = await getSession();
  const accessToken = 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc';

  let result = await fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8000/`,
    prepareHeaders: (headers) => {
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // Handle re-authentication logic if needed here

  return result;
};

export const authApiSlice = createApi({
  reducerPath: "api",
  tagTypes: [""],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // getTechnologies: builder.query<TechnologyType[], void>({
    //   query: () => `tech`
    // }),
    deleteUser: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'DELETE',
        // body:
      }),
      // invalidatesTags: ['']
    }),
    deleteAppointment: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'DELETE',
        // body:
      }),
      // invalidatesTags: ['']
    }),
  }),
});

export const { useDeleteUserMutation, useDeleteAppointmentMutation } = authApiSlice