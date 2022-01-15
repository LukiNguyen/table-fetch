import React, { Component } from 'react'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ColumnTable from '../components/ColumnTable'
import {reOrder} from '../extensions/reOrder'
import { fakeData } from '../extensions/fakeData' 

const getItemStyle = (isDragging, draggableStyle) => ({ 
  userSelect: 'none',    
  backgroundColor: isDragging ? 'transparent' : 'transparent', 
  flexFlow: 'wrap',  
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
      items: fakeData(36),
    };
    this.onDragEnd = this.onDragEnd.bind(this); 
  }   
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reOrder(
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
