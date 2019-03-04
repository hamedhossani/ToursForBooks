import React, {Component,createRef} from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {Tour,Lenghts} from '../class/Tour';

import { withFirebase } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import green from '@material-ui/core/colors/green';

import { addTour, editTour, fetchOneTourById } from '../store/action';
import SelectElement from '../utils/SelectElement';
import ListElement from '../utils/ListElement';
// import {db} from './firebase/firebase2';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: '0.8rem',
    marginRight: '0.8rem',
    //width: 200,
  },
  formControl: {
    marginLeft: theme.spacing.unit + 50,
    marginRight: theme.spacing.unit + 50,
    // margin: theme.spacing.unit,
    // minWidth: 80,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});
class TourAdd extends Component {
  constructor(props) {
    super(props);

    this.name = createRef();
    this.description = createRef();
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSetIncludes = this.handleSetIncludes.bind(this);
    this.handleUnSetIncludes = this.handleUnSetIncludes.bind(this);
    this.handleSetExcludes = this.handleSetExcludes.bind(this);
    this.handleUnSetExcludes = this.handleUnSetExcludes.bind(this);
     
    var tour = new Tour();
    this.state = props.tour || new Tour();
    //
    this.state.name = "";
    this.state.type = "";
    this.state.category = "";
    this.state.boughts = "";
    this.state.description = "";

    this.state.price.amount = "";
    this.state.price.discountAmount = "";
    this.state.price.currency = "";
    this.state.price.type = "";
    this.state.price.unit = "";

    this.state.lenghts = new Lenghts();
    this.state.lenghts.byDay = "";
    this.state.lenghts.byHour = "";

    this.state.excludes =[];
    this.state.includes =[];    
    //
    this.state.id = props.id || undefined;
    if(this.state.id !== undefined)
      this.props.dispatch(fetchOneTourById(this.state.id));
  }

  handleSuccess() {
    this.resetForm();
    this.props.onSuccess && this.props.onSuccess();
  }

  handleErrors(reason) {
    this.props.onError && this.props.onError(reason);
  }

  resetForm() {
    if (!this.name.current || !this.description.current) { return }
    //const { name, description } = Form.defaultProps;

    //this.name.current.value = name;
    //this.description.current.value = description;
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state);
    console.log('props');
    console.log(this.props);

    var tour = new Tour();
  
    tour.name = this.state.name;
    tour.type = this.state.type;
    tour.category = this.state.category;
    tour.boughts = this.state.boughts;
    tour.description = this.state.description;

    tour.price.amount = this.state.price.amount;
    tour.price.discountAmount = this.state.price.discountAmount;
    tour.price.currency = this.state.price.currency;
    tour.price.type = this.state.price.type;
    tour.price.unit = this.state.price.unit;

    tour.lenghts.byDay = this.state.lenghts.byDay;//lenghts.byDay;
    tour.lenghts.byHour = this.state.lenghts.byHour;

    tour.excludes = this.state.excludes;
    tour.includes = this.state.includes;

    console.log('tour before submit');
    console.log(tour);
    if (this.state.id === 0 || this.state.id === undefined || this.state.id === '')//add
    {
      this.props.dispatch(addTour(tour)).then((e) => {
        console.log('dispatch addTour');
      });
    } else {
      tour.id = this.state.id;
      this.props.dispatch(editTour(tour)).then((e) => {
        console.log('dispatch edit Tour');
      });
    }
    // var  result= this.props.firebase.push('tours_test', tour);
    // console.log(result);
  }
  componentWillReceiveProps(newProps) {
    console.log('Component WILL RECIEVE PROPS!')
    console.log(newProps);
    console.log('this.state');
    console.log(this.state);
    if (this.state !== newProps.tour) {
      this.setState({
        modePage: 'Edit',
        name: newProps.tour.name,
        type: newProps.tour.type || '',
        category: newProps.tour.category || '',
        boughts: newProps.tour.boughts || '',
        description: newProps.tour.description,
        price: {
          amount: (newProps.tour.price) ? newProps.tour.price.amount || '' : '',
          discountAmount: (newProps.tour.price) ? newProps.tour.price.discountAmount || '' : '',
          currency: (newProps.tour.price !== undefined) ? newProps.tour.price.currency || '' : '',
          type: (newProps.tour.price) ? newProps.tour.price.type || '' : '',
          unit: (newProps.tour.price) ? newProps.tour.price.unit || '' : ''
        },
        lenghts: {
          byDay:  (newProps.tour.lenghts !== undefined ) ? newProps.tour.lenghts.byDay  || '' : '',
          byHour: (newProps.tour.lenghts !== undefined ) ? newProps.tour.lenghts.byHour || '' : ''
        },
        excludes:(newProps.tour.excludes) ? newProps.tour.excludes  : [],
        includes:(newProps.tour.includes) ? newProps.tour.includes  : []
      });
    }

    console.log('Component WILL RECIEVE PROPS!')
    console.log(this.state);
  }
  handleChange(event) {
    event.preventDefault();
    var field = event.target.name;
    var value = event.target.value;

    if (field.includes('.')) {
      var fieldSplit = field.split(".");

      var field0 = fieldSplit[0];
      var field1 = fieldSplit[1];

      this.setState(prevState => (
        {
          ...prevState,
          [field0]: { ...prevState[field0], [field1]: value }
        }
      ));
    } else {
      this.setState({
        [field]: value
      });
    }
  };
  handleSetIncludes(item) {
    this.setState(prevState => {
      const list = prevState.includes.push(item);
      return {list};
   });
  }
  handleUnSetIncludes(item) {
    this.setState(prevState => {
      const list = prevState.includes.filter(el => el !== item );
      prevState.includes = list;
      return {list};
   });
  }  
  handleSetExcludes(item) {
    this.setState(prevState => {
      const list = prevState.excludes.push(item);
      return {list};
   });
  }
  handleUnSetExcludes(item) {
    this.setState(prevState => {
      const list = prevState.excludes.filter(el => el !== item );
      prevState.excludes = list;
      return {list};
   });
  } 

  render() {
    const { classes } = this.props;
    console.log('this.state');
    console.log(this.state);
    return (
      <Card>
        <CardContent>
          <h3>
            {(this.state.modePage === undefined || this.state.modePage === '') ? 'Add ' : this.state.modePage + ' '}
            Tour</h3>
          <hr />
          <form className={styles.container}>
            <div className="row">
              <Grid container>
                <Grid item xs={6}>
                  <div className="input-field">
                    <TextField
                      className={styles.textField}
                      label="Name"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      value={this.state.name}
                    />
                  </div>
                </Grid>          
                <Grid item xs={2}>                   
                     <SelectElement classStylesform={styles.formControl} name="Type"
                                    value={this.state.type} onChange={this.handleChange}
                                    items={["Custom","Local"]}/>
                </Grid>
                <Grid item xs={2}>
                <SelectElement classStylesform={styles.formControl} name="Category"
                                    value={this.state.category} onChange={this.handleChange}
                                    items={["Commerical","Volunteer","EcoTour"]}/> 
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    className={styles.textField}
                    label="Boughts"
                    type="number"
                    name="boughts"
                    onChange={this.handleChange}
                    margin="normal"
                    value={this.state.boughts}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={styles.textField}
                    label="Description"
                    type="text"
                    name="description"
                    onChange={this.handleChange}
                    margin="normal"
                    multiline
                    fullWidth
                    value={this.state.description}
                  />
                </Grid>
                <Grid item xs={6}>
                  <fieldset>
                    <legend>Lenght</legend>
                    <TextField
                      className={styles.textField}
                      label="Day"
                      type="text"
                      name="lenghts.byDay"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.lenghts.byDay || ''}
                    />

                    <TextField
                      className={styles.textField}
                      label="Hour"
                      type="number"
                      name="lenghts.byHour"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.lenghts.byHour || ''}
                    />
                  </fieldset>
                </Grid>
                <Grid item xs={12}>
                  <fieldset>
                    <legend>Price</legend>
                    <TextField
                      className={styles.textField}
                      label="Amount"
                      type="number"
                      name="price.amount"
                      onChange={this.handleChange}

                      value={this.state.price.amount || ''}
                    />
                    <TextField
                      className={styles.textField}
                      label="Discount Amount"
                      type="number"
                      name="price.discountAmount"
                      onChange={this.handleChange}

                      value={this.state.price.discountAmount || ''}
                    />
                    {/* <FormControl className={styles.formControl}>
                      <InputLabel htmlFor="currency">Currency</InputLabel>
                      <Select
                        value={this.state.price.currency}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'price.currency',
                          id: 'price_currency',
                        }}
                      >
                        <MenuItem value=''>None</MenuItem>
                        <MenuItem value='dollar'>Dollar</MenuItem>
                      </Select>
                    </FormControl> */}
                    <SelectElement classStylesform={styles.formControl} name="Currency"                     
                                    inputPropsName= 'price.currency'
                                    inputPropsId="price_currency"
                                    value={this.state.price.currency} onChange={this.handleChange}
                                    items={["Dollar"]}/>
                    <br />
                    <TextField
                      className={styles.textField}
                      label="Unit"
                      type="text"
                      name="price.unit"
                      onChange={this.handleChange}

                      value={this.state.price.unit || ''}
                    />

                  </fieldset>
                </Grid>
                <Grid container spacing={16}>
                  <Grid item xs={12} md={6}>
                     <ListElement title="Excludes" items={this.state.excludes}
                     onSetHandle={this.handleSetExcludes}
                     onUnSetHandle={this.handleUnSetExcludes}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <ListElement title='Includes' items={this.state.includes} 
                      onSetHandle={this.handleSetIncludes}
                      onUnSetHandle={this.handleUnSetIncludes}
                      />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {/* <Button variant="outlined" color="primary" className={styles.button} onClick={this.handleSubmit.bind(this)}>
                          Submit
                          </Button>   */}
                  <br />
                  <MuiThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" variant="outlined" onClick={this.handleSubmit.bind(this)}>
                      <SaveIcon />
                      Submit
                            </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
}

TourAdd.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
  // ,
  // onSuccess: PropTypes.func,
  // onError: PropTypes.func
}

TourAdd.defaultProps = {
  name: '',
  description: ''
}

const mapStateToProps = state => {
  const { tour } = state.AdminReducers.InitialToursReducer;
  return {
    tour
  };
};
export default connect(mapStateToProps)(TourAdd);
// export default connect(mapStateToProps,null)(withStyles(styles)(TourAdd));