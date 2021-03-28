import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import _ from 'lodash'

const ReactGridLayout = WidthProvider(RGL);

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
      if (l.y < 0) l.y = 0
      return (
        <div key={l.i} data-grid={l} style={{backgroundColor: 'white', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}></div>
      )
    })
  }


  render() {
    return (
      <div>
        {/* <button onClick={this.resetLayout}>Reset Layout</button> */}
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
      </div>
    );
  }
}