import { Layout } from '../components/alheimsins'
import App from 'next/app'
import React from 'react'
import { Router } from '../routes'
import * as gtag from '../lib/gtag'

Router.onRouteChangeComplete = url => gtag.pageview(url)

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx, ctx: { query, req } }) {
    let componentProps = {}
    const path = req && req.url ? req.url : false
    const countryCode = req && req.requestCountryCode ? req.requestCountryCode.toLowerCase() : 'en'
    // const ip = ctx && ctx.req ? ctx.req.socket.remoteAddress : false
    if (Component.getInitialProps) {
      componentProps = await Component.getInitialProps(ctx)
    }
    const pageProps = Object.assign({}, componentProps, { query, path, countryCode })
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}
