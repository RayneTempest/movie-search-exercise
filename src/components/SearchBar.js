import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.searchTimer = ''
    this.handleOnUpdate = this.handleOnUpdate.bind(this)
    this.callGetResults = this.callGetResults.bind(this)
  }
  callGetResults () {
    this.props.getResults(this.props.searchText)
  }

  handleOnUpdate (event) {
    this.props.updateSearchText(event.target.value)
    if (this.searchTimer)clearTimeout(this.searchTimer)
    let ms = 300
    this.searchTimer = setTimeout(this.callGetResults, ms)
  }

  render () {
    let { searchText, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              Movie Database
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search for Movies'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={searchText}
                onChange={this.handleOnUpdate}
              />
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchBar)
