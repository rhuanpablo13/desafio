import React, {useEffect} from 'react';
import * as Permissions from 'expo-permissions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Home from './screens/Home';
import CreateTask from './screens/CreateTask';
import TodoStore from './data/TodoStore';


const AppNavigator = createStackNavigator(
  {
    Home,
    CreateTask,
  },
  {
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  
  useEffect(() => {
    askForCalendarPermissions();
    askForReminderPermissions();
  }, []);


  async function askForCalendarPermissions () {
    await Permissions.askAsync(Permissions.CALENDAR);
  }

  async function askForReminderPermissions () {    
    if (Platform.OS === 'android') {
      return true;
    }
    await Permissions.askAsync(Permissions.REMINDERS);
  }

  return (
    <TodoStore>
      <AppContainer />
    </TodoStore>      
  );
}





// class App2 extends Component {
//   async componentWillMount() {
//     await this._askForCalendarPermissions();
//     await this._askForReminderPermissions();
//   }

//   _askForCalendarPermissions = async () => {
//     await Permissions.askAsync(Permissions.CALENDAR);
//   };

//   _askForReminderPermissions = async () => {
//     if (Platform.OS === 'android') {
//       return true;
//     }

//     await Permissions.askAsync(Permissions.REMINDERS);
//   };

//   render() {
//     return (
//       <TodoStore>
//         <AppContainer />
//       </TodoStore>      
//     );
//   }
// }


