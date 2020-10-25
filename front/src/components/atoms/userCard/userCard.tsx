import React from 'react'
import {
    Typography,
    Avatar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    withStyles,
    Button,
    IconButton,
} from '@material-ui/core'
import { cardStyles } from './styles'

interface Props {
    name: string;
    email: string;
    lygrylity: number;
    classes: any;
}

export const UserCard = withStyles(cardStyles)(({
    name,
    email,
    lygrylity,
    classes,
}: Props) => (
        <Card
            classes={{ root: classes.card }}
        >
            <CardHeader
                avatar={
                    (
                        <Avatar aria-label="Recipe">
                            R
                        </Avatar>
                    )
                }
                action={
                    (
                        <IconButton>
                            stub
                        </IconButton>
                    )
                }
                title={name}
                subheader={email}
            />
            {/* <div style={{ padding: '0 20px' }}>
                <Avatar alt="Remy Sharp" className={classes.bigAvatar} />
            </div> */}
            <CardContent>
                <Typography paragraph>{`You have ${lygrylity} lygryls`}</Typography>
                <Typography paragraph>Your rank is &quot;Newbie&quot;</Typography>
            </CardContent>
            <CardActions>
                <Button>Overview</Button>
                <Button>More info</Button>
            </CardActions>
        </Card>
    ))