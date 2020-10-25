import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import { BuhlishkoInterface } from '../../../model/user'

const useStyles = makeStyles(() => ({
  span: {
    display: 'inline-block',
    padding: '0 10px',
  },
}))

export const Buhlishko: FC<BuhlishkoInterface> = ({
  name,
  amount,
  lg,
}) => {
  const classes = useStyles()
  return (
  <div>
    <span className={classes.span}>{name}</span>
    <span className={classes.span}>{`${amount} l`}</span>
    <span className={classes.span}>{`+ ${lg} LG`}</span>
  </div>
)}