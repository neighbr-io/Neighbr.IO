import { api } from "../../app/api";

const locationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLocation: builder.mutation({
      query: (location) => {
        // Retrieve the token directly from localStorage at the time of the API call
        const token = localStorage.getItem("bearerToken");

        return {
          url: "location",
          method: "POST",
          body: location,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Locations"],
    }),
  }),
});

export const {
  useAddLocationMutation
} = locationApi;
