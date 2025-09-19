import { GA_TRACKING_ID } from '../lib/_analytics'
import './global.css'

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="format-detection" content="telephone=no" />

          <link href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.0/semantic.css" rel="stylesheet" />
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
              $('.ui.sidebar')
                .sidebar('attach events', '.sidebar.icon')

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
        </head>
        <body>
        {children}
        </body>
      </html>
    )
  }