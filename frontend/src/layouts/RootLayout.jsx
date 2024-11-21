import React from 'react'
import {  Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/navbar'
import ThemeContextProvider from '../contexts/ThemeContext'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarContextProvider } from '../contexts/SnackbarContext'

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ThemeContextProvider>
      <SnackbarContextProvider>
        <QueryClientProvider client={queryClient}>
        <NavBar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Outlet />
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarContextProvider>
    </ThemeContextProvider>
  )
}

export default RootLayout
