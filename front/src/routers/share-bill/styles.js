import { makeStyles } from '@material-ui/core/styles'

export const useBillFormStyles = makeStyles({
  root: {
    paddingBottom: '50px',
  },
  formInitial: {
    maxWidth: '500px',
    margin: '42px',
  },
  button: {
    margin: '20px 0 0',
  },
  columns: {
    display: 'flex',
  },
  header: {
    padding: '4px 0 1px',
  },
  form: {
    display: 'flex',
    margin: '0 auto',
  },
  userScore: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: '0 12px',
  },
  users: {
    display: 'flex',
  },
  categoryList: {
    display: 'flex',
    marginTop: '36px',
  },
  caterory: {
    padding: '0 42px',
  },
  sums: {
    padding: '0 10px',
  },
  overline: {
    lineHeight: '42px',
  },
})
