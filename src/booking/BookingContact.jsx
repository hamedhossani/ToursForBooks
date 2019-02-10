import React, { Component } from 'react';

// Style
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

// Component

class BookingContact extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(e) {
    e.preventDefault()
    this.props.onChange({ type: 'contact', fields: {[e.target.name]: e.target.value }})
  }
  
  render() {
    const { classes } = this.props
    const { name, email, phone } = this.props
    return (
      <div>
            <FormGroup className={classes.container} noValidate>
              <TextField
                type='text'
                label='Full Name'
                name='name'
                value={name}
                className={classes.textField}
                onChange={this.handleChange}
                required
              />
              <TextField
                type='tel'
                label='Phone Number'
                name='phone'
                value={phone}
                onChange={this.handleChange}
                className={classes.textField}
                required
              />
              <TextField
                type='email'
                label='Email'
                name='email'
                value={email}
                onChange={this.handleChange}
                className={classes.textField}
                required
              />
            </FormGroup>
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  textField: {
    marginBottom: theme.spacing.unit * 3,
    width: 200,
  },
});

export default withStyles(styles)(BookingContact);