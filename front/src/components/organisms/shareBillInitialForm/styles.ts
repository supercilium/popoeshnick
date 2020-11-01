import { makeStyles } from '@material-ui/core/styles'

export const useStyles =makeStyles(() => ({
    root: {
        paddingBottom: '50px',
        width: 'auto',
        overflow: 'auto',
        maxWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
      },
      formInitial: {
        maxWidth: '500px',
        margin: '42px auto',
      },
      button: {
        margin: '20px auto 0',
        display: 'inline-block',
      },
}))