import React, { useEffect } from 'react';
import '@fontsource/roboto'
import AuthWrapper from './src/components/AuthWrapper'
import './src/layout.css'

export const wrapRootElement = ({ element }) =>
  <AuthWrapper>
    {element}
  </AuthWrapper>
