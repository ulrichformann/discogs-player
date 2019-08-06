import React, { Component, createRef } from 'react'

export default class extends Component{
  render() {
    return (
      <>
        {/* {<h1>{this.props.selectedItem.title}</h1> */}
        <ul>
        {/* {this.props.selectedItem.tracklist.map((e, i) => (
          <li key={i}>
            {e.position} - {e.title}
          </li>
        ))} */}
        </ul>
      </>
    )
  }
}
