import {apiSlice} from "../api/apiSilce";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query:(avatar)=> ({
                url:"update-user-avatar",
                method: "PUT",
                body:{avatar},
                credentials: "include" as const,
            }),
        }),
        editProfile: builder.mutation({
            query:({name})=> ({
                url:"update-user-info",
                method: "PUT",
                body:{name,},
                credentials: "include" as const,
            }),
        }),
        updatePassword: builder.mutation({
            query:({oldPassword, newPassword})=> ({
                url:"update-user-password",
                method: "PUT",
                body:{
                    oldPassword,
                    newPassword,
                },
                credentials: "include" as const,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({  // Truyền trực tiếp data thay vì { data }
              url: "get-users",
              method: "GET",
              credentials: "include" as const,
            }),
          }),
          updateUsersRole: builder.mutation({
            query: ({ email, roles }) => ({
              url: "update-user-role",
              method: "PUT",
              body: {
                email,
                roles,
              },
              credentials: "include" as const, // Đảm bảo gửi cookie cùng request
            }),
          }),
          deleteUsers: builder.mutation({
            query: (id) => ({
              url: `delete-user/${id}`,
              method: "PUT",
              credentials: "include" as const, // Đảm bảo gửi cookie cùng request
            }),
          }),
          
          
    })
});

export const {useUpdateAvatarMutation, useEditProfileMutation, 
    useUpdatePasswordMutation,useGetAllUsersQuery,useUpdateUsersRoleMutation,useDeleteUsersMutation } = userApi;