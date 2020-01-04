import React from 'react'
import { enableScreens } from 'react-native-screens'
import { AppContainer } from './navigators/App'
import { StatusBar } from './view/design/StatusBar'
import { DarkTheme } from './view/constants/theme'
import { AuthBlocProvider, ThemeBlocProvider, PostSendBlocProvider } from './hooks/inject'

enableScreens()

export default class App extends React.Component {
  render() {
    return (
      <ThemeBlocProvider defaultTheme={DarkTheme}>
        <AuthBlocProvider>
          <PostSendBlocProvider>
            <StatusBar />
            <AppContainer />
          </PostSendBlocProvider>
        </AuthBlocProvider>
      </ThemeBlocProvider>
    )
  }
}
