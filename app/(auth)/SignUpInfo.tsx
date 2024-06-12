import React, { useEffect, useRef, useState } from 'react';
import { SignUpRequest } from '~/types/auth.type';
import { Gender } from '~/enums';
import {
  Button,
  RadioButton,
  RadioGroup,
  Text,
  TextField,
  TextFieldRef,
  View,
} from 'react-native-ui-lib';
import { router } from 'expo-router';
import colors from '~/constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { useSignUpMutation } from '~/services/accountApi';

const fullNameRegex = /^(?=.* .{2,}).{6,}$/;
const passwordRegex = /^\S{6,12}$/;

const SignUpInfo = () => {
  const [signUp, { isLoading, isSuccess, isError, error }] = useSignUpMutation();
  const [showDialog, setshowDialog] = useState(false);

  const [form, setform] = useState<SignUpRequest>({
    accountEmail: '',
    accountPassword: '',
    accountPhone: '',
    confirmAccountPassword: '',
    firstName: '',
    lastName: '',
    cccdNumber: '',
  });

  const fullNameRef = useRef<TextFieldRef>(null);
  const emailRef = useRef<TextFieldRef>(null);
  const cccdRef = useRef<TextFieldRef>(null);
  const passwordRef = useRef<TextFieldRef>(null);
  const confirmPasswordRef = useRef<TextFieldRef>(null);
  const phoneRef = useRef<TextFieldRef>(null);

  const validateFields = () => {
    const fullNameValid = fullNameRef.current?.validate();
    const emailValid = emailRef.current?.validate();
    const cccdValid = cccdRef.current?.validate();
    const passwordValid = passwordRef.current?.validate();
    const confirmPasswordValid = confirmPasswordRef.current?.validate();
    const phoneValid = phoneRef.current?.validate();
    return (
      fullNameValid &&
      emailValid &&
      cccdValid &&
      passwordValid &&
      confirmPasswordValid &&
      phoneValid
    );
  };

  useEffect(() => {
    if (isSuccess) setshowDialog(true);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(error);
      emailRef.current?.validate();
    }
  }, [isError]);

  const handleSubmit = () => {
    if (validateFields()) router.push('sign-in');
  };
  return (
    <View className="h-fit px-6">
      <View className="mx-4 my-6 gap-6 rounded-3xl bg-white p-8 shadow-sm">
        {/* ho ten */}
        <TextField
          placeholder={'Nhập họ tên của bạn'}
          containerStyle={{
            backgroundColor: colors.gray.F2,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          validateOnChange
          ref={fullNameRef}
          label="Họ và tên"
          onChangeText={(value) => {
            let nameParts = value.trim().split(' ');
            let firstName = nameParts[0];
            let lastName = nameParts.slice(1).join(' ');
            setform({ ...form, firstName, lastName });
          }}
          value={`${form.firstName} ${form.lastName}`}
          enableErrors
          validate={['required', (value: string) => fullNameRegex.test(value)]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'Họ tên cần ít nhất 6 ký tự và có khoảng trắng giữa họ tên!',
          ]}
          showCharCounter
          maxLength={50}
        />
        {/* sex */}
        {/* <View className=" justify-between bg-gray-F2 px-4 py-4">
          <Text className="font-pmedium">Giới tính</Text>
          <RadioGroup
            initialValue={form.sex}
            className="mt-3"
            onValueChange={(value: Gender) => setform({ ...form, sex: value })}>
            <View row className="gap-6">
              <RadioButton color="#333" value={Gender.MALE} label={'Nam'} />
              <RadioButton color="#333" value={Gender.FEMALE} label={'Nữ'} />
              <RadioButton color="#333" value={Gender.ORTHER} label={'Khác'} />
            </View>
          </RadioGroup>
        </View> */}
        {/* cccd */}
        <TextField
          placeholder={'123456789101'}
          ref={cccdRef}
          validateOnChange
          containerStyle={{
            backgroundColor: colors.gray.F2,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          label="Số CCCD"
          onChangeText={(value: string) => setform({ ...form, cccdNumber: value })}
          enableErrors
          value={form.cccdNumber}
          validate={['required', 'number', (value: string) => value.length === 12]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'Số cccd không hợp lệ!',
            'Số cccd không hợp lệ!',
          ]}
          showCharCounter
          maxLength={12}
        />

        {/* phone number */}
        <TextField
          ref={phoneRef}
          validateOnChange
          placeholder={'0987654321'}
          containerStyle={{
            backgroundColor: colors.gray.F2,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          value={form.accountPhone}
          label="Số điện thoại"
          onChangeText={(value: string) => setform({ ...form, accountPhone: value })}
          enableErrors
          validate={[
            'required',
            'number',
            (value: string) => value.length === 11 || value.length === 10,
          ]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'Số điện thoại không hợp lệ!',
            'Số điện thoại không hợp lệ!',
          ]}
          maxLength={11}
          showCharCounter
        />
        {/* email */}
        <TextField
          validateOnChange
          ref={emailRef}
          placeholder={'example@gmail.com'}
          containerStyle={{
            backgroundColor: colors.gray.F2,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          value={form.accountEmail}
          label="Email"
          onChangeText={(value: string) => setform({ ...form, accountEmail: value })}
          enableErrors
          validate={['required', 'email']}
          validationMessage={['Vui lòng không bỏ trống trường này!', 'Email không hợp lệ!']}
        />
        {/* password */}
        <TextField
          validateOnChange
          ref={passwordRef}
          placeholder={'Ít nhất 6 ký tự'}
          containerStyle={{
            backgroundColor: colors.gray.F2,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          value={form.accountPassword}
          secureTextEntry
          label="Mật khẩu (để đăng nhập lần sau)"
          onChangeText={(value: string) => setform({ ...form, accountPassword: value })}
          enableErrors
          validate={['required', (value: string) => passwordRegex.test(value)]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'Mật khẩu Phải chứa 6-12 ký tự và không có khoảng cách',
          ]}
        />
        {/* password confirm */}
        <TextField
          validateOnChange
          ref={confirmPasswordRef}
          placeholder={'Nhập lại mật khẩu'}
          containerStyle={{
            backgroundColor: colors.gray.F2,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          value={form.confirmAccountPassword}
          secureTextEntry
          label="Xác nhận mật khẩu"
          onChangeText={(value: string) => setform({ ...form, confirmAccountPassword: value })}
          enableErrors
          validate={['required', (value: string) => value === form.accountPassword]}
          validationMessage={['Vui lòng không bỏ trống trường này!', 'Mật khẩu không khớp!']}
        />

        <Button
          label="Gửi Đăng ký"
          onPress={handleSubmit}
          iconOnRight
          backgroundColor={colors.primary}
          labelStyle={{ marginRight: 10, marginVertical: 5, color: '#333' }}
          iconSource={() => <AntDesign name="arrowright" size={24} color="#333" />}
        />
      </View>
    </View>
  );
};

export default SignUpInfo;
