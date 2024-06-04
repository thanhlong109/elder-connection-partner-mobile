import { Gender } from '~/enums';

export const getGenderString = (gender: Gender) => {
  return gender === Gender.FEMALE ? 'Nữ' : gender === Gender.MALE ? 'Nam' : 'Khác';
};
