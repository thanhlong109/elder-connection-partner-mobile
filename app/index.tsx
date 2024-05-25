import { Stack, Link, router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Container>
        <TouchableOpacity onPress={() => router.push('home')}>
          <Text>Go home</Text>
        </TouchableOpacity>
      </Container>
    </>
  );
}
