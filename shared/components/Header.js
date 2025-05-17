import React from "react";
import Head from "next/head";

const Header = ({
  children,
  title = "Shoptacle | Your one stop for perfect fashion",
}) => {
  return (
    <Head>
      <meta name="theme-color" content="#faf4f4" />

      <meta charSet="utf-8" key="utf-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
        key="viewport"
      />

      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
        key="X-UA-Compatible"
      />

      <link rel="icon" href="/icon.png" key="icon" />

      <meta name="robots" content="index, follow" key="robots" />

      <meta
        name="keywords"
        content="Ecommerce, Shoptacle, Ecommerce Firebase, Ecommerce authentication, ecommerce implmentation, ecommerce app, NextJs, Next, React, firebase, dev arise"
        key="keywords"
      />

      <meta
        name="google-site-verification"
        content="Y7AhEXjqshRz7CKtM7SSoyyQz4-RxXwebjgPIhgKhVU"
        key="google-site-verification"
      />

      <meta
        content="https://shoptacle.vercel.app/"
        property="og:url"
        key="og:url"
      />

      <meta content="Shoptacle" property="og:site_name" key="og:site_name" />

      <meta content="products" property="og:type" key="og:type" />

      <meta property="og:locale" content="en_NG" key="og:locale" />

      <meta
        name="description"
        content="Your one stop for perfect fashion, Shoptacle is the way to go. A modern, responsive, fullstack NextJs app with flutter and stripe payment integrations, user authentication, clean UI implementations and fully responsive. Built with Next Js and firebase"
        key="description"
      />
      <meta
        content="Your one stop for perfect fashion, Shoptacle is the way to go. A modern, responsive, fullstack NextJs app with flutter and stripe payment integrations, user authentication, clean UI implementations and fully responsive. Built with Next Js and firebase"
        property="og:description"
        key="og:description"
      />

      <meta
        content="Shoptacle | Your one stop for perfect fashion"
        property="og:title"
        key="og:title"
      />
      <meta
        name="title"
        content="Shoptacle | Your one stop for perfect fashion"
        key="title"
      />
      <title>{title}</title>
      {children}
    </Head>
  );
};

export default Header;
