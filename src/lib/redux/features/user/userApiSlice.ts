import { UserType } from "@/lib/types/User/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "next/headers";

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
  tagTypes: ["UserType"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // getTechnologies: builder.query<TechnologyType[], void>({
    //   query: () => `tech`
    // }),
    deleteUser: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc'
        },
        // body:
      }),
      // invalidatesTags: ['']
    }),
    deleteAppointment: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}/`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc'
        },
        // body:
      }),
      // invalidatesTags: ['']
    }),

    editUSer: builder.mutation<UserType, { user: any }>({
      query: ({ user }) => ({
        url: `users/${user.id}/`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token 8bf77cfcf7501982129d38584c5c6e6e53d999fc'
        },
        body: user
      }),
      invalidatesTags: ['UserType']
    }),

  }),
});

export const { useDeleteUserMutation, useDeleteAppointmentMutation, useEditUSerMutation } = authApiSlice