// @flow
import React from "react";
import type { Children } from "react";
import Head from "next/head";

type Props = {
  title?: string,
  children?: Children
};

export default ({ title = "Movie List", children }: Props) => (
  <main>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
      />
      <script async src="https://www.google-analytics.com/analytics.js" />
      <script async src="/static/autotrack.custom.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-98611098-1', 'auto');
          ga('require', 'urlChangeTracker');
          ga('send', 'pageview');
        `
        }}
      />
    </Head>
    {children}

    <style jsx global>{`
      body {
        background-color: #f4f4f4;
        color: #333;
        font-family: 'Courier Next', courier, monospace;
        margin: 0;
      }
    `}</style>
  </main>
);
