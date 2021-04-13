import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import _ from 'lodash'
import styled from 'styled-components'

import Blog from '../../../components/Blog'
import TwitterFeed from '../../../components/TwitterFeed'
import ContactForm from '../../../components/ContactForm'
import GroupMembers from '../../../components/GroupMembers'

const ReactGridLayout = WidthProvider(RGL)

const Container = styled.div`
  padding: 0 2%;
`

export default class ResearcherHomeGrid extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    cols: 10,
    rowHeight: 30
  }

  constructor(props) {
    super(props);

    this.state = {
      layout: this.props.dashboard
    }

    this.resetLayout = this.resetLayout.bind(this)
  }

  resetLayout() {
    this.setState({
      layout: []
    })
  }

  generateDOM() {
    const layoutToPrint = this.state.layout.filter(item => item.i !== 'navbar')

    return _.map(layoutToPrint, l => {
      l.static = true
      l.isResizable = false
      l.y -= 2
      l.h = 20
      if (l.y < 0) l.y = 0
      if (l.i === 'blog') l.h = 20
      if (l.i === 'group') l.h = 9
      if (l.i === 'contact') l.h = 10

      return (
        <div key={l.i} data-grid={l}>
          {l.i === 'blog' && <Blog />}
          {l.i === 'twitter' && <TwitterFeed />}
          {l.i === 'group' && <GroupMembers team={this.props.team}/>}
          {l.i === 'contact' && <ContactForm />}
        </div>
      )
    })
  }

  render() {
    return (
      <Container style={{padding: '0 2%'}}>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          cols={this.props.columns}
          containerPadding={[0, 0]}
          useCSSTransforms={true}
          isDraggable={false}
          isResizable={false}
          isDroppable={false}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </Container>
    );
  }
}