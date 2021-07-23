import React, {Component} from 'react';
import Picker from 'react-mobile-picker';

export default class NamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        LorR: 'LEFT',
        finger: 'Middle',
        position: 'MIDI'
      }, 
      optionGroups: {
        LorR: ['LEFT', 'RIGHT'],
        finger: ['Thumb', 'Index', 'Middle', 'Ring', ' Pinky'],
        position: ['MIDI', 'BOTTOM']
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
                
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups} 
            onChange={this.handleChange}/>
        
      </div>
    );
  }
}
