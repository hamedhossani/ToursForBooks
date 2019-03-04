import React from 'react';
import { withRouter } from 'react-router-dom'; 
 
import PropTypes from 'prop-types';

 
// import { withStyles } from '@material-ui/core/styles';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const SelectElement = props =>   
    <FormControl className={props.classStylesform}>
        <InputLabel htmlFor={props.name}>{props.name}</InputLabel>
        <Select
            value={props.value}
            onChange={props.onChange}
            inputProps={{
            name: (props.inputPropsName || props.name).toLowerCase(),
            id:   (props.inputPropsId || props.name).toLowerCase(),
            }} >
            <MenuItem value=""><em>None</em></MenuItem> 
            {props.items.map((item, i) => {  
            return (<MenuItem key={i} value={(item).toLowerCase()}>{item}</MenuItem>) 
            })}
        </Select>
    </FormControl> 

export default  SelectElement ;