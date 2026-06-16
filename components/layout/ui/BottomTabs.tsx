import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../../pages/Home';
import Gerencia from '../../pages/Gerencia';
import Cart from '../../pages/Cart';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Catalogo') {
            iconName = 'home-outline';
          } else if (route.name === 'gerencia') {
            iconName = 'settings-outline';
          } else if (route.name === 'Carrinho') {
            iconName = 'cart-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Catalogo"
        component={Home}
      />

      <Tab.Screen
        name="gerencia"
        component={Gerencia}
      />

      <Tab.Screen 
      name='Carrinho'
      component={Cart}
      />
    </Tab.Navigator>
  );
}