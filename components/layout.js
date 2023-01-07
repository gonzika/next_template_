import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import MyAlert from "./alert/alert";
import MyBackDrop from "./backDrop/backDrop";
import Header from "./header/header";
import TransitionsModal from "./modal/modal";
import { useEffect, useState } from "react"

export default function Layout({ children }) {
  const [loaded, set_loaded] = useState(false)

  useEffect(() => {
    set_loaded(true)
  }, [])
  return (
    <>
      <Head>
        <title>Next Template</title>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#dbe1e1" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171734" />
      </Head>

      <ErrorBoundary>
        <LoadingBoundary loaded={loaded}>
          <Site>{children}</Site>
        </LoadingBoundary>
      </ErrorBoundary>
    </>
  )
}


function Site({children}) {
  return (
    <>
      <Header />

      <main>
        <Container sx={{ paddingBottom: 2 }} maxWidth="xl">{children}</Container>
      </main>

      <TransitionsModal />
      <MyAlert />
      <MyBackDrop />
    </>
  )
}


function LoadingBoundary({loaded, children}) {
  return (
    <>
      {!loaded && <div className="loading-back-drop"></div>}
      {children}
    </>
  )
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <h1>Error</h1>
          <br />
          <img src='/img/error_boath.gif'></img>
        </div>
      )
    }

    return this.props.children;
  }
}