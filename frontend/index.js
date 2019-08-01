import { AppRegistry, YellowBox } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
  'Warning: ViewPagerAndroid',
  'Warning: Async Storage',
  'Warning: Failed prop type'
]);

AppRegistry.registerComponent(appName, () => App);
