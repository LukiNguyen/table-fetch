import React, { Component } from 'react'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ColumnTable from '../components/ColumnTable'
// fake data generator

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({ 
    id: `${k}`,  
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); 
  return result;
};
 

const getItemStyle = (isDragging, draggableStyle) => ({ 
  userSelect: 'none',   
  // change background colour if dragging
  backgroundColor: isDragging ? 'transparent' : 'transparent', 
  flexFlow: 'wrap', 
  // styles apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? 'transparent' : 'transparent',
  display: 'flex', 
  flexFlow: 'nowrap',
  overflow:"auto",
}); 
export class dragList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(this.props.numberItems),
    };
    this.onDragEnd = this.onDragEnd.bind(this); 
  }    
  componentWillReceiveProps(newProps) {     
    this.setState({
        items: getItems(newProps.numberItems),
      });
 } 
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }
  render() { 
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div  ref={provided.innerRef} className="mb-5">
            <table 
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
            > 
              {this.state.items.map((item, index) => ( 
                <Draggable key={item.id} draggableId={item.id} index={index}> 
                  {(provided, snapshot) => ( 
                    <tbody
                      ref={provided.innerRef} 
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >  
                       <ColumnTable 
                          index= {item.id} 
                          ref={provided.innerRef} 
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        />
                    </tbody> 
                  )}   
                </Draggable>
              ))} 
              {provided.placeholder}
            </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default dragList
