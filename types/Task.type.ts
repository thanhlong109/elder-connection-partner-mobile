import { TaskStatus } from '~/enums';

export interface Task {
  userName: string;
  avatarUrl: string;
  startTime: string;
  endTime: string;
  status: TaskStatus;
}
