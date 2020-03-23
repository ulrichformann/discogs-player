import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import LoadingBar from 'react-top-loading-bar'

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

  ::placeholder {
    color: #636366;
  }
`

const Search = forwardRef((props, ref) => {
  const input = useRef(null)
  const loadingBar = useRef(null)
  const [active, setActive] = useState(false)

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

  const search = async (e) => {
    const { value } = input.current

    if (e.keyCode !== 13 || !value)
      return

    let url

    try {
      url = new URL(value)
    } catch (err) {
      input.current.value = ''
      return
    }

    const paths = url.pathname.split('/')
    const type = paths[ paths.length - 2 ]
    const id = paths[ paths.length - 1 ]
    
    if (type !== 'release') {
      input.current.value = ''
      return
    }

    try {
      loadingBar.current.continuousStart()
      console.log(type, id)
      
      await fetch('https://discogs.now.sh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: `{
          release(release_id: ${id}) {
            title
          }
        }`})
      })
      .then(r => r.json())
      .then(data => {
        console.log('data returned:', data)
      })
    } catch (err) {
      console.log(err)
    } finally {
      loadingBar.current.complete()
    }
  }

  return (
    <>
      <LoadingBar ref={loadingBar} />
      <Wrapper
        active={active}
      >
        <ClickArea
          onClick={handleFocus}
          active={active}
        >
          <Input ref={input} onBlur={handleBlur} active={active} onKeyDown={search} placeholder='Discogs link' defaultValue='https://www.discogs.com/The-Raconteurs-Broken-Boy-Soldiers/release/699154' />
          <SearchIcon />
        </ClickArea>
      </Wrapper>
    </>
  )
})

export default Search