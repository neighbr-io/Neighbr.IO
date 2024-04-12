import { api, invalidatesId, providesId, providesList } from "../../app/api";

const transactionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "transactions",
      providesTags: ["Transactions"],
    }),
    getTransaction: builder.query({
      query: (id) => `transactions/${id}`,
      providesTags: ["Transactions"],
    }),
    addTransaction: builder.mutation({
      query: (transaction) => {
        // Retrieve the token directly from localStorage at the time of the API call
        const token = localStorage.getItem("bearerToken");

        return {
          url: "transactions",
          method: "POST",
          body: transaction,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Transactions"],
    }),
    updateTransaction: builder.mutation({
      query: (transaction) => {

      const token = localStorage.getItem("bearerToken");
      
      return {
        url: `transactions/${transaction.id}`,
        method: "PUT",
        body: transaction,
        headers: {
            Authorization: `Bearer ${token}`,
          },
      };
    },
      invalidatesTags: invalidatesId("Transactions"),
    }),
    deleteTransaction: builder.mutation({
    // NEED TO ADD AUTH
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: invalidatesId("Transactions"),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
