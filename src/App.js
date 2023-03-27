import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import MainAside from './components/Aside/MainAside/MainAside';
import InputSample from './pages/InputSample/InputSample';
import UserList from './pages/UserList/UserList';
import { reset } from './styles/Global/reset';

function Test1() {
  return (<h1>test1</h1>)
}

function Test2() {
  return (<h1>test2</h1>)
}

function App() {
  return (
    <>
      <Global styles={reset}/>
      <MainAside />
      <Routes>
        <Route path="/t1" Component={Test1}/>
        <Route path="/t2" Component={Test2}/>
        <Route path="/sample/input/1" Component={InputSample}/>
        <Route path="/users" Component={UserList}/>
      </Routes>
    </>
  );
}

export default App;
