import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import Clients from '@/components/clients/Clients'

const ClientsPage = () => {
  return (
    <SidebarWithHeader>
      <Clients />
    </SidebarWithHeader>
  )
}

export default ClientsPage