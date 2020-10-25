import { Styles } from '@material-ui/core/styles/withStyles'
import { makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    avatar: {
        margin: 10,
      },
      bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
      wrapper: {
        backgroundSize: 'cover',
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        padding: '8px',
      },
      leftWrapper: {
        flexGrow: 0.7,
        padding: '0 8px',
      },
      rightWrapper: {
        flexGrow: 0.3,
        margin: '-8px',
        backgroundColor: '#fff',
        height: '100vh',
      },
      btnRoot: {
        marginLeft: '24px',
      },
      typographyRoot: {
        marginTop: '25px',
        color: '#fff',
      },
}))

export const styles:Styles<Theme, {}, string> = ({
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
    wrapper: {
      backgroundSize: 'cover',
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      padding: '8px',
    },
    leftWrapper: {
      flexGrow: 0.7,
      padding: '0 8px',
    },
    rightWrapper: {
      flexGrow: 0.3,
      margin: '-8px',
      backgroundColor: '#fff',
      height: '100vh',
    },
    btnRoot: {
      marginLeft: '24px',
    },
    typographyRoot: {
      marginTop: '25px',
      color: '#fff',
    },
  })
  