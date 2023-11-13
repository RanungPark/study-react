import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Board = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IDragDropBoardProps {
  toDos: string[];
  boardId: string;
}

function DragDropBoard({ toDos, boardId }: IDragDropBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Board ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DragabbleCard key={toDo} index={index} toDo={toDo} />
          ))}
          {magic.placeholder}
        </Board>
      )}
    </Droppable>
  );
}
export default DragDropBoard;