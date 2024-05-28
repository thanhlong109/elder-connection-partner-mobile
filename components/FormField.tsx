import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export interface FormFieldProps {
  title?: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  secureTextEntry?: boolean;
  textHelper?: string;
  borderStyle?: string;
}

const FormField = ({
  value,
  handleChangeText,
  placeholder = '',
  otherStyles = '',
  secureTextEntry = false,
  title = '',
  textHelper = '',
  borderStyle = '',
}: FormFieldProps) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <View>
        <Text className="font-pmedium ">{title}</Text>
        <Text className=" font-pregular text-sm italic ">{textHelper}</Text>
      </View>
      <View
        className={`mt-1 h-14 w-full flex-row items-center rounded-full border-[1px] border-black bg-white px-6 focus:border-secondary ${borderStyle}`}>
        <TextInput
          className="flex-1 font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? 'eye' : 'eye-with-line'}
              size={24}
              color="#7D8FAB"
              className="h-6 w-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
