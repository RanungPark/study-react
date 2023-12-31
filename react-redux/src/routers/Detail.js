import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const id = useParams().id
  const {toDos} = useSelector(({todo}) => ({
    toDos : todo.toDos
  }))
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id));
  return (
    <div>
      {toDo?.text}
      <div>
      Created at: {toDo?.id}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {toDos : state}
// }

// export default connect(mapStateToProps) (Detail);
export default Detail;