import React from 'react'


interface Props {
  title: string
}

/**
 * Put Employee and Manager login page here
 */
export default class Home extends React.Component<Props> {
  render() {
    return (

      <div>
        <h1>Welcome to {this.props.title}</h1>
      </div>
    )
  }
}

