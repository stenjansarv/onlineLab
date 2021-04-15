import React from 'react'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import styled from 'styled-components'
import { message } from 'antd'
const ResponsiveReactGridLayout = WidthProvider(Responsive)

const SaveButton = styled.button`
  width: 50%;
  min-height: 40px;
  background-color: rgb(252, 122, 87);
  border: none;
  border-radius: 10px;
  color: white;

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 3px 15px 0px rgba(252, 122, 87, 0.7);
  }
`

const BlogItem = styled.div`
  background-color: ${props => {
    if (props.item === 'blog') return 'blue'
    else if (props.item === 'navbar') return 'lightgray'
    else if (props.item === 'twitter') return 'lightblue'
    else if (props.item === 'contact') return 'coral'
    else if (props.item === 'group') return 'purple'

  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const RemoveButton = styled.div`
  cursor: pointer;
  justify-self: flex-end;
  margin: 10px 10px auto auto;
  border: 1px solid red;
  background-color: red;
  color: white;
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
`

class ToolBoxItem extends React.Component {
  mapIndexToName(index) {
    if (index === 'blog') return 'Blog'
    else if (index === 'navbar') return 'Navigation Bar'
    else if (index === 'twitter') return 'Twitter Feed'
    else if (index === 'contact') return 'Contact Me'
    else if (index === 'group') return 'Group Members'
  }
  
  render() {
    return (
      <div
        style={{width: '100px', height: '80px', margin: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black'}}
        onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
      >
        {this.mapIndexToName(this.props.item.i)}
      </div>
    )
  }
}
class ToolBox extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'column', height: '150px', width: '80%'}}>
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
        <SaveButton onClick={() => { this.props.onSave({ dashboard: this.props.layouts.lg || this.props.layouts.md }); message.success('Successfully saved the layout.'); }}>Save the layout</SaveButton>
      </div>
      </div>
    );
  }
}

export default class ToolboxLayout extends React.Component {
  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 10, md: 10, sm: 10, xs: 10, xxs: 10 },
    initialLayout: [{i: 'navbar', w: 10, h: 2, x: 0, y: 0, static: true}],
    initialToolbox: [{i: 'blog', w: 6, h: 18, x: 0, y: 2, minW: 6, maxW: 8}, {i: 'twitter', w: 2, h: 18, x: 6, y: 2, minW: 1, maxW: 2}, {i: 'contact', w: 2, h: 9, x: 0, y: 2, minW: 1, maxW: 2}, {i: 'group', w: 2, h: 9, x: 0, y: 12, minW: 1, maxW: 2}],
    containerPadding: [0, 0],
    margin: [0, 0]
  }

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: { lg: this.props.dashboard.length < 1 ? this.props.dashboard.concat(this.props.initialLayout) : this.props.dashboard },
    toolbox: { lg: this.props.initialToolbox }
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.setState({ toolbox: { lg: this.generateInitialToolbox() }})
  }

  mapIndexToName(index) {
    if (index === 'blog') return 'Blog'
    else if (index === 'navbar') return 'Navigation Bar'
    else if (index === 'twitter') return 'Twitter Feed'
    else if (index === 'contact') return 'Contact Me'
    else if (index === 'group') return 'Group Members'
  }

  generateInitialToolbox() {
    const actualToolbox = _.without(this.props.initialToolbox.map(toolboxItem => {
      let isToolboxItemInLayout = false
      const layouts = this.state.layouts.lg || this.state.layouts.md
      layouts.forEach(layoutItem => {
        if (layoutItem.i === toolboxItem.i) isToolboxItemInLayout = true
      })

      if (!isToolboxItemInLayout) return toolboxItem
    }), undefined)

    return actualToolbox
  }

  generateDOM() {
    return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
      if (l.y > 18) l.y = 0
      return (
        <BlogItem item={l.i} key={l.i} data-grid={l}>{!l.static && <RemoveButton onClick={this.onPutItem.bind(this, l)}>x</RemoveButton>}<h2 style={{justifySelf: 'flex-end'}}>{this.mapIndexToName(l.i)}</h2></BlogItem>
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
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={true}
          isBounded={true}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}