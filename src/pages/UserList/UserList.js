/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';

const UserList = () => {

    // 컴포넌트가 렌더링할때 요소가 보여지면 useEffect가 실행됨
    // 요소하나 / 배열 하나
    useEffect(() => {
        console.log("컴포넌트 렌더링");
    }, []);

    // user 초기값 정의
    const user = {
        id: 0,
        usernmae: '',
        password: '',
        name: '',
        email: '',
        modifyFlag: false
    }

    // user id값 자동증가 시키기 위해서 생성 1부터 시작, useRef도 useState처럼 상태 감지지
    const userIndex = useRef(1);
    // 상태가 변할 때마다 동작이 일어나야함(값이 바뀌어야함)
    const [users, setUsers] = useState([]);
    const [inputs, setInputs] = useState(user);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const addButtonRef = useRef();

    // input이 다 똑같이 생겼기 때문에 name으로 구분지음
    // 이벤트가 일어난 타겟의 input을 key와 value를 가져오고 겹치는게 있으면 덮어버림
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInputs({...inputs, [name]: value});
    }

    const keyupHandler = (e) => {
        if(e.keyCode === 13){
            let index = 0;
            switch(e.target.name){
                case'username': index =1; break;    // keyup이 일어나면 다음 인덱스
                case'password': index =2; break;
                case'name': index =3; break;
                default:addButtonRef.current.click();

            }
            if(index !== 0){
                inputRefs[index].current.focus();   // 다음 인덱스로 포커스
            }
            
        }
    }


    // users는 add되었을 때 호출 되어야함
    const addHandler = () => {
        // inputs에 강제 접근해서 바꾸면 안되기에 복사 형식으로 가져옴
        // 얕은 복사 = 주소값 복사  => const user = inputs
        // 깊은 복사 = 안에 있는 값을 들고와서 새로운 배열을 바꿈
        const user = { // 깊은 복사이기에 inputs은 바뀌지 않음
            ...inputs
        };

        user.id = userIndex.current++;

        setUsers([...users, user]); // 기존값을 다 들고오고 그 뒤에 새로운 user 추가
    }
    
    const onRemove = (index) => {
        // index는 +1특징을 가지고있기 때문에 index - 1의 index를 지워줌
        // users.splice(index - 1, 1);
        // setUsers([...users, user]);

        // index와 id가 같지 않은 user를 배열로 만들어서 copy => state가 변했으므로 렌더링이 일어남
        setUsers(users.filter(user => user.id !== index));
    }

    const onModify = (index) => {
        setUsers(users.map(user => {
            if(user.id === index) {
                // inputs를 그대로 가져와야지 저장됨. inputs 없이 그대로 확인 눌렀을 때 이전 작업값이 저장됨
                setInputs({...user});
                user.modifyFlag = true;
            }else {
                user.modifyFlag = false;
            }
            return user;
        }));
    }

    const onSave = (index) => {
        setUsers(users.map(user => {
            if(user.id === index) {
                user.modifyFlag = true;
                return {
                    ...inputs,
                    id: user.id
                };
            }
            return user;
        }));
    }

    // const users = [
    //     {
    //         id: 1,
    //         username: 'aaa',
    //         password: '1234',
    //         name: 'AAA',
    //         email: 'aaa@gmail.com'
    //     },
    //     {
    //         id: 2,
    //         username: 'bbb',
    //         password: '1234',
    //         name: 'BBB',
    //         email: 'bbb@gmail.com'
    //     },
    //     {
    //         id: 3,
    //         username: 'ccc',
    //         password: '1234',
    //         name: 'CCC',
    //         email: 'ccc@gmail.com'
    //     }
    // ] 

    return (
        <div css={S.Container}>
            <div>
                {/* 굳이 컴포넌트로 쪼개서 다룰 필요없이 한 덩어리(pages)로 관리 */}
                {/* 리액트는 변한 상태를 계속 유지해야하기 때문에 onClick은 무조건 클릭이 일어나야하여 버튼에 의존되어 다른 곳에서 값을 가져오지 못하기 때문에 onChange로 입력 될 때마다 값을 바꿔서 상태 유지*/}
                <input css={S.Input} type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='username' name='username' ref={inputRefs[0]} defaultValue={inputs.username}/>
                <input css={S.Input} type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='password' name='password' ref={inputRefs[1]} defaultValue={inputs.password}/>
                <input css={S.Input} type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='name' name='name' ref={inputRefs[2]} defaultValue={inputs.name}/>
                <input css={S.Input} type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='email' name='email' ref={inputRefs[3]} defaultValue={inputs.email}/>
                <button type='button' onClick={addHandler} ref={addButtonRef}>추가</button>
            </div>
            <table css={S.Table}>
                <thead>
                    <tr>
                        <th css={S.ThAndTd}>index</th>
                        <th css={S.ThAndTd}>usernmae</th>
                        <th css={S.ThAndTd}>password</th>
                        <th css={S.ThAndTd}>name</th>
                        <th css={S.ThAndTd}>email</th>
                        <th css={S.ThAndTd}>update</th>
                        <th css={S.ThAndTd}>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* users가 array여야지 map을 쓸 수 있음, array를 통해서 index-key를 꺼내서 가공해서 새로운 배열로 만드는 것 = map 
                        users 배열에 들어있는 객체를 꺼내면 user, user안에 JSX 있는 값을 return -> 다시 만듬
                        표현식으로 묶여있고 users가 변했을 때 새로 만들어져야하기 때문에 users는 state로 관리 되어야함함
                    */}
                    {users.map(user => {

                        return(
                            <tr key={user.id}>
                                <td css={S.ThAndTd}>{user.id}</td>
                                <td css={S.ThAndTd}>{user.modifyFlag ? (<input type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='username' name='username' ref={inputRefs[0]} defaultValue={user.username} />) : user.username}</td>
                                <td css={S.ThAndTd}>{user.modifyFlag ? (<input type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='password' name='password' ref={inputRefs[1]} defaultValue={user.password} />) : user.password}</td>
                                <td css={S.ThAndTd}>{user.modifyFlag ? (<input type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='name' name='name' ref={inputRefs[2]} defaultValue={user.name} />) : user.name}</td>
                                <td css={S.ThAndTd}>{user.modifyFlag ? (<input type="text" onKeyUp={keyupHandler} onChange={inputHandler} placeholder='email' name='email' ref={inputRefs[3]} defaultValue={user.email} />) : user.email}</td>
                                <td css={S.ThAndTd}>
                                    {user.modifyFlag 
                                        ? (<button onClick={() => onSave(user.id)}>확인</button>)
                                        : (<button onClick={() => onModify(user.id)}>수정</button>) 
                                    }
                                </td>
                                <td css={S.ThAndTd}>
                                    <button onClick={() => onRemove(user.id)}>삭제</button>    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;