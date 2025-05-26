import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './app/HomePage'
import { DatasetProvider } from './DatasetContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerHomePage from './app/customer/CustomerHomePage'
import MyTickets from './app/customer/MyTickets'
import CustomerHelpCenter from './app/customer/HelpCenter'
import Community from './app/customer/Community'
import Conversation from './app/customer/Conversation'
import SubmitComplaint from './app/customer/SubmitComplaint'
import TrackComplaint from './app/customer/TrackComplaint'
import ConfirmationPage from './app/customer/ConfirmationPage'

import AgentSignIn from './app/authenticate/AgentSignIn'
import AgentSignUp from './app/authenticate/AgentSignUp'
import CompanySignIn from './app/authenticate/CompanySignIn'
import CompanySignUp from './app/authenticate/CompanySignUp'
import CustomerSignIn from './app/authenticate/CustomerSignIn'
import CustomerSignUp from './app/authenticate/CustomerSignUp'

import UserTypeSelector from './app/authenticate/UserTypeSelector'

function App() {

  return (
    <DatasetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer" element={<CustomerHomePage />} />
          <Route path="/customer/myTickets" element={<MyTickets />} />
          <Route path="/customer/helpCenter" element={<CustomerHelpCenter />} />
          <Route path="/customer/community" element={<Community />} />
          <Route path="/customer/myTickets/:ticketId" element={<Conversation />} />
          <Route path="/customer/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/customer/track-complaint" element={<TrackComplaint />} />
          <Route path="/customer/submit-complaint/confirmation" element={<ConfirmationPage />} />
          {/* <Route path="/home_page" element={<Home_page />} />
          <Route path="/product_page" element={<Product_Page />} /> */}

          {/* Auth */}
          {/* Company Authentication Routes */}
          <Route path="/auth/company/signin" element={<CompanySignIn />} />
          <Route path="/auth/company/signup" element={<CompanySignUp />} />

          {/* Agent Authentication Routes */}
          <Route path="/auth/agent/signin" element={<AgentSignIn />} />
          <Route path="/auth/agent/signup" element={<AgentSignUp />} />

          {/* Customer Authentication Routes */}
          <Route path="/auth/customer/signin" element={<CustomerSignIn />} />
          <Route path="/auth/customer/signup" element={<CustomerSignUp />} />

          <Route path="/auth" element={<UserTypeSelector />} />
        </Routes>
      </Router>
    </DatasetProvider>
  )
}

export default App


