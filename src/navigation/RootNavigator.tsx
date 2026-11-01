import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { ArticleScreen } from '../screens/ArticleScreen';
import { BlogScreen } from '../screens/BlogScreen';
import { ConcertDetailScreen } from '../screens/ConcertDetailScreen';
import { ConcertsScreen } from '../screens/ConcertsScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { DestinationDetailScreen } from '../screens/DestinationDetailScreen';
import { DestinationsScreen } from '../screens/DestinationsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { HotelDetailScreen } from '../screens/HotelDetailScreen';
import { HotelsScreen } from '../screens/HotelsScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { PackageDetailScreen } from '../screens/PackageDetailScreen';
import { PackagesScreen } from '../screens/PackagesScreen';
import { QatarEventsScreen } from '../screens/QatarEventsScreen';
import { RequestScreen } from '../screens/RequestScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TourDetailScreen } from '../screens/TourDetailScreen';
import { ToursScreen } from '../screens/ToursScreen';
import { VipScreen } from '../screens/VipScreen';
import {
  BlogIcon,
  HotelsIcon,
  MoreIcon,
  PackagesIcon,
  ToursIcon,
} from '../ui/icons';
import {
  AppHeader,
  HeaderSettingsButton,
  HeaderShareActions,
} from './AppHeader';
import { TabBar } from './TabBar';
import { TabBarVisibilityProvider } from './TabBarVisibility';
import type { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  const { dict, strings } = useSettings();

  return (
    <TabBarVisibilityProvider>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        screenOptions={{
          header: ({ navigation, options, route }) => (
            <AppHeader
              title={options.title ?? route.name}
              onLogoPress={() => navigation.navigate('Home')}
              onSettingsPress={() => navigation.navigate('Settings')}
              settingsLabel={strings.settings}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: 'HArabia',
            tabBarItemStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name="Hotels"
          component={HotelsScreen}
          options={{
            title: dict.nav.hotels,
            tabBarIcon: ({ color, size }) => (
              <HotelsIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tours"
          component={ToursScreen}
          options={{
            title: dict.nav.tours,
            tabBarIcon: ({ color, size }) => (
              <ToursIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Packages"
          component={PackagesScreen}
          options={{
            title: dict.nav.packages,
            tabBarIcon: ({ color, size }) => (
              <PackagesIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Blog"
          component={BlogScreen}
          options={{
            title: dict.nav.blog,
            tabBarIcon: ({ color, size }) => (
              <BlogIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            title: strings.more,
            tabBarIcon: ({ color, size }) => (
              <MoreIcon color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </TabBarVisibilityProvider>
  );
}

export function RootNavigator() {
  const { colors, dict, strings } = useSettings();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerShadowVisible: true,
        headerTintColor: colors.primaryText,
        headerTitleStyle: { fontWeight: '700' },
        headerBackButtonDisplayMode: 'minimal',
        headerRight: HeaderSettingsButton,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotelDetail"
        component={HotelDetailScreen}
        options={{ title: dict.nav.hotels }}
      />
      <Stack.Screen
        name="Request"
        component={RequestScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{ title: 'HArabia', headerBackVisible: false }}
      />
      <Stack.Screen
        name="TourDetail"
        component={TourDetailScreen}
        options={({ route }) => ({
          title: dict.nav.tours,
          headerRight: () => (
            <HeaderShareActions path={`/tours/${route.params.slug}`} />
          ),
        })}
      />
      <Stack.Screen
        name="PackageDetail"
        component={PackageDetailScreen}
        options={({ route }) => ({
          title: dict.nav.packages,
          headerRight: () => (
            <HeaderShareActions path={`/packages/${route.params.slug}`} />
          ),
        })}
      />
      <Stack.Screen
        name="Concerts"
        component={ConcertsScreen}
        options={{ title: dict.concerts.title }}
      />
      <Stack.Screen
        name="ConcertDetail"
        component={ConcertDetailScreen}
        options={({ route }) => ({
          title: dict.concerts.title,
          headerRight: () => (
            <HeaderShareActions path={`/concerts/${route.params.slug}`} />
          ),
        })}
      />
      <Stack.Screen
        name="Destinations"
        component={DestinationsScreen}
        options={{ title: dict.destinations.title }}
      />
      <Stack.Screen
        name="DestinationDetail"
        component={DestinationDetailScreen}
        options={({ route }) => ({ title: dict.countries[route.params.country] })}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={({ route }) => ({
          title: dict.nav.blog,
          headerRight: () => (
            <HeaderShareActions path={`/blog/${route.params.slug}`} />
          ),
        })}
      />
      <Stack.Screen
        name="QatarEvents"
        component={QatarEventsScreen}
        options={{
          title: dict.qatarEvents.title,
          headerRight: () => <HeaderShareActions path="/qatar-events" />,
        }}
      />
      <Stack.Screen
        name="Vip"
        component={VipScreen}
        options={{
          title: dict.nav.vip,
          headerRight: () => <HeaderShareActions path="/vip" />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: strings.settings, headerRight: undefined }}
      />
    </Stack.Navigator>
  );
}
