import React from 'react';
import DefaultPage from '../component/default/default';
import ToDoList from '../component/listComponent/todolist';

const Main = ({islogged ,usersData}) => {
  return (
    <div>
      {(!islogged || usersData==null)?<DefaultPage/>:
        <ToDoList usersData={usersData} />}
    </div>
  );
}

export default Main;
