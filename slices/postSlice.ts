import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HomeType, PostStatus } from '~/enums';
import { AddAdressRespone } from '~/types/address.type';
import { GetPostRespone } from '~/types/post.type';

export interface ServiceBookingSliceState {
  viewPostDetails: GetPostRespone;
}

const initAddress: AddAdressRespone = {
  addressDescription: '',
  addressDetail: '',
  addressId: 0,
  addressName: '',
  contactName: '',
  contactPhone: '',
  homeType: HomeType.TOWN_HOUSE,
  accountId: '',
};

const initViewPost: GetPostRespone = {
  address: initAddress,
  createAt: '',
  customerFirstName: '',
  customerId: '',
  customerLastName: '',
  isPriorityFavoriteConnector: false,
  jobSchedule: {
    description: '',
    endDate: '',
    jobScheduleId: 0,
    listDayWork: '',
    locationWork: '',
    onTask: false,
    startDate: '',
    taskProcess: 0,
  },
  postDescription: '',
  postId: 0,
  postStatus: PostStatus.Posted,
  price: 0,
  salaryAfterWork: 0,
  serviceId: 0,
  serviceName: '',
  startTime: '',
  title: '',
  updateAt: '',
};

const initialState: ServiceBookingSliceState = {
  viewPostDetails: initViewPost,
};

export const ServiceBookingSliceState = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    setViewPostDetail: (state, action: PayloadAction<GetPostRespone>) => {
      state.viewPostDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setViewPostDetail } = ServiceBookingSliceState.actions;

export default ServiceBookingSliceState.reducer;
