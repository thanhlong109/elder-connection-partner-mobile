import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseApi';
import { ConnectorVerifyInfoRequest, ConnectorVerifyInfoResponse } from '~/types/connector.type';

export const connectorApi = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    verifyConnector: builder.mutation<
      ApiResponse<ConnectorVerifyInfoResponse>,
      ConnectorVerifyInfoRequest
    >({
      query: (body) => ({
        url: `api/elder-connector-infos/become-connector?accountId=${body.accountId}`,
        method: 'POST',
        body,
      }),
    }),
  }),
  reducerPath: 'connectorApi',
});
export const { useVerifyConnectorMutation } = connectorApi;
