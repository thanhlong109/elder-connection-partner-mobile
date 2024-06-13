export interface ConnectorVerifyInfo {
  connectorInforId: number;
  socialNumber: string;
  sendDate: string;
  cccdFrontImg: string;
  cccdBehindImg: string;
  syllFrontImg: string;
  syllBehindImg: string;
  gxnhkImg: string;
  accountId: string;
}

export type ConnectorVerifyInfoRequest = Pick<
  ConnectorVerifyInfo,
  | 'cccdBehindImg'
  | 'cccdFrontImg'
  | 'connectorInforId'
  | 'gxnhkImg'
  | 'sendDate'
  | 'socialNumber'
  | 'syllBehindImg'
  | 'syllFrontImg'
  | 'accountId'
>;

export type ConnectorVerifyInfoResponse = Pick<
  ConnectorVerifyInfo,
  | 'cccdBehindImg'
  | 'cccdFrontImg'
  | 'connectorInforId'
  | 'gxnhkImg'
  | 'sendDate'
  | 'socialNumber'
  | 'syllBehindImg'
  | 'syllFrontImg'
>;
