import React, { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import {
  Wrapper,
  Input,
  Button,
  TextOverlayGradient,
  Result,
  Thumbnail,
  Title,
} from './styles'

export default () => {
  // const { ipcRenderer } = require('electron')

  const input = useRef<HTMLInputElement>(null)

  const [ results, setResults ] = useState([])

  useEffect(() => {
    /*ipcRenderer.on('search-reply', (e, { results }) => {
    this.setState({ results })
    })

    ipcRenderer.on('getMaster-reply', (e, { selectedItem }) => {
      this.setState({ selectedItem, selected: true })
    })*/
  }, [])

  const handleSearch = async () => {
    if (input.current.value.length === 0) {
      input.current.focus()
      return
    }
    // ipcRenderer.send('search-msg', query)
  }

  const handleSelect = async ({ id }) => {
    // ipcRenderer.send('getMaster-msg', id)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch(this.input.current.value)
    }
  }

  return (
    <>
      <Wrapper>
        <TextOverlayGradient />
        <Input placeholder="find your release" ref={input} onKeyPress={handleKeyPress} />
        <Button onClick={handleSearch} />
      </Wrapper>
      {results.map((e, i) => (
        <Result first={i === 0} key={i} onClick={() => handleSelect(e)} >
          <Thumbnail thumb={e.thumb} />
          <Title>{e.title}</Title>
        </Result>
      ))}
    </>
  )
}
