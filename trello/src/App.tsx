import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const App = () => {
  const onDragEnd = () => {

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='one'>
        {
          (magic) => (<ul ref={magic.innerRef} {...magic.droppableProps}>
            <Draggable draggableId='first' index={0}>
              {
                (magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}><span >🔥</span>one</li>
                )
              }
            </Draggable>
            <Draggable draggableId='second' index={1}>
              {
                (magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}><span >🔥</span>two</li>
                )
              }
            </Draggable>
          </ul>)
        }
      </Droppable>
    </DragDropContext>
  );
};

export default App;