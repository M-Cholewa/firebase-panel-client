import React, { Component } from 'react';


const divStyle = {
    border: '2px dotted blue',
    height: '0',
    paddingBottom: '56.25%',
    position: 'relative'
  };

  const displayState = (items) => (
            items.map(item =>(
            <div style={divStyle} key={item.id}>
                <h1>{item.name}</h1><h3>{item.surname}</h3>
                <p>id: {item.id}</p>
            </div>
        ))
  )

class Lesson1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check : "works? ",
            items : [
                {
                    id:1,
                    "name":"jhn",
                    "surname":"virtuoso"
                },
                {
                    id:2,
                    "name":"ekko",
                    "surname":"czarnuch"
                }
            ]
        }   
    }
    render() { 
        return (
        <div>    
            ukno it works {this.state.check}
            {displayState(this.state.items)}
        </div>);
    }
}
 
export default Lesson1;