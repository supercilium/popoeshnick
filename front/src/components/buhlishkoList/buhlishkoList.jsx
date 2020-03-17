import React from 'react'
import {
  withStyles,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Buhlishko from './buhlishko'


const styles = ({
  div: {
    marginBottom: '10px',
  },
})
export const BuhlishkoList = React.memo(({ data, classes }) => (
  <div classes={{ root: classes.div }}>
    {data.map(item => <Buhlishko key={`${item.name}_${item.amount}_${item.lg}`} {...item} />)}
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
