import React, { FC } from 'react'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

const FOOTER_STYLE:CSSProperties = {
  margin: '15px 0',
  color: '#bbb',
  textAlign: 'center',
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
}

export const Footer: FC = () => (
  <div style={FOOTER_STYLE}>(c) Popoeshnick team</div>
)
