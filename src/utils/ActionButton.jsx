import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'

// Define a custom style for button
const styles = theme => ({
  button: {
    'border-radius': '50px',
    minHeight: '30px',
    alignSelf: 'center'
  },
  primary: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    padding: `0px ${theme.spacing.unit * 4}px`
  },
  secondary: {
    backgroundColor: theme.palette.common.transparent,
    color: theme.palette.primary.light,
    padding: `0px ${theme.spacing.unit * 4}px`
  },
  disabled: {
    opacity: 0.5
  }
})

// Custom Button component with variant property
function ActionButton(props) {
  const { children, classes, className, variant, onClick, disabled } = props
  return (
    <Button
      disabled={disabled}
      className={classNames(
        classes.button,
        {
          [classes.primary]: variant === 'primary',
          [classes.secondary]: variant === 'secondary'
        },
        'hide--on-print',
        className
      )}
      onClick={onClick}
      type="submit"
      classes={{
        disabled: classes.disabled
      }}
    >
      {children}
    </Button>
  )
}

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary'])
}

// Inject style to Custom Button component
export default withStyles(styles)(ActionButton)
