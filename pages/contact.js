import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout/layout'
import styles from '../styles/Contact/Contact.module.css'
import React from 'react'

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      email: '',
      hasEmailError: false,
      content: '',
      hasContentError: false
    };
  }

  handleEmailChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      email: inputValue,
      hasEmailError: isEmpty,
    });
  }

  handleContentChange(event) {
    const inputValue = event.target.value;
    const isEmpty = inputValue === '';
    this.setState({
      content: inputValue,
      hasContentError: isEmpty,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const isEmptyEmail = this.state.email === '';
    const isEmptyContent = this.state.content === '';

    if(isEmptyEmail && isEmptyContent){
      this.setState({
        hasEmailError: true,
        hasContentError: true
      });
    } else if (isEmptyEmail){
      this.setState({
        hasEmailError: true
      });
    } else if(isEmptyContent){
      this.setState({
        hasContentError: true
      });
    } else{
      this.setState({ isSubmitted: true });      
    }
  }

  render() {
    let emailErrorText;
    if (this.state.hasEmailError) {
      emailErrorText = (
        <p className={styles.contactMessageError}>
          メールアドレスを入力してください
        </p>
      );
    }

    let contentErrorText;
    if (this.state.hasContentError) {
      contentErrorText = (
        <p className={styles.contactMessageError}>
          お問い合わせ内容を入力してください
        </p>
      )
    }

    let contactForm;
    if (this.state.isSubmitted) {
      contactForm = (
        <div className={styles.contactSubmitMessage}>
          送信完了
        </div>
      );
    } else {
      contactForm = (
        <form onSubmit={(event) => { this.handleSubmit(event) }} >
          <p>メールアドレス（必須）</p>
          <input
            value={this.state.email}
            onChange={(event) => { this.handleEmailChange(event) }}
          />
          {emailErrorText}
          <p>お問い合わせ内容（必須）</p>
          <textarea
            value={this.state.content}
            onChange={(event) => this.handleContentChange(event)}
          />
          {contentErrorText}
          <input
            type='submit'
            value='送信'
          />
        </form>
      );
    }

    return (
      <Layout sidebar>
        <Head>
          <title>{siteTitle} - Contact</title>
        </Head>
        <div className={styles.contact}>
          <header className={styles.contact__header}>Contact</header>
          <div className={styles.contact__contents}>
            <div className={styles.contactForm}>
              {contactForm}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ContactForm;

