import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ToolBoxItem extends React.Component {
  render() {
    return (
      <div
        style={{width: '100px', height: '80px', margin: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black'}}
        onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
      >
        {this.props.item.i}
      </div>
    );
  }
}
class ToolBox extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'column', height: '150px', width: '80%', border: '2px solid black'}}>
        <span style={{marginTop: '5px'}}>Toolbox</span>
        <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
          {this.props.items.map(item => (
            <ToolBoxItem
              key={item.i}
              item={item}
              onTakeItem={this.props.onTakeItem}
            />
          ))}
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%'}}>
        <button onClick={() => this.props.onSave({ dashboard: this.props.layouts.lg })}>Save the layout</button>
      </div>
      </div>
    );
  }
}

export default class ToolboxLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 10, md: 10, sm: 10, xs: 10, xxs: 10 },
    initialLayout: [{i: 'navbar', w: 10, h: 2, x: 0, y: 0, static: true}],
    initialToolbox: [{i: 'blog', w: 6, h: 18, x: 2, y: 0, minW: 6, maxW: 8}, {i: 'twitter', w: 2, h: 8, x: 4, y: 0, minW: 1, maxW: 2, minH: 8, maxH: 10, isResizable: true}],
    containerPadding: [0, 0],
    margin: [0, 0]
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.dashboard || this.props.initialLayout },
    toolbox: { lg: this.props.initialToolbox }
  };

  componentDidMount() {
    this.setState({ mounted: true });
    this.setState({ toolbox: { lg: this.generateInitialToolbox() }})
  }

  mapIndexToName(index) {
    if (index === 'blog') return 'Blog'
    else if (index === 'navbar') return 'Navigation Bar'
    else if (index === 'twitter') return 'Twitter Feed'
  }

  generateInitialToolbox() {
    const actualToolbox = _.without(this.props.initialToolbox.map(toolboxItem => {
      let isToolboxItemInLayout = false
      this.state.layouts.lg.forEach(layoutItem => {
        if (layoutItem.i === toolboxItem.i) isToolboxItemInLayout = true
      })

      if (!isToolboxItemInLayout) return toolboxItem
    }), undefined)

    return actualToolbox
  }

  generateDOM() {
    return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
      return (
        <div key={l.i} data-grid={l} style={{border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{this.mapIndexToName(l.i)}{!l.static && <p style={{cursor: 'pointer', justifySelf: 'flex-end', marginLeft: 'auto', marginRight: '10px', marginTop: '10px', marginBottom: 'auto', border: '1px solid black'}} onClick={this.onPutItem.bind(this, l)}>x</p>}</div>
      )
    })
  }

  onBreakpointChange = breakpoint => {
    this.setState(prevState => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]:
          prevState.toolbox[breakpoint] ||
          prevState.toolbox[prevState.currentBreakpoint] ||
          []
      }
    }));
  };

  onTakeItem = item => {
    this.setState(prevState => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i)
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item
        ]
      }
    }));
  };

  onPutItem = item => {
    this.setState(prevState => {
      console.log(prevState.layouts[
        prevState.currentBreakpoint
      ].filter(({ i }) => i !== item.i))
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item
          ]
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i)
        }
      };
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: [] }
    });
  };

  render() {
    this.generateInitialToolbox()
    return (
      <div>
        <ToolBox
          items={this.state.toolbox[this.state.currentBreakpoint] || []}
          onTakeItem={this.onTakeItem}
          layouts={this.state.layouts}
          onSave={this.props.onSave}
        />

        <ResponsiveReactGridLayout
          {...this.props}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          isBounded={true}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}