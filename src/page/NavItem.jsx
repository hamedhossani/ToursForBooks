import React, { Component } from 'react'

// Style
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const NavItemModalContent = props => {
  switch (props.modal) {
    case 'visa':
      return (
        <div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">
              Step 1: Provide us with essential details
            </Typography>
            <Typography variant="body1" component="p">
              We need to receive the order by email from the applicant with
              information as below:
            </Typography>
            <List>
              <ListItem>
                <Typography variant="body1" component="p">
                  Passport copy (PDF format is recommended){' '}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1" component="p">
                  Date of arrival Port of arrival (please choose Noi Bai
                  (Hanoi), Danang or Tan SoNhat (Ho Chi Minh City) or both
                  regions
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1" component="p">
                  Occupation{' '}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1" component="p">
                  Length of stays (one month for tourist Visa){' '}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1" component="p">
                  Place to get the Visa (usually, name of the city in your
                  country, where the most convenient Vietnam Embassy or
                  Consulate is located)
                </Typography>
              </ListItem>
            </List>
          </div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">
              Step 2: Confirm and make payment
            </Typography>
            <Typography variant="body1" component="p">
              You only need to confirm and pay the visa arrangement fee to Tours
              For Books and we will take care the rest. We accept most major
              credit cards and debit cards (Visa/ Master and American Express
              Card) and Paypal.
            </Typography>
          </div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">
              Step 3: Receive and print the approval letter
            </Typography>
            <Typography variant="body1" component="p">
              After you submit your application and payment, we will start
              processing your visa for Vietnam. After 2 working days, we will
              send you an approval letter by email. Then you just need to print
              the PDF attachment file (color preferred, but not required) and
              prepare at least 2 passport photos (4cm x 6cm).
            </Typography>
          </div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">
              Step 4: Get your visa stamp upon arrival at Vietnam international
              airports
            </Typography>
            <Typography variant="body1" component="p">
              Upon arrival at Vietnam international airports in Hanoi, Da Nang
              or Ho Chi Minh city, travelers are required to fill in Entry/exit
              form (will be emailed together with approval letter), present your
              approval letter, passport (must be valid for the next six months),
              photos, and pay for the stamping fee to get Visa stamped on your
              passport.
            </Typography>
          </div>
        </div>
      )
    case 'commute':
      return (
        <div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">Train Ticket Booking</Typography>
            <Typography variant="body1" component="p">
              Traveling by train is a popular choice with tourists coming to
              Vietnam, as you can fully enjoy the panorama view of the
              landscapes at ground level, and have a real insight of both urban
              rural areas in the country. Tours for Books covers a wide range of
              destinations and cooperates with lot of trustworthy agents to
              provide train ticket with best price guarantee. Our tour
              consultants will help you with the comprehensive services, so you
              will no longer worry about cheating or time wasting waiting on a
              long queue to buy ticket.
            </Typography>
          </div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">Air Ticket Booking</Typography>
            <Typography variant="body1" component="p">
              Almost all domestic flights take about a maximum 2-hour. Recently,
              many new routes have been added and the service has been improved
              drastically, thus more and more tourists opt for air travel in
              Vietnam. Tours For Books has been working closely with plenty of
              prestigious ticket reservation offices of the major airlines in
              Vietnam such as Vietnam Airlines, VietjetAir, JetStar etc.;
              therefore when you book air ticket with us, we can guarantee about
              the good fare for early-birds, the quick information solution in
              case there is any change in your flight booking, and the time
              consuming cost saving you will have.
            </Typography>
          </div>
          <div className={props.classes.section}>
            <Typography variant="subtitle1">Car For Rent</Typography>
            <Typography variant="body1" component="p">
              Tours For Books offers car rental service with driver. With the
              extensive routes to many famous destinations in Vietnam, you can
              either relax and enjoy the surpassing sceneries on the way or save
              your time and money. Following our motto “drive safe, drive fun”,
              our highly trained drivers - with not only good English speaking
              skilled driving but also friendly and courteous. We provide a wide
              range of high-standard vehicles including 4-seater car, 16-seater
              van, 24-seater bus, 35-seater bus 45-seater bus. Please be well
              noted that our car rental service is also supplied daily, monthly
              or in long term period with special offers.
            </Typography>
          </div>
        </div>
      )
    case 'question':
      return ''
    default:
      return <div />
  }
}

class Nav extends Component {
  render() {
    const { classes, modal } = this.props
    return (
      <div className={classes.root}>
        <NavItemModalContent classes={classes} modal={modal} />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    padding: '5%'
  },
  section: {
    marginBottom: theme.spacing.unit * 3
  }
})

export default withStyles(styles)(Nav)
