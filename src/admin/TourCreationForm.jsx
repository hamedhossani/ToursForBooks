import React, { Component } from 'react'

// Style
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

class TourCreationForm extends Component {
  state = {
    currentTour: {
      activities: [],
      boughts: 0,
      description: '',
      excludes: [],
      highlights: [],
      id: 0,
      images: [],
      includes: [],
      lengths: {
        byDay: '',
        byHour: 0
      },
      name: '',
      price: {
        amount: 0,
        currency: 'dollar',
        discountAmount: 0,
        type: 'adult',
        unit: 'passenger'
      },
      type: '',
      category: ''
    }
  }
  handleChange = name => event => {
    const props = name.split('.')
    if (props.length > 2) {
      console.log('Error: Deep Object')
      return
    }
    if (props.length === 2) {
      this.setState({ [props[0]]: { [props[1]]: event.target.value } })
    } else {
      this.setState({ [name]: event.target.value })
    }
  }
  render() {
    const { classes } = this.props
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              value={this.state.currentTour.name}
              onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              value={this.state.currentTour.description}
              onChange={this.handleChange('description')}
              margin="normal"
              fullWidth
              multiline
              rows="3"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              id="category"
              label="category"
              value={this.state.currentTour.category}
              onChange={this.handleChange('category')}
              margin="normal"
              fullWidth
            >
              {['Commercial', 'Ecotour', 'Volunteer'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="lengthsByDay"
              label="lengthsByDay"
              value={this.state.currentTour.lengthsByDay}
              onChange={this.handleChange('lengthsByDay')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="lengthsByHour"
              label="lengthsByHour"
              value={this.state.currentTour.lengthsByHour}
              onChange={this.handleChange('lengthsByHour')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="bought"
              label="bought"
              value={this.state.currentTour.bought}
              onChange={this.handleChange('bought')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="priceAmount"
              label="priceAmount"
              value={this.state.currentTour.price.amount}
              onChange={this.handleChange('price.amount')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="priceDiscountAmount"
              label="priceDiscountAmount"
              value={this.state.currentTour.price.discountAmount}
              onChange={this.handleChange('price.discountAmount')}
              margin="normal"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              onClick={this.props.addTour}
              disabled={!this.props.isAuthenticated}
            >
              Add Tour
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const styles = theme => ({
  container: {}
})

export default withStyles(styles)(TourCreationForm)
