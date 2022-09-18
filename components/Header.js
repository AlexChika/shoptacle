import React from "react";
import Head from "next/head";

const Header = ({ children }) => {
  return (
    <Head>
      <meta name="theme-color" content="#faf4f4" />
      <meta
        name="title"
        key="title"
        content="Shoptacle | Your one stop for perfect fashion"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta
        content="Shoptacle | Your one stop for perfect fashion"
        property="og:title"
        key="og:title"
      />
      <meta
        content="Your one stop for perfect fashion, Shoptacle is the way to go. A modern responsive full stack Next Js app with clean UI and implementations with user authentication, flutter, stripe, authentication and fully responsive"
        key="og:description"
        property="og:description"
      />
      <meta
        content="https://shoptacle.vercel.app/"
        property="og:url"
        key="url"
      />

      <meta content="Shoptacle" property="og:site_name" />
      <meta content="products" property="og:type" />
      <meta charSet="utf-8" />
      <meta property="og:locale" content="en_NG" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="description"
        key="description"
        content="Your one stop for perfect fashion, Shoptacle is the way to go. A modern responsive full stack Next Js app with clean UI and implementations with user authentication, flutter, stripe, authentication and fully responsive"
      />
      <meta
        name="keywords"
        key="keywords"
        content="Ecommerce, Shoptacle, Ecommerce Firebase, Ecommerce authentication, ecommerce implmentation, ecommerce app"
      />
      <link rel="icon" href="/icon.png" />
      <title>Shoptacle | Your one stop for perfect fashion</title>
      {children}
    </Head>
  );
};

export default Header;
//   <meta
//         name="keywords"
//         key="keywords"
//         content="Ecommerce, Shoptacle, Ecommerce Firebase, Ecommerce authentication, ecommerce implmentation, ecommerce app"
//       />
//  <meta
//         name="description"
//         key="description"
//         content="Your one stop for perfect fashion, Shoptacle is the way to go. A modern responsive full stack Next Js app with clean UI and implementations with user authentication, flutter, stripe, authentication and fully responsive"
//       />
//  <meta
//    name="title"
//    key="title"
//    content="Shoptacle | Your one stop for perfect fashion"
//  />;
//   <meta
//     content="Shoptacle | Your one stop for perfect fashion"
//     property="og:title"
//     key="og:title"
//   />;

//    <meta
//      content="Your one stop for perfect fashion, Shoptacle is the way to go. A modern responsive full stack Next Js app with clean UI and implementations with user authentication, flutter, stripe, authentication and fully responsive"
//      key="og:description"
//      property="og:description"
//    />;

//     <meta
//       content="https://shoptacle.vercel.app/"
//       property="og:url"
//       key="url"
//     />;
