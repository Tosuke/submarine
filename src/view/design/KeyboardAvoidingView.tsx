import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  ViewStyle,
  View,
  LayoutRectangle,
  LayoutChangeEvent,
  Keyboard,
  EmitterSubscription,
  Platform,
  KeyboardEventListener,
  LayoutAnimation,
} from 'react-native'
import { Header } from 'react-navigation'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export type KeyboardAvoidingViewProps = {
  children?: React.ReactNode
  style?: ViewStyle
  keyboardVerticalOffset?: number
}

export const KeyboardAvoidingView = ({ children, style, keyboardVerticalOffset }: KeyboardAvoidingViewProps) => {
  const keyboardOffset = keyboardVerticalOffset || Header.HEIGHT + getStatusBarHeight()
  const [keyboardY, updateKeyboardY] = useState<number | undefined>()
  const [frame, updateFrame] = useState<LayoutRectangle | undefined>()
  const bottom = useMemo(() => {
    if (!frame || !keyboardY) return 0
    return Math.max(frame.y + frame.height + keyboardOffset - keyboardY, 0)
  }, [keyboardY, frame, keyboardOffset])

  const onLayout = useCallback((ev: LayoutChangeEvent) => {
    updateFrame(ev.nativeEvent.layout)
  }, [])

  useEffect(() => {
    const onKeyboardChange: KeyboardEventListener = ev => {
      if (ev == null) {
        updateKeyboardY(undefined)
        return
      }
      if (ev.duration && ev.easing) {
        LayoutAnimation.configureNext({
          duration: Math.max(ev.duration, 10),
          update: {
            duration: Math.max(ev.duration, 10),
            type: LayoutAnimation.Types[ev.easing] || 'keyboard',
          },
        })
      }
      updateKeyboardY(ev.endCoordinates.screenY)
    }

    let subs: EmitterSubscription[] = []
    if (Platform.OS === 'ios') {
      subs.push(Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange))
    } else if (Platform.OS === 'android') {
      subs.push(Keyboard.addListener('keyboardDidShow', onKeyboardChange))
      subs.push(Keyboard.addListener('keyboardDidHide', onKeyboardChange))
    }

    return () => {
      for (const sub of subs) {
        sub.remove()
      }
    }
  }, [])

  return (
    <View onLayout={onLayout} style={[style, { paddingBottom: bottom }]}>
      {children}
    </View>
  )
}