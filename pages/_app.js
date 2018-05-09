import { Layout } from '../components/alheimsins'
import App, {Container} from 'next/app'
import React from 'react'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx, ctx: { query, req } }) {
    let componentProps = {}
    const path = req && req.url ? req.url : false
    // const ip = ctx && ctx.req ? ctx.req.socket.remoteAddress : false
    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx)
    }
    const pageProps = Object.assign({}, componentProps, { query, path })
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
