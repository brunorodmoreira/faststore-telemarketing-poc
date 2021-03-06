import React, { lazy, Suspense } from 'react'
import Alert from 'src/components/common/Alert'
import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import Toast from 'src/components/common/Toast'
import { useUI } from 'src/sdk/ui'
import type { PropsWithChildren } from 'react'
import TelemarketingBar from './components/common/TelemarketingBar/TelemarketingBar'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

function Layout({ children }: PropsWithChildren<unknown>) {
  const { displayMinicart } = useUI()

  return (
    <div id="layout">
      <TelemarketingBar />
      <Alert>
        Get 10% off today:&nbsp;<span>NEW10</span>
      </Alert>

      <Navbar />

      <main>{children}</main>

      <Footer />

      <Toast />

      {displayMinicart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}
    </div>
  )
}

export default Layout
