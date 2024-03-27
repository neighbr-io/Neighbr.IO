import { api, invalidatesId, providesId, providesList } from "../../app/api";

const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "projects",
      providesTags: providesList("Projects"),
    }),
    getProject: builder.query({
      query: (id) => `projects/${id}`,
      providesTags: providesId("Projects"),
    }),
    addProject: builder.mutation({
      query: (project) => {
        // Retrieve the token directly from localStorage at the time of the API call
        const token = localStorage.getItem("bearerToken");

        return {
          url: "projects",
          method: "POST",
          body: project,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: (project) => {

      const token = localStorage.getItem("bearerToken");
      
      return {
        url: `projects/${project.id}`,
        method: "PUT",
        body: project,
        headers: {
            Authorization: `Bearer ${token}`,
          },
      };
    },
      invalidatesTags: invalidatesId("Projects"),
    }),
    deleteProject: builder.mutation({
    // NEED TO ADD AUTH
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: invalidatesId("Projects"),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
