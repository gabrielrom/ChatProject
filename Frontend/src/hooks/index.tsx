import React from 'react';

import { AuthProvider } from './auth';
import { SignalRProvider } from './signalRHub';

const AppProvider: React.FC = ({ children }) => (
  <SignalRProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </SignalRProvider>
  
);

export default AppProvider;