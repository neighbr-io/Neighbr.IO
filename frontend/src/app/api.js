import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOKEN = "token";
const apiUrl = import.meta.env.VITE_API_URL || '/api'
console.log(import.meta.env);
console.log(apiUrl);


/**
 * Empty central API service.
 * All endpoints are defined and injected in their own slices.
 * If available, an auth token is added to the headers for all requests.
 */
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers;
    }
  }),
  endpoints: () => ({}),
});

// Helper functions for providing tags

export function providesList(tagType) {
  return (resultsWithIds) =>
    resultsWithIds
      ? [
          { type: tagType, id: "LIST" },
          ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        ]
      : [{ type: tagType, id: "LIST" }];
}

export function providesId(tagType) {
  return (result, error, id) => [{ type: tagType, id }];
}

export function invalidatesId(tagType) {
  return (result, error, arg) => [{ type: tagType, id: arg.id }];
}