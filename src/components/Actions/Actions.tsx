import React, { Component } from 'react'
import Icon from '../Icon/Icon'
import style from './Actions.style'

export type ActionName = 'add' |
  'view' |
  'hide' |
  'edit' |
  'import' |
  'export' |
  'delete' |
  'complete'
type ActionIcons = Record<ActionName, ActionIcon>
type ActionsScope = 'topic' | 'note'
type ActionScopeActions = Record<ActionsScope, ActionName[]>

interface ActionIcon {
  name: ActionName
  icon: string
}

interface ActionsProps {
  id: number
  scope: ActionsScope
  onClick: (action: ActionName, id: number) => void
}

export default class Actions extends Component<ActionsProps> {
  icons: ActionIcons = {
    add: { name: 'add', icon: 'add' },
    view: { name: 'view', icon: 'eye' },
    hide: { name: 'hide', icon: 'eye-off' },
    edit: { name: 'edit', icon: 'pencil' },
    import: { name: 'import', icon: 'download' },
    export: { name: 'export', icon: 'upload' },
    delete: { name: 'delete', icon: 'delete-bin-6' },
    complete: { name: 'complete', icon: 'check' }
  }

  scopeActions: ActionScopeActions = {
    topic: ['add', 'hide', 'edit', 'import', 'export', 'delete'],
    note: ['complete', 'edit', 'delete']
  }

  get actions () {
    const { scope } = this.props
    const actions = this.scopeActions[scope]
    return actions.map(action => {
      const icon = this.icons[action]
      const size = (scope === 'topic') ? 'medium' : 'regular'
      const handleClick = () => this.props.onClick(action, this.props.id)
      return (
        <div
          className={style.action}
          key={action}>
          <Icon
            name={icon.icon}
            size={size}
            onClick={handleClick} />
        </div>
      )
    })
  }

  render () {
    return (
      <div className={style.actions}>
        {this.actions}
      </div>
    )
  }
}
