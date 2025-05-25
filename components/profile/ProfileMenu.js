import React, { useState, useRef, useCallback, memo } from "react";
import { BsCartFill, BsChatSquareText } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import styled from "styled-components";
import Orders from "./Orders";
import Reviews from "./Reviews";
import EditProfile from "./EditProfile";

function ProfileMenu({ reviews, orders }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRef = useRef(null);

  const handleSwitchTabs = useCallback(function (index) {
    setActiveTab(index);
    if (tabRef.current) {
      window.scrollTo(0, Number(tabRef.current.offsetTop) - 100);
    }
  }, []);

  const menuItems = [
    {
      name: "Orders",
      icon: <BsCartFill />,
      count: orders.length,
    },
    {
      name: "Reviews",
      icon: <BsChatSquareText />,
      count: reviews.length,
    },
    {
      name: "Profile",
      icon: <FaUserEdit />,
    },
  ];

  return (
    <MenuWrapper ref={tabRef}>
      <MenuNavigation>
        {menuItems.map((item, index) => (
          <TabButton
            key={index}
            onClick={() => handleSwitchTabs(index)}
            $isActive={activeTab === index}
          >
            <TabIcon $isActive={activeTab === index}>{item.icon}</TabIcon>
            <TabContent>
              <TabName>{item.name}</TabName>
              {item.count && (
                <TabCount $isActive={activeTab === index}>
                  ({item.count})
                </TabCount>
              )}
            </TabContent>
          </TabButton>
        ))}
      </MenuNavigation>

      <ContentArea>
        {activeTab === 0 && <Orders orders={orders} />}

        {activeTab === 1 && <Reviews reviews={reviews} />}

        {activeTab === 2 && <EditProfile />}
      </ContentArea>
    </MenuWrapper>
  );
}

export default memo(ProfileMenu);

const MenuWrapper = styled.section`
  margin-top: 30px;
`;

const MenuNavigation = styled.div`
  display: flex;
  margin: 0px 10px;
  gap: 5px;
`;

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  gap: 8px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  color: ${(props) => (props.$isActive ? "#6366f1" : "#6b7280")};
  font-weight: ${(props) => (props.$isActive ? "600" : "500")};

  background: ${(props) => (props.$isActive ? "white" : "#fafbfc")};

  border: ${(props) =>
    props.$isActive ? "4px solid #f3f4f6" : "4px solid transparent"};

  &:hover {
    background: ${(props) => (props.$isActive ? "white" : "whitesmoke")};
    color: ${(props) => (props.$isActive ? "#6366f1" : "#374151")};
  }

  @media (min-width: 500px) {
    flex-direction: row;
    padding: 16px;
  }

  @media (min-width: 640px) {
    gap: 12px;
    padding: 20px 24px;
  }
`;

const TabIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${(props) => (props.$isActive ? "#eef2ff" : "#f3f4f6")};
  color: ${(props) => (props.$isActive ? "#6366f1" : "#6b7280")};
  transition: all 0.2s ease;

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TabName = styled.span`
  font-size: 14px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const TabCount = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$isActive ? "#6366f1" : "#9ca3af")};
  font-weight: 500;
`;

const ContentArea = styled.div`
  min-height: 400px;
  padding: 0px 5px;
`;
