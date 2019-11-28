import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import withI18next from '../../hoc/withI18next'

const Layout = ({ user, children, t }) => (
  <div className='container'>
    <Head>
      <title>{t('common:title')}</title>
      <meta name='viewport' content='initial-scale=0.8, maximum-scale=0.8, width=device-width' />
      <meta property='og:title' content='Want to take a free Big Five personality test?' />
      <meta property='og:description' content='Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' />
      <meta property='og:image' content='/static/apple-icon-152x152.png' />
      <meta name='theme-color' content='#000000' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content='@maccyber' />
      <meta name='twitter:title' content='Want to take a free Big Five personality test?' />
      <meta name='twitter:description' content='Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' />
      <meta name='twitter:image' content='https://bigfive-test.com/static/apple-icon.png' />
      <meta name='description' content='Take a free, open-source Big Five personality test - translated to multiple languages. Get to know yourself better from a detailed profile of your personality traits or learn to know others by comparing yourself with your partner, colleagues, friends or family.' />
      <meta name='keywords' content='BigFive, personality traits, survey, compare' />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: '{ "@context": "http://schema.org/", "@type": "WebSite", "name": "BigFive Test", "url": "https://bigfive-test.com" }' }} />
      <link rel='icon' sizes='192x192' href='/static/android-icon-192x192.png' />
      <link rel='apple-touch-icon' href='/static/apple-icon-152x152.png' />
      <link rel='shortcut icon' href='/static/favicon.ico' />
      <link rel='manifest' href='/static/manifest.json' />
    </Head>
    <Header user={user} />
    <div className='main'>
      {children}
    </div>
    <Footer />
    <style jsx global>
      {`
        body {
          background: white;
          color: black;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
          height: 100%;
        }
        ::selection {
          background: black;
          color: white;
        }
        a {
          text-decoration: none;
        }
        h1 {
          font-weight: 400;
          font-size: 32px;
        }
        h2 {
          color: #909090;
          font-weight: normal;
        }
        .container {
          display: grid;
          grid-template-areas:
            "header header header"
            ". content ."
            "footer footer footer";
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: auto 1fr auto;
          min-height: 100vh;
        }
        @media screen and (max-width: 800px) {
          .container {
            grid-template-columns: 3% 1fr 3%;
          }
        }
        .main {
          grid-area: content;
          width: 100%;
          height: 100%;
        }
        .main a {
          color: #bd10e0;
        }
      `}
    </style>
  </div>
)

export default withI18next(['common'])(Layout)
