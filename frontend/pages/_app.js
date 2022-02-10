import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

import withData from '../lib/withData';
import Page from '../components/Page';

import '../components/styles/nprogress.css';
import CartStateProvider from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // console.log(JSON.stringify(pageProps, null, 4));
  // console.log(JSON.stringify(Component, null, 4));
  // console.log(ctx);

  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
