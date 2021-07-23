import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-mobile-picker';

export default class NamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        title: 'LEFT',
        firstName: 'Middle',
        secondName: 'FIRST'
      }, 
      optionGroups: {
        title: ['LEFT', 'RIGHT'],
        firstName: ['Thumb', 'Index', 'Middle', 'Ring', ' Pinky'],
        secondName: ['FIRST', 'SECOND']
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
  };

  render() {
    const {optionGroups, valueGroups} = this.state;

    return (
      <div className="example-container">
        
   
        
        
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={this.handleChange} />
        
      </div>
    );
  }
}
