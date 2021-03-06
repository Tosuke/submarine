import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native-paper'
import { Caption } from '../../../design'
import { useRelativeTime } from './useRelativeTime'
import { useFontSizeStyle } from './styles'

const HeaderView = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
`

const HeaderNameText = styled(Text)`
  flex-shrink: 1;
  margin-right: 6;
  font-weight: bold;
`

const HeaderScreenNameText = styled(Caption)`
  margin-right: 6;
`

const HeaderTimeText = styled(Caption)`
  margin-left: auto;
`

export const Header: React.FC<{ name: string; screenName: string; createdAt: Date }> = ({
  name,
  screenName,
  createdAt,
}) => {
  const relativeTime = useRelativeTime(createdAt)
  const fontSizeStyle = useFontSizeStyle()
  return (
    <HeaderView>
      <HeaderNameText style={fontSizeStyle} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </HeaderNameText>
      <HeaderScreenNameText style={fontSizeStyle}>@{screenName}</HeaderScreenNameText>
      <HeaderTimeText style={fontSizeStyle}>{relativeTime}</HeaderTimeText>
    </HeaderView>
  )
}
