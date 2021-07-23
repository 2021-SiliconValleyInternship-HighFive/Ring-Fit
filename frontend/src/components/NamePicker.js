import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-mobile-picker';

export default class NamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        LorR: 'LEFT',
        finger: 'Middle',
        position: 'FIRST'
      }, 
      optionGroups: {
        LorR: ['LEFT', 'RIGHT'],
        finger: ['Thumb', 'Index', 'Middle', 'Ring', ' Pinky'],
        position: ['FIRST', 'SECOND']
      }
    };
  }

  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
    console.log(name, value);
    this.props.onChangeUser(name, value)
  };


  render() {
    const {optionGroups, valueGroups} = this.state;
    return (
      <div className="example-container">

        <button onClick={this.props.onChangeUser}> test </button>
        
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups} 
            onChange={this.handleChange}/>
        
      </div>
    );
  }
}
