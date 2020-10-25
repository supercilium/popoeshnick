import React, { FC } from 'react'
import {
  withStyles,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Buhlishko } from '../atoms'


const styles = ({
  div: {
    marginBottom: '10px',
  },
})
export const BuhlishkoList: FC<any> = React.memo(({ data, classes }) => (
  <div>
    {data.map((item: any) => <Buhlishko key={`${item.name}_${item.amount}_${item.lg}`} {...item} />)}
  </div>
))

BuhlishkoList.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.any.isRequired,
}

BuhlishkoList.defaultProps = {
  data: [],
}

export default withStyles(styles)(BuhlishkoList)
