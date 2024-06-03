import React from 'react';
import { Modal, View } from 'react-native-ui-lib';

export interface NofityModelProp {
  data: NofityModelData;
  setData: React.Dispatch<React.SetStateAction<NofityModelData | undefined>>;
}

export interface NofityModelData {
  message?: string;
  title?: string;
}

const NofityModel = ({ data }: NofityModelProp) => {
  return (
    <Modal animationType="slide" visible={data.message != undefined} transparent>
      <View className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <View className="m-auto mx-6 !rounded-xl bg-white p-6"></View>
      </View>
    </Modal>
  );
};

export default NofityModel;
