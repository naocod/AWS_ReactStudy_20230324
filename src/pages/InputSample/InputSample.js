import React, { useRef, useState } from 'react';

const InputSample = () => {
    const userInfo = {
        username: '',
        password: ''
    }

    const [userInput, setUserInput] = useState(userInfo);
    const [userInfoText, setUserInfoText] = useState(userInfo);
    //         변수      호출되는 funtion

    const { username, password } = userInfoText;    // 초기화
    // 비구조로 뺐기 때문에 userInfoText의 값이 변하면 대입됨

    // 객체 가져오는 법 useRef
    const passwordRef = useRef();

    const handlerChange = (e) => {
        // e.target > 어떠한 이벤트가 일어나면 무조건 이벤트 객체가 파라미로 전달이 돼서 매개변수로 e라는 이벤트 객체가 들어감
        // document.quertSelector(".className") 과 같음
        const { name, value } = e.target; // e.target 자체가 객체니까 비구조 할당을 통해서  name, value을 꺼낼 수 있게 함함
        setUserInput({...userInput, [name]: value});   //...은 안에 있는 상태 그대로 복사함. 객체로 가져옴
        // 중괄호를 써줘야 userInfo가 중괄호로 묶여서 들어온 것
        // username: '',
        // password: '', 
        // usernmae: value, password: value => [name]: value

        // usernmae: value, password: value가 위에 있는 빈 값을 덮어 씀 => 그럼 setUserInput의 상태가 변하고 userInput의 값이 바뀜
    }

    const nextFocus = (e) => {
        if(e.keyCode === 13) {   // 13 == enter
            passwordRef.current.focus();
        }
    }

    const submitHandler = (e) => {
        if(e.keyCode === 13) {  // === > 자료형이랑 값까지 일치해야함
            setUserInfoText({...userInput}); // userInput은 계속 바뀌니까 enter가 일어났을 떄 setUserInfoText해줌
            // enter가 일어나면 setUserInfoText의 상태가 바뀌면서 userInfoText에 대입이 되면서 값이 바뀜
        }
    }

    return (
        <div>
            <input 
                type="text" 
                onChange={handlerChange} // onChange이벤트가 발생하면 handlerChange 메소드 호출
                onKeyUp={nextFocus}
                name="username" 
            />
            <input 
                type="text" 
                onChange={handlerChange}
                onKeyUp={submitHandler}
                name="password" 
                ref={passwordRef}
            />
            <div>username: {username}</div>
            <div>password: {password}</div>
        </div>
    );
};

export default InputSample;