import { Layout } from '../components/alheimsins'
import App, {Container} from 'next/app'
import React from 'react'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let componentProps = {}
    const { query } = ctx
    const path = ctx.req && ctx.req.url ? ctx.req.url : false
    // const ip = ctx && ctx.req ? ctx.req.socket.remoteAddress : false
    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx)
    }
    const pageProps = Object.assign({}, componentProps, { query: query, path: path })
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
