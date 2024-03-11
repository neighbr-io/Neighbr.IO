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
        query: (project) => ({
            url: "projects",
            method: "POST",
            body: project,
        }),
        invalidatesTags: ["Projects"],
        }),
        updateProject: builder.mutation({
        query: (project) => ({
            url: `projects/${project.id}`,
            method: "PUT",
            body: project,
        }),
        invalidatesTags: invalidatesId("Projects"),
        }),
        deleteProject: builder.mutation({
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