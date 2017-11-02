import React from 'react'
import '../../styles/core.scss'
import './styles.scss'

export const CommonLayout = ({ children }) => (
  <div className="common-layout">
    {children}
  </div>
)

CommonLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CommonLayout
