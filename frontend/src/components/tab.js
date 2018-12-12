import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabPerso extends React.Component {
  state = {
    value: 2,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    var tabsItens = <h1>Aguarde Carregando</h1>
    const { categories } = this.props
     if (typeof categories !== 'undefined'){
      tabsItens = <div>
        {categories.map((category) => (
                  <Tab label={category.name}></Tab>
                ))}
     </div>
    }
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <div>
            {this.props.map()}
          </div>
          tabsItens
        </Tabs>
      </Paper>
    );
  }
}
function mapStateToProps (state) {
  return {  
    categories:state.categoryReducer.categories
  }
}
export default connect (mapStateToProps)(TabPerso)
