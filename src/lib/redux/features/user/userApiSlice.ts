import { AppointmentType, UserType } from "@/lib/types/User/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const accessToken = '8bf77cfcf7501982129d38584c5c6e6e53d999fc';

  let result = await fetchBaseQuery({
    baseUrl: `http://127.0.0.1:8000/`,
    prepareHeaders: (headers) => {
      if (accessToken) {
        headers.set('Authorization', `Token ${accessToken}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
  return result;
};

export const userApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["UserType", "AppointmentType"],
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

    editUSer: builder.mutation<UserType, { user: any }>({
      query: ({ user }) => ({
        url: `users/${user.id}/`,
        method: 'PATCH',
        body: user
      }),
      invalidatesTags: ['UserType']
    }),

    addUser: builder.mutation<UserType, { user: any }>({
      query: ({ user }) => ({
        url: `insert/user/`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['UserType']
    }),

    editAppointment: builder.mutation<AppointmentType, { appointment: any }>({
      query: ({ appointment }) => ({
        url: `appointments/${appointment.id}/`,
        method: 'PATCH',
        body: appointment
      }),
      invalidatesTags: ['AppointmentType']
    }),

  }),
});

export const { useDeleteUserMutation, useDeleteAppointmentMutation, useEditUSerMutation, useEditAppointmentMutation, useAddUserMutation } = userApiSlice