import React, { Component } from 'react'
import Icon, { IconSize } from '../Icon/Icon'
import style from './Actions.style'

export type ActionName = 'add' |
  'view' |
  'visibility' |
  'edit' |
  'import' |
  'export' |
  'delete' |
  'complete'

type ActionIcons = Record<ActionName, string>
type ScopeName = 'topic' | 'note'
type ScopeActions = Record<ScopeName, ActionName[]>
type ScopeIconSizes = Record<ScopeName, IconSize>

interface ActionsProps {
  id: number
  scope: ScopeName
  onClick: (action: ActionName, id: number) => void
}

export default class Actions extends Component<ActionsProps> {
  actionIcons: ActionIcons = {
    add: 'add',
    view: 'eye',
    visibility: 'eye-off',
    edit: 'pencil',
    import: 'download',
    export: 'upload',
    delete: 'delete-bin-6',
    complete: 'check'
  }

  scopeActions: ScopeActions = {
    topic: ['add', 'visibility', 'edit', 'import', 'export', 'delete'],
    note: ['complete', 'edit', 'delete']
  }

  scopeIconSizes: ScopeIconSizes = {
    topic: 'medium',
    note: 'regular'
  }

  action (action: ActionName, iconSize: IconSize) {
    const icon = this.actionIcons[action]
    const handleClick = () => this.props.onClick(action, this.props.id)
    return (
      <div
      className={style.action}
      key={action}>
        <Icon
          name={icon}
          size={iconSize}
          onClick={handleClick} />
      </div>
    )
  }

  get actions () {
    const { scope } = this.props
    const actions = this.scopeActions[scope]
    const iconSize = this.scopeIconSizes[scope]
    return actions.map(action => this.action(action, iconSize))
  }

  render () {
    return (
      <div className={style.actions}>
        {this.actions}
      </div>
    )
  }
}
