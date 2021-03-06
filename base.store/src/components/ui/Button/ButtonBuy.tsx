import { Button as UIButton } from '@faststore/ui'
import React from 'react'
import Icon from 'src/components/ui/Icon'
import type { ButtonProps } from '@faststore/ui'

type Props = ButtonProps

function ButtonBuy({ children, ...props }: Props) {
  return (
    <UIButton
      data-fs-button
      data-store-buy-button
      data-fs-button-variant="buy"
      {...props}
    >
      <Icon name="ShoppingCart" width={18} height={18} weight="bold" />
      {children}
    </UIButton>
  )
}

export default ButtonBuy
