import { createStackNavigator, createAppContainer } from 'react-navigation';

import listScreen from './screens/list';
import createScreen from './screens/create';
import detailScreen from './screens/detail';
import loginScreen from './screens/login';
import signupScreen from './screens/signup';

const Routes = createStackNavigator({
  Login: {
    screen: loginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  Signup: {
    screen: signupScreen,
    navigationOptions: {
      title: 'Signup'
    }
  },
  List: {
    screen: listScreen,
  },
  Create: {
    screen: createScreen,
    navigationOptions: {
      title: 'Create New Book'
    }
  },
  Detail: {
    screen: detailScreen,
    navigationOptions: {
      title: 'Book Detail',
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F259E',
    },
    headerTintColor: '#fff',
  },
});

export default createAppContainer(Routes);
