import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBar, Text, TextField, View } from 'react-native-ui-lib';
import { Gender } from '~/enums';
import { PersonInfo } from '~/types/auth.type';

const PersonInfor = () => {
  const [personInfo, setpersonInfo] = useState<PersonInfo>({
    accountEmail: 'thanhlong109@gmail.com',
    accountPassword: 'Baolong321@',
    accountPhone: '0389142366',
    birthDate: new Date().toLocaleDateString(),
    firstName: 'Nguyễn',
    lastName: 'Thành long',
    sex: Gender.MALE,
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-6">
          <TextField
            label="Họ"
            placeholder="Họ"
            floatingPlaceholder
            onChangeText={(text) => setpersonInfo({ ...personInfo, firstName: text })}
            validate={['required', (value: string) => value.length > 1]}
            validationMessage={['Vui lòng không để trống họ', 'Họ của bạn quá ngắn!']}
            maxLength={20}
            enableErrors
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonInfor;
