import React from 'react'
 
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

function  SetImageUrl(imageName){
  let imgUrl = `https://storage.googleapis.com/bloggy-170620.appspot.com/tourImg/${imageName}.jpg`
  return imgUrl;
}
const styles = theme => ({ 
  chip: {
    margin: theme.spacing.unit
  }
})
const TourListItem =({classes,tour,OpenTourDeleteDialog }) => {
  
          return (
            <ListItem alignitems="flex-start"  className={classes.listItem} >                   
                      <ListItemAvatar>
                        <Avatar size="x-large" alt={tour.name} src={tour.images && SetImageUrl(tour.images[0])} />
                      </ListItemAvatar>                  
                      <ListItemText
                        primary={tour.name}
                        secondary={
                          <React.Fragment>
                             <Typography component="span" color="textPrimary">
                              Category [ {tour.category} ]
                              </Typography> 
                             {/* <Chip
                                label={tour.category}
                                color="primary"
                                className={classes.chip}
                                />
                                <br/> */}
                            {(tour.boughts >0 )?  
                              <Typography component="span" color="textPrimary">
                              Boughts [ {tour.boughts} ]
                              </Typography>  
                              :''                     
                            }  
                            {tour.description}
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                         {/* <IconButton 
                          component={'link'}
                          to={"/admin/tour/"+tour.id}
                          >                         
                            <EditIcon   style={{color:'orange'}}/>
                         </IconButton> */}
                         <Link to={"/admin/tour/"+tour.id} color="inherit">Edit</Link>
                         {/* <IconButton aria-label="Delete">                                           */}
                                <DeleteIcon style={{color:'red'}} variant="contained"
                                   onClick= { () => OpenTourDeleteDialog(tour)}
                                />                                  
                         {/* </IconButton> */}
                      </ListItemSecondaryAction>
            </ListItem>
          );
          }
export default TourListItem;