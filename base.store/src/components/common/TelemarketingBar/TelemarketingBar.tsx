import { Button } from '@faststore/ui'
import React, { useCallback, useEffect, useState } from 'react'
import type { TelemarketingStatus } from 'src/sdk/telemarketing/getTelemarketingStatus'
import getTelemarketingStatus from 'src/sdk/telemarketing/getTelemarketingStatus'
import impersonateCustomer from 'src/sdk/telemarketing/impersonateCustomer'

export default function TelemarketingBar() {
  const [telemarketingStatus, setTelemarketingStatus] = useState<
    TelemarketingStatus | undefined
  >()

  const [error, setError] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const cachedTelemarketingStatus = localStorage.getItem('telemarketing')

    const { sessionToken } =
      typeof cachedTelemarketingStatus === 'string'
        ? JSON.parse(cachedTelemarketingStatus)
        : { sessionToken: null }

    getTelemarketingStatus(sessionToken)
      .then((res) => {
        setTelemarketingStatus(res)
        setError(false)
      })
      .catch(() => setError(true))
  }, [setError])

  useEffect(() => {
    localStorage.setItem('telemarketing', JSON.stringify(telemarketingStatus))
  }, [telemarketingStatus])

  const impersonate = useCallback(() => {
    const customerEmail = prompt(
      'Qual email do cliente você quer impersonar?'
    )?.trim()

    if (!customerEmail || !telemarketingStatus?.sessionToken) {
      alert('email inválido')

      return
    }

    impersonateCustomer(customerEmail, telemarketingStatus?.sessionToken).then(
      (res) => {
        setTelemarketingStatus({
          ...telemarketingStatus,
          customerEmail: res.customerEmail,
        })
      }
    )
  }, [telemarketingStatus])

  if (error) {
    return <div style={{ backgroundColor: 'red', color: 'white' }}>Error</div>
  }

  return telemarketingStatus?.canImpersonate ? (
    <div>
      <p>{telemarketingStatus.userEmail}</p>
      <p>{telemarketingStatus.customerEmail ?? 'Ainda não impersonou, mano'}</p>
      <Button onClick={impersonate}>Impersonar</Button>
    </div>
  ) : null
}
