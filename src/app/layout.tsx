
import "bootstrap/dist/css/bootstrap.min.css"; // then bootstrap


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en" className="min-h-screen" style={{ fontSize: '16px' }}>

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className="text-black" style={{ backgroundColor: "#f6fff6" }}>

        {children}

      </body>
    </html>

  );
}
