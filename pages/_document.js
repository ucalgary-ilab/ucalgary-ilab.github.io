import Document, { Head, Html, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/_analytics'

export default class MyDocument extends Document {
  render() {
    return (
        <Html lang="en"> 
        <Head>
          {/* <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="format-detection" content="telephone=no" /> */}

          <link href="/assets/img/favicon.ico" rel="shortcut icon" />
          {/* <link href="/static/css/style.css" rel="stylesheet" /> */}

          <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.0/semantic.js"></script>

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}}
          />

          <script dangerouslySetInnerHTML={{
          __html: `
            $(window).ready(function() {
              // $('.ui.sidebar')
              //   .sidebar('attach events', '.sidebar.icon')

              $('.sidebar.icon').on('click', function(event) {
                $('.ui.sidebar')
                  .sidebar('toggle')
              })

              $('.publication').on('click', function(event) {
                if (event.target.className === 'author-link') return
                const id = this.dataset.id
                $('#'+id).modal({
                  onHidden: function() {
                    const html = $(this).html()
                    $(this).html(html)
                  }
                })
                .modal('show')
              })
            })
          `}}
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}