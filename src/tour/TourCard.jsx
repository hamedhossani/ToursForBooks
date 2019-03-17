import React, { Component } from 'react'
import TourCardMediaContent from './TourCardMediaContent'

// Style
import breakpoints from '../theme/breakpoints'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

// Image
import MaterialIcon from '../utils/MaterialIcon'

const styles = theme => ({
  card: {
    maxWidth: '100%',
    position: 'relative'
  },
  cardHeader: {
    position: 'relative',
    minHeight: 340,
    [`@media (min-width: ${breakpoints['md']}px)`]: {
      minHeight: 400
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  contactButton: {
    marginLeft: '16px'
  },
  price: {
    display: 'flex',
    marginLeft: '16px',
    '& h1 + h1': {
      marginLeft: theme.spacing.unit
    }
  },
  shareButton: {
    color: 'white',
    position: 'absolute',
    top: '3px',
    right: '3px'
  },
  tag: theme.custom.tag,
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

class TourCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      tooltip: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }
  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded })
  }
  // window.fbAsyncInit = function() {
  // FB.init({
  //   appId            : '1678638095724206',
  //   autoLogAppEvents : true,
  //   xfbml            : true,
  //   version          : 'v2.10'
  // });
  //to-do: update fb messenger

  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "https://connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));
  // }
  render() {
    const { classes, tour } = this.props
    return (
      <>
        <Card className={classes.card}>
          <div className={classes.cardHeader}>
            <CardActionArea>
              <TourCardMediaContent tour={tour} />
            </CardActionArea>
            <CardActions disableActionSpacing>
              {tour.type === 'local' ? (
                <div className={classes.price}>
                  <Typography variant="h5" color="primary">
                    ${tour.price.amount}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${tour.price.discountAmount}
                  </Typography>
                </div>
              ) : (
                <div className={classes.contactButton}>
                  <div
                    className="fb-messengermessageus"
                    data-messenger_app_id="133018877378513"
                    data-page_id="1726420851006429"
                    data-color="blue"
                    data-size="large"
                  />
                </div>
              )}
              <div className={classes.flexGrow} />
              <IconButton onClick={this.handleExpandClick} color="primary">
                {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </CardActions>
          </div>
          {tour.boughts > 0 ? (
            <div className={[classes.tag, classes.topLeft].join(' ')}>
              <Typography variant="body2">{tour.boughts}+ bought</Typography>
            </div>
          ) : (
            ''
          )}
        </Card>
        <Divider light />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              {tour.highlights.map(hl => (
                <ListItem disableGutters key={hl.icon}>
                  <ListItemAvatar>
                    <MaterialIcon iconName={hl.icon} />
                  </ListItemAvatar>
                  <ListItemText primary={hl.name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
        {/**<IconButton className={classes.shareButton} aria-label="Share">
          <ShareIcon />
        </IconButton>
        **/}
      </>
    )
  }
}

export default withStyles(styles)(TourCard)
