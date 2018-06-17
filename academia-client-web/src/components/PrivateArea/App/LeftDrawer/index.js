import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import { spacing, typography } from 'material-ui/styles'
import { white, blue600 } from 'material-ui/styles/colors'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

const LeftDrawer = (props) => {
  const { menus, navDrawerOpen, user } = props

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14,
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        height: 45,
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444',
      },
    },
    subMenu: {
      color: 'black',
    },
  }

  const menuItem = (authority, menu, isRoot) => {
    const hasAuthority = menu.allowed ? menu.allowed.includes(authority) : true
    if (!hasAuthority) {
      return null
    }

    return (
      <MenuItem
        key={menu.key}
        style={styles.menuItem}
        primaryText={menu.text}
        leftIcon={menu.icon}
        innerDivStyle={isRoot ? {} : styles.subMenu}
        containerElement={<Link to={menu.link} />}
      />
    )
  }

  const menuWithChildren = (authority, menu) => {
    const hasAuthority = menu.allowed ? menu.allowed.includes(authority) : true
    if (!hasAuthority) {
      return null
    }

    return (
      <MenuItem
        key={menu.key}
        style={styles.menuItem}
        primaryText={menu.text}
        leftIcon={menu.icon}
        menuItems={menu.children.map(child => menuItem(authority, child, false))}
      />
    )
  }

  const { authority } = user.authorities[0]

  return (
    <Drawer
      docked
      open={navDrawerOpen}
    >
      <div style={styles.logo}>
          ABC Academia
      </div>
      <div style={styles.avatar.div}>
        <span style={styles.avatar.span}>{user.name}</span>
      </div>
      <div>
        {menus.map(menu => (menu.link ? menuItem(authority, menu, true) : menuWithChildren(authority, menu)))}
      </div>
    </Drawer>
  )
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.node,
  })).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

LeftDrawer.defaultProps = {
  navDrawerOpen: true,
}

export default LeftDrawer
