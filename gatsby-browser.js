import React from "react";
import AuthWrapper from './src/components/AuthWrapper'
import Layout from './src/components/Layout'
import '@fontsource/roboto'

export const wrapRootElement = ({ element }) =>
  <AuthWrapper>
    <Layout>
      {element}
    </Layout>
  </AuthWrapper>
