import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

import Section, { SearchIcon } from './Section'

const timing = 500

const ClickArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: text;
  svg {
    cursor: ${(p: { active: boolean }) => p.active ? 'pointer' : 'text'};
  }
`

const Wrapper = styled(Section)`
  rect {
    stroke-dasharray: 8px 0;
    stroke-opacity: 0;
  }
  border 1px solid #8E8E93;
  ${(p: { active: boolean }) => p.active && `
    height: 40px;
    background: #1C1C1E;
  `}
  transition: height ${timing}ms ease, border 333ms ease, background ${timing}ms ease;
  rect {
    transition: all ${timing}ms ease;
  }
`

const Input = styled.input`
  border: none;
  background: none;
  margin: ${(p: { active: boolean }) => p.active ? `0 8px 0 4px` : '0'};
  padding: 0;
  width: ${(p: { active: boolean }) => p.active ? 'calc(100% - 24px - 16px - 12px - 4px)' : '0'};
  outline: none;
  color: #8E8E93;
  font-family: inherit;
  font-size: inherit;
  transition: all ${timing}ms ease;
`

export default forwardRef((props, ref) => {
  const input = useRef(null)
  const [ active, setActive ] = useState(false)

  useImperativeHandle(ref, () => ({
    focus() {
      setActive(true)
    }
  }))

  const handleFocus = () => {
    setTimeout(() => {
      input.current.focus()
    }, timing)

    setActive(true)
  }

  const handleBlur = () => {
    if (input.current.value === '')
      setActive(false)
  }

  const search = (e) => {
    if (e.keyCode === 13) {
      
    }
  }

  return (
    <Wrapper
      active={active}
    >
      <ClickArea 
        onClick={handleFocus}
        active={active}
      >
        <Input ref={input} onBlur={handleBlur} active={active} onKeyDown={search} />
        <SearchIcon />
      </ClickArea>
    </Wrapper>
  )
})
