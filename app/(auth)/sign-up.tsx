import { ScrollView, Image } from 'react-native';
import React, { useRef } from 'react';
import { images } from '~/constants/images';
import CustomCarousel, { CustomCarouselRef } from '~/components/CustomCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUpSelectAria from './SignUpSelectAria';
import SignUpInfo from './SignUpInfo';

const SignUp = () => {
  const carouselRef = useRef<CustomCarouselRef>(null);

  const goToPage = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex(index);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Image
          source={images.bgShape.bgShape1}
          className="absolute h-[300px] w-2/3"
          resizeMode="stretch"
        />
        <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }} className="w-full">
          <CustomCarousel
            ref={carouselRef}
            slider={[<SignUpSelectAria goToPage={goToPage} />, <SignUpInfo />]}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
