import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'
import '../styles/dashboard.css'

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h1 className="dashboard-title">URL Shortener</h1>
          <p className="dashboard-subtitle">Create and manage your shortened URLs</p>
          <UrlForm/>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-title">Your URLs</h2>
          <p className="dashboard-subtitle">Track and manage all your shortened links</p>
          <UserUrl/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage