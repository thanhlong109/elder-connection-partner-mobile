import { StringFormat } from 'firebase/storage';
import { Address } from './address.type';
import { CreateJobScheduleRequest, JobSchedule } from './jobSchedule.type';

export interface Post {
  serviceId: number;
  customerId: string;
  addressId: number;
  isPriorityFavoriteConnector: boolean;
  postDescription: string;
  title: string;
  startTime: string;
  postId: number;
  serviceName: string;
  jobSchedule: JobSchedule;
  customerFirstName: string;
  customerLastName: string;
  address: Address;
  postStatus: number;
  createAt: string;
  updateAt: string;
  price: number;
  salaryAfterWork: number;
}

export interface Post2{
  postId: number
  serviceId: number
  jobScheduleId: number
  customerId: string
  addressId: number
  isPriorityFavoriteConnector: boolean
  postDescription: string
  title: string
  postStatus: number
  startTime: string
  createAt: string
  updateAt: string
  price: number
  salaryAfterWork: number
  address: any
  customer: any
  jobSchedule: any
  service: any
  serviceFeedbacks: any[]
}

export type CreatePostRequest = Pick<
  Post,
  | 'addressId'
  | 'customerId'
  | 'isPriorityFavoriteConnector'
  | 'postDescription'
  | 'serviceId'
  | 'startTime'
  | 'title'
>;

export interface CreatePostAndScheduleRequest {
  postCreateViewModel: CreatePostRequest;
  jobScheduleCreateViewModel: CreateJobScheduleRequest;
}

export type GetPostRespone = Pick<
  Post,
  | 'postId'
  | 'serviceId'
  | 'serviceName'
  | 'jobSchedule'
  | 'customerId'
  | 'customerFirstName'
  | 'customerLastName'
  | 'address'
  | 'isPriorityFavoriteConnector'
  | 'postDescription'
  | 'title'
  | 'postStatus'
  | 'startTime'
  | 'createAt'
  | 'updateAt'
  | 'price'
  | 'salaryAfterWork'
>;

export interface GetConnectorPost{
  jobScheduleId: number
  connectorId: string
  connectorFirstName: string
  connectorLastName: string
  startDate: string
  endDate: string
  description: string
  locationWork: string
  listDayWork: string
  taskProcess: number
  onTask: boolean
  post: Post2
  tasks: Task[]
}

export interface Task {
  taskId: number
  jobScheduleId: number
  workDateAt: string
  taskStatus: number
  createAt: string
  completeDate: string
  taskUpdateAt: string
  taskUpdateDescription: any
}

export type CreatePostAndScheduleResponse = Pick<
  Post,
  | 'postId'
  | 'serviceId'
  | 'serviceName'
  | 'jobSchedule'
  | 'customerId'
  | 'customerFirstName'
  | 'customerLastName'
  | 'address'
  | 'isPriorityFavoriteConnector'
  | 'postDescription'
  | 'title'
  | 'postStatus'
  | 'startTime'
  | 'createAt'
  | 'updateAt'
  | 'price'
  | 'salaryAfterWork'
>;

export interface Position {
  latitude: number;
  longitude: number;
}

export interface ApplyPostRequest {
  postId: number;
  connectorId: string;
}
