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
