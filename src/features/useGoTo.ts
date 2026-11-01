import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, TabParamList } from '../navigation/types';

export function useGoTo() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return {
    tab: (screen: keyof TabParamList) =>
      navigation.navigate('Tabs', { screen }),
    navigation,
  };
}
