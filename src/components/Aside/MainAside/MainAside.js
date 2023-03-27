/** @jsxImportSource @emotion/react */
import React from 'react';
import { Navigation } from 'react-minimal-side-navigation/lib';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { HiHome } from 'react-icons/hi';
import { GrTest } from 'react-icons/gr';
import { BsCardChecklist } from 'react-icons/bs';
import { BiListCheck } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import * as S from './style';
import { useNavigate } from 'react-router-dom';

const MainAside = ( {children} ) => {
    const navigate = useNavigate(); // 한번 렌더링된 상태에서 itemId로 라우터만 넘어감

    return (
        <aside css={S.style}> 
            <Navigation
            activeItemId="/"  // 기본 root 경로
            onSelect={({ itemId }) => {
                navigate(itemId);
            }}
            items={[
                {
                    title: 'Home',
                    itemId: '/',
                    elemBefore: () => <HiHome />
                },
                {
                    title: 'T1',
                    itemId: '/t1',
                    elemBefore: () => <GrTest />
                },                
                {
                    title: 'T2',
                    itemId: '/t2',
                    elemBefore: () => <GrTest />
                },
                {
                    title: 'Sample',
                    itemId: '/sample/input/1',
                    elemBefore: () => <BsCardChecklist />,
                    subNav: [
                        {
                            title: 'input1',
                            itemId: '/sample/input/1',
                            elemBefore: () => <BiListCheck />
                        }
                    ]
                },
                {
                    title: 'List',
                    itemId: '/users',
                    elemBefore: () => <BsCardChecklist />,
                    subNav: [
                        {
                            title: '사용자 전체 조회',
                            itemId: '/users',
                            elemBefore: () => <FaUsers />
                        }
                    ]
                }
            ]}
          />
            {children}
        </aside>
    );
};

export default MainAside;