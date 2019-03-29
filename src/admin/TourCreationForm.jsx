import React, { Component } from 'react'
import { connect } from "react-redux";
// Style
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import ListElement from './utils/ListElement'

import { fetchOneTourById, addTour, editTour } from '../tour/action'

const InitialTourData = () => {
  return {
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
  };
}

class TourCreationForm extends Component {

  constructor(props) {
    super(props);
    this.handleSetIncludes = this.handleSetIncludes.bind(this);
    this.handleUnSetIncludes = this.handleUnSetIncludes.bind(this);
    this.handleSetExcludes = this.handleSetExcludes.bind(this);
    this.handleUnSetExcludes = this.handleUnSetExcludes.bind(this);

    this.state = {
      currentTour: InitialTourData()
    }
    console.log('props tour add');
    console.log(props);
    if (this.props.id !== undefined)
      this.props.dispatch(fetchOneTourById(this.props.id));
  }
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps newProps');
    console.log(newProps);
    if (newProps.id !== undefined) {
      var tour = newProps.tour;
      this.setState({
        currentTour: {
          activities: tour.activities || [],
          boughts: tour.boughts || 0,
          description: tour.description || '',
          excludes: tour.excludes || [],
          highlights: tour.highlights || [],
          id: tour.id,
          images: tour.images || [],
          includes: tour.includes || [],
          lengths: {
            byDay: (tour.lengths) ? tour.lengths.byDay || '' : '',
            byHour: (tour.lengths) ? tour.lengths.byHour || 0 : 0
          },
          name: tour.name || '',
          price: {
            amount: (tour.price) ? tour.price.amount || 0 : 0,
            discountAmount: (tour.price) ? tour.price.discountAmount || 0 : 0,
            currency: (tour.price !== undefined) ? tour.price.currency || 'dollar' : 'dollar',
            type: (tour.price) ? tour.price.type || 'adult' : 'adult',
            unit: (tour.price) ? tour.price.unit || 'passenger' : 'passenger'
          },
          type: tour.type || '',
          category: tour.category || ''
        }
      });
    }
  }
  handleChange = name => event => {
    const props = name.split('.')
    if (props.length > 2) {
      console.log('Error: Deep Object')
      return
    }
    var val= event.target.value;
    if (props.length === 2) {
        this.setState(prevState => (
        {currentTour:{
          ...prevState.currentTour,
          [props[0]]: { [props[1]]: val }
          }
        }
      ));
    } else {      
      this.setState(prevState => (
        {currentTour:{
          ...prevState.currentTour,
          [name]:val
          }
        }
      ));
    }
  }
  handleSetIncludes(item) {
    this.setState(prevState => {
      const list = prevState.currentTour.includes.push(item);
      return { list };
    });
  }
  handleUnSetIncludes(item) {
    this.setState(prevState => {
      const list = prevState.currentTour.includes.filter(el => el !== item);
      prevState.currentTour.includes = list;
      return { list };
    });
  }
  handleSetExcludes(item) {
    this.setState(prevState => {
      const list = prevState.currentTour.excludes.push(item);
      return { list };
    });
  }
  handleUnSetExcludes(item) {
    this.setState(prevState => {
      const list = prevState.currentTour.excludes.filter(el => el !== item);
      prevState.currentTour.excludes = list;
      return { list };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    var tour = InitialTourData();
    tour.id = this.state.currentTour.id;
    tour.name = this.state.currentTour.name;
    tour.type = this.state.currentTour.type;
    tour.boughts = this.state.currentTour.boughts;
    tour.description = this.state.currentTour.description;

    tour.price.amount = this.state.currentTour.price.amount;
    tour.price.discountAmount = this.state.currentTour.price.discountAmount;
    tour.price.currency = this.state.currentTour.price.currency;
    tour.price.type = this.state.currentTour.price.type;
    tour.price.unit = this.state.currentTour.price.unit;

    tour.lengths.byDay = this.state.currentTour.lengths.byDay;
    tour.lengths.byHour = this.state.currentTour.lengths.byHour;

    tour.excludes = this.state.currentTour.excludes;
    tour.includes = this.state.currentTour.includes;

    console.log('tour before submit');
    console.log(tour);
    //this.props.id === undefined ? this.props.addTour : this.props.editTour
    if (this.props.id === undefined)//add
    {
      this.props.dispatch(addTour(tour)).then((e) => {
        console.log('dispatch addTour');
      });
    } else {
      this.props.dispatch(editTour(tour)).then((e) => {
        console.log('dispatch edit Tour');
      });
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
              value={this.state.currentTour.lengths.byDay}
              onChange={this.handleChange('lengths.byDay')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="lengthsByHour"
              label="lengthsByHour"
              value={this.state.currentTour.lengths.byHour}
              onChange={this.handleChange('lengths.byHour')}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="boughts"
              label="boughts"
              value={this.state.currentTour.boughts}
              onChange={this.handleChange('boughts')}
              margin="normal"
              fullWidth
              type="number"
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

        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <ListElement title="Excludes" items={this.state.currentTour.excludes}
              onSetHandle={this.handleSetExcludes}
              onUnSetHandle={this.handleUnSetExcludes}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ListElement title='Includes' items={this.state.currentTour.includes}
              onSetHandle={this.handleSetIncludes}
              onUnSetHandle={this.handleUnSetIncludes}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              onClick={this.handleSubmit.bind(this)}
              disabled={(this.props.isAnthenticated !== true)}
            >
              {this.props.id === undefined ? 'Add Tour' : 'Edit Tour'}
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

//export default withStyles(styles)(TourCreationForm)
const mapStateToProps = state => {
  console.log('tour edit mapStateToProps state');
  console.log(state);
  // const {  message, messageOpen }  = state.MessageReducer.CurrentMessageReducer ; 
  const { tour } = state.ToursReducer.CurrentToursReducer;

  return {
    tour: tour[0] || InitialTourData()
  };
};
//  export default enhance(TourAdd);
export default withStyles(styles)(connect(mapStateToProps)(TourCreationForm));
