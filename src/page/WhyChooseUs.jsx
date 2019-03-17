import React, { Component } from 'react'

// Style
import breakpoints from '../theme/breakpoints'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

class WhyChooseUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: 'panel1'
    }
  }
  handleClick(panel) {
    this.state.expanded === panel
      ? this.setState({
          expanded: null
        })
      : this.setState({
          expanded: panel
        })
  }
  render() {
    const { classes } = this.props
    const { expanded } = this.state
    return (
      <div className={classes.root} id="whyChooseUs">
        <Typography
          variant="h2"
          color="primary"
          style={{ textAlign: 'center' }}
        >
          Why Choose Us?
        </Typography>
        <ExpansionPanel
          expanded={expanded === 'panel1'}
          onClick={e => this.handleClick('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Comprehensive Services</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">
              When you book a tour with Tours For Books, all services will be
              well-arranged from the moment you arrive the airport until the
              time the tour ends. You will be fully-equipped with our company's
              phone to keep track of your itinerary and to receive 24/24 instant
              help from our professional tour consultants so that you can rest
              assured.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel2'}
          onClick={e => this.handleClick('panel2')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Customer Focus</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">
              Tours For Books is aligned towards high-quality travel and close
              customer relations, which together provide the perfect conditions
              for a good trip. We are dedicated to service excellence that gains
              us customer continuity, and we believe that our customers will
              have the best travel experience if they feel knowledgeable,
              confident and carefree.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel3'}
          onClick={e => this.handleClick('panel3')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Responsible Travel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">
              Profits generated from the tours will be contributed to our
              education fund to provide books and scholarship to underprivileged
              children. By choosing Tours for Books, tourists truely help us to
              improve lives by buying books and providing scholarships to
              underprivileged children.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    padding: '5%'
  },
  [`@media (min-width: ${breakpoints['md']}px)`]: {
    root: {
      padding: '5% 10%'
    }
  }
})

export default withStyles(styles)(WhyChooseUs)
