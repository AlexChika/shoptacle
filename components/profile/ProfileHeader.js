import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import { BiExit, BiEnvelope } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { memo } from "react";

function ProfileHeader({ user, handleLogout, noOfReviews, noOfOrders }) {
  return (
    <>
      <HeaderSection>
        <HeaderOverlay />
      </HeaderSection>

      <ProfileContent>
        <ProfileTop>
          <ProfileImageSection>
            <ProfileImageWrapper>
              {user.url ? (
                <ProfileImage src={user.url} alt="Profile" />
              ) : (
                <DefaultAvatar>
                  <AvatarInitials>
                    {(user.firstName?.charAt(0) || "U") +
                      (user.lastName?.charAt(0) || "")}
                  </AvatarInitials>
                </DefaultAvatar>
              )}

              <VerificationBadge>
                <VerificationIcon>
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </VerificationIcon>
              </VerificationBadge>
            </ProfileImageWrapper>
          </ProfileImageSection>

          <UserInfoAndActions>
            <UserInfoSection>
              <UserNameSection>
                <UserName>
                  {user.firstName || "User"} {user.lastName || ""}
                </UserName>
                <UserMeta>
                  <UserTitle>Premium Customer</UserTitle>
                  <OnlineStatus>
                    <StatusDot />
                    <StatusText>Online</StatusText>
                  </OnlineStatus>
                </UserMeta>
              </UserNameSection>

              <ActionButtons>
                <EditButton>
                  <FaUserEdit />
                  Edit Profile
                </EditButton>
                <LogoutButton onClick={handleLogout}>
                  <BiExit />
                  Logout
                </LogoutButton>
              </ActionButtons>
            </UserInfoSection>
          </UserInfoAndActions>
        </ProfileTop>

        <StatsGrid>
          <StatCard>
            <StatNumber>{noOfOrders || "0"}</StatNumber>
            <StatLabel>Orders</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{noOfReviews || "0"}</StatNumber>
            <StatLabel>Rating</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>2Y</StatNumber>
            <StatLabel>Member</StatLabel>
          </StatCard>
        </StatsGrid>

        <ContactGrid>
          <ContactCard>
            <ContactIcon>
              <BiEnvelope />
            </ContactIcon>
            <ContactInfo>
              <ContactLabel>Email Address</ContactLabel>
              <ContactValue>{user.email || "Not provided"}</ContactValue>
            </ContactInfo>
          </ContactCard>

          <ContactCard>
            <ContactIcon>
              <MdLocationPin />
            </ContactIcon>
            <ContactInfo>
              <ContactLabel>Address</ContactLabel>
              <ContactValue>{user.address || "Not provided"}</ContactValue>
            </ContactInfo>
          </ContactCard>
        </ContactGrid>
      </ProfileContent>
    </>
  );
}

export default memo(ProfileHeader);

const HeaderSection = styled.div`
  background-image: linear-gradient(135deg, #fbcfe8, #f9a8d4, #e9d5ff);

  height: 100px;
  position: relative;

  @media (min-width: 800px) {
    height: 160px;
  }
`;

const HeaderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
`;

const ProfileContent = styled.div`
  position: relative;
  padding: 0 24px 24px;
`;

const ProfileTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: -64px;
  margin-bottom: 24px;

  @media (min-width: 700px) {
    gap: 24px;
    flex-direction: row;
    align-items: flex-end;
  }
`;

const ProfileImageSection = styled.div`
  flex-shrink: 0;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 16px;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 160px 240px -48px rgba(0, 0, 0, 0.1),
    0 64px 96px -32px rgba(0, 0, 0, 0.05);

  @media (min-width: 700px) {
    height: 125px;
  }

  @media (min-width: 768px) {
    width: 128px;
    height: 128px;
  }
`;

const DefaultAvatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0f172a, #1e293b, #334155);

  border: 4px solid white;
  box-shadow: 0 160px 240px -48px rgba(0, 0, 0, 0.1),
    0 64px 96px -32px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 700px) {
    height: 125px;
  }

  @media (min-width: 768px) {
    width: 128px;
    height: 128px;
  }
`;

const AvatarInitials = styled.span`
  color: white;
  font-size: 24px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const VerificationBadge = styled.div`
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: white;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 160px 240px -48px rgba(0, 0, 0, 0.1),
    0 64px 96px -32px rgba(0, 0, 0, 0.05);
`;

const VerificationIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const UserInfoAndActions = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;

  @media (min-width: 700px) {
    width: auto;
  }
`;

const UserInfoSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const UserNameSection = styled.div``;

const UserName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const UserTitle = styled.span`
  background: #f3e8ff;
  color: #7c3aed;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #059669;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
`;

const StatusText = styled.span`
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;
  white-space: nowrap;
  max-height: 32px;
  align-self: flex-end;
  & * {
    white-space: nowrap;
  }
`;

const EditButton = styled(BaseButton)`
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;

  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const LogoutButton = styled(BaseButton)`
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;

  &:hover {
    background: #fee2e2;
    border-color: #fca5a5;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContactCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const ContactIcon = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.1),
    0 16px 32px 0 rgba(0, 0, 0, 0.06);
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ContactLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

const ContactValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  word-break: break-word;
`;
