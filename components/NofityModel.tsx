import React from 'react';
import { Button, Modal, Text, View } from 'react-native-ui-lib';

export interface NofityModelProps {
  data: NofityModelData;
  setData: React.Dispatch<React.SetStateAction<NofityModelData>>;
}

export interface NofityModelData {
  message?: string;
  title?: string;
}

const NofityModel = ({ data, setData }: NofityModelProps) => {
  const { message, title } = data;

  return (
    <Modal animationType="slide" visible={message != undefined} transparent>
      <View className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <View className="m-auto mx-6 !rounded-xl bg-white p-6">
          <Text className="font-psemibold text-lg" $outlineWarning center>
            {title}
          </Text>
          <Text center className="mt-4 font-pregular text-base">
            {message}
          </Text>
          <Button
            center
            onPress={() => setData({ ...data, message: undefined })}
            className="mt-6 !bg-yellow-400">
            <Text className="font-psemibold text-base !text-[#333]">Đồng ý</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default NofityModel;
