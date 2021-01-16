import React, { Component } from 'react'
import './HelpPage.css'
import '../../components/App/App.css'

export default class HelpPage extends Component {

  render() {
    return (
      <main className="main">
          <h3 className='default'>Please select a poll on the left. 
          You may then select a vote option and submit to vote.
          If you wish to create a new poll, please click the add
          button on the bottom left.</h3>
      </main>
    )
  }
}