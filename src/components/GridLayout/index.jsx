import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || []

export default class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    cols: 10,
    rowHeight: 30,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.resetLayout = this.resetLayout.bind(this)
  }

  resetLayout() {
    this.setState({
      layout: []
    })
  }

  onLayoutChange(layout) {
    saveToLS('layout', layout)
    this.setState({ layout })
    this.props.onLayoutChange(layout)
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.resetLayout}>Reset Layout</button> */}
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          cols={this.props.columns}
          isResizable={this.props.isResizable}
          containerPadding={[0, 0]}
        >
          {this.props.children}
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-profile')) || {}
    } catch (e) {
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-profile',
      JSON.stringify({
        [key]: value
      })
    )
  }
}
