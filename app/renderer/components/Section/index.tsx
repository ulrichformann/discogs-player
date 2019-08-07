import React, { forwardRef } from 'react'
import { Wrapper, Border, Icon } from './styles'

const Layout = props => (
  <Wrapper>
    <Border>
      <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
    </Border>
    {props.children}
  </Wrapper>
)

export default Layout

export const FileIcon = props => (
  <Icon fill='none'>
      <path d="M22 19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H7.19722C8.3235 3 9.37526 3.56288 10 4.5V4.5C10.6247 5.43712 11.6765 6 12.8028 6H20C21.1046 6 22 6.89543 22 8V19Z" stroke="#8E8E93" />
  </Icon>
)

export const SearchIcon = props => (
  <Icon fill='none'>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#8E8E93" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 21L15.8 15.8" stroke="#8E8E93" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>
)