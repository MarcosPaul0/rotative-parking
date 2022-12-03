import { IconButton } from '@components/IconButton';
import { Roles } from '@enums/roles.enum';
import { Pen, Trash } from 'phosphor-react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import { DeleteUserModal } from '../DeleteUserModal';
import { UpdateUserRoleModal } from '../UpdateUserRoleModal';
import {
  ButtonsContainer,
  ContentContainer,
  LeftText,
  LineContainer,
  RightText,
  UserContainer,
} from './styles';

export interface UserData {
  id: number;
  name: string;
  cpf: string;
  role: Roles;
}

interface UserProps {
  user: UserData;
  refetchUsers: () => void;
}

export function User({ user, refetchUsers }: UserProps) {
  const { COLORS } = useContext(ThemeContext);

  const [updateUserRoleModalIsOpen, setUpdateUserRoleModalIsOpen] =
    useState(false);

  function openUpdateUserRoleModal() {
    setUpdateUserRoleModalIsOpen(true);
  }

  function closeUpdateUserRoleModal() {
    setUpdateUserRoleModalIsOpen(false);
  }

  const [deleteUserModalIsOpen, setDeleteUserModalIsOpen] = useState(false);

  function openDeleteUserModal() {
    setDeleteUserModalIsOpen(true);
  }

  function closeDeleteUserModal() {
    setDeleteUserModalIsOpen(false);
  }

  return (
    <>
      <UpdateUserRoleModal
        isOpen={updateUserRoleModalIsOpen}
        closeModal={closeUpdateUserRoleModal}
        refetchUsers={refetchUsers}
        user={user}
      />

      <DeleteUserModal
        isOpen={deleteUserModalIsOpen}
        closeModal={closeDeleteUserModal}
        refetchUsers={refetchUsers}
        userId={user.id}
      />

      <UserContainer>
        <ContentContainer>
          <LineContainer>
            <LeftText>Nome</LeftText>
            <RightText>{user.name}</RightText>
          </LineContainer>

          <LineContainer>
            <LeftText>CPF</LeftText>
            <RightText>{user.cpf}</RightText>
          </LineContainer>

          <LineContainer>
            <LeftText>Cargo</LeftText>
            <RightText>{user.role}</RightText>
          </LineContainer>
        </ContentContainer>

        <ButtonsContainer>
          <IconButton
            icon={<Pen color={COLORS.BLACK} />}
            bgColor="yellow"
            onPress={openUpdateUserRoleModal}
          />
          <IconButton
            icon={<Trash color={COLORS.GRAY_100} />}
            bgColor="red"
            onPress={openDeleteUserModal}
            mt={10}
          />
        </ButtonsContainer>
      </UserContainer>
    </>
  );
}
