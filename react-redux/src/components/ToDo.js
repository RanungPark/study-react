import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
import { deleteToDo } from '../modules/todo';
import { deleteToDoToolkit } from '../modules/todoToolkit';

// const ToDo = ({text, onBtnClick, id}) => {
const ToDo = ({text, id, type}) => {
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(
      deleteToDo(id)
    )
  }

  const onToolKitBtnClick = () => {
    dispatch(
      deleteToDoToolkit(id)
    )
  }

  return (
    <>  
      {
      type === 'nomal' && 
        <li>
          <Link to={`/${id}`}>
          {text} 
          </Link>
          <button onClick={onBtnClick}>DEL</button>
        </li>
      }
      {
      type === 'toolkit' && 
        <li>
          <Link to={`/${id}`}>
          {text} 
          </Link>
          <button onClick={onToolKitBtnClick}>TOOLKIT_DEL</button>
        </li>
      }
    </>
  );
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onBtnClick : () => {
//       dispatch(actionCreators.deleteToDo(ownProps.id))
//     }
//   }
// }

// export default connect(null, mapDispatchToProps) (ToDo);
export default ToDo;