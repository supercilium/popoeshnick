import React, { FC } from 'react'
import { useStyles } from './style'

export const Footer: FC = () => {
  const { root } = useStyles()
  return (
    <div className={root}>(c) Popoeshnick team</div>
  )
}
