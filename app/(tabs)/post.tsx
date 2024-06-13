import { FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { GetPostRespone } from '~/types/post.type';
import { useGetPostsQuery } from '~/services/postApi';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ActionItem from '~/components/ActionItem';
import { images } from '~/constants/images';
import LoadingModel from '~/components/LoadingModel';
import ErrorModel from '~/components/ErrorModel';

const post = () => {
  const [selectedNav, setSelectedNav] = useState(1);
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const [posts, setposts] = useState<GetPostRespone[]>([]);
  //----------------------------- start call api get post ---------------------------//

  const { data, error, isError, isLoading, isSuccess, refetch } = useGetPostsQuery({
    data: accountId,
    pageIndex: 0,
    pageSize: 30,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setposts(data.result.items);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      alert(error);
      console.log('error call get post list', error);
    }
  }, [isError]);

  //----------------------------- end call api get post ---------------------------//
  return (
    <SafeAreaView>
      <LoadingModel isloading={isLoading} />
      <ErrorModel isError={isError} onReload={() => refetch()} />
      <LinearGradient colors={['#4045A3', '#FFF', '#FFF']} className="h-full">
        <View className="p-6">
          <Text className="font-psemibold text-2xl !text-white">Công việc khả dụng</Text>
        </View>
        <FlatList
          data={posts}
          style={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 150)
                .duration(1000)
                .springify()}>
              <ActionItem item={item} />
            </Animated.View>
          )}
          ListEmptyComponent={() => (
            <View flex center>
              <Image
                source={images.icons.empty2}
                className="mt-[100px] h-[100px] w-[100px]"
                resizeMode="contain"
                tintColor={'gray'}
              />
              <Text className="font-plight text-xl !text-black-100">
                Bạn chưa đăng kí dịch vụ nào!
              </Text>
            </View>
          )}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default post;
