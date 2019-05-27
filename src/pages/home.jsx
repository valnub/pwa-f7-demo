import React from 'react';
import { Page, Block, BlockTitle, Button } from 'framework7-react';
import f7logo from '../static/icons/128x128.png';

export default class Home extends React.Component{
  constructor () {
    super();
    this.state = { showButton: false };
    this.onInstallBtnClicked = this.onInstallBtnClicked.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.setState({ showButton: true });
    });
  }

  onInstallBtnClicked() {
    this.setState({ showButton: false });
    this.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  render () {
    return (
      <Page name="home">
        <BlockTitle>PWA test</BlockTitle>
        <Block strong>
          <img src={f7logo} alt="" />
          <Button onClick={this.onInstallBtnClicked}>Install this app</Button>
        </Block>
      </Page>
    );
  }
}