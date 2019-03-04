import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
// state = {
//     dense: false,
//     secondary: false,
//   };
const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.secondary,
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
      },
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
    textField: {
        marginLeft: '0.8rem',
        marginRight: '0.8rem', 
      },
  });

  var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                    "Gray"  :"#EFEFEF"
};
const initialState = {
 item :''
};

class ListElement extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.onSetHandle = this.onSetHandle.bind(this);
    this.onUnSetHandle = this.onUnSetHandle.bind(this);
  }
  
  handleChange(event) {
    event.preventDefault();
    var field = event.target.name;
    var value = event.target.value;

    this.setState({
      [field]: value
    });     
  };
  onSetHandle() { 
    var item =this.state.item;
    if(item === undefined || item === '') return false;
    this.props.onSetHandle(this.state.item);
    this.setState(initialState);
  }
  onUnSetHandle(item){ 
    if(item === undefined || item === '') return false;
    this.props.onUnSetHandle(item);
  }
  render() {
    return (
        <div className={styles.demo1}> 
          <Typography variant="h6" className={styles.title} >
          {this.props.title}
          </Typography>
          <div className={styles.demo}>
              <List  >
              {this.props.items.map((item, i) => {  
              return (
                  <ListItem style={{backgroundColor:bgColors.Gray}} key={i}>
                      {/* <ListItemAvatar>
                      <Avatar>
                          <FolderIcon />
                      </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText                
                      primary = {item}
                      secondary={false ? 'Secondary text' : null}
                      />
                      <ListItemSecondaryAction>   
                      <IconButton aria-label="Delete"  onClick= { () => this.onUnSetHandle(item)}>
                          <DeleteIcon style={{color:'red'}} variant="contained" />
                      </IconButton>
                      </ListItemSecondaryAction>
                  </ListItem>
                  ) 
              })}           
              </List>
              
              <TextField
                  className={styles.textField}
                  label="Item Name"
                  type="text"
                  name="item"               
                  margin="normal"
                  onChange={this.handleChange}
                  value={this.state.item}
              />
              <IconButton aria-label="Add" style={{marginTop:"35px"}}              
               onClick= { () => this.onSetHandle()}
               >
                  <span style={{fill:bgColors.Green}}>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" style={{marginTop:"30px"}}>
                        <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>								
                      
                      {/* <IconButton aria-label="Delete" >
                          <DeleteIcon style={{color:'red'}} variant="contained" />
                      </IconButton> */}
                </span>
              </IconButton>
          </div>
         </div>
    );
  }
}
export default  ListElement ;