import { ApiRoutes } from '@enums/apiRoutes.enum';
import { Roles } from '@enums/roles.enum';
import { apiClient } from '@services/apiClient';
import { ScreenContainer } from '@styles/defaults';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { User } from './components/User';

interface UserData {
  id: number;
  email: string;
  name: string;
  cpf: string;
  role: Roles;
}

export function UserAdministration() {
  const { data: users, refetch } = useQuery<UserData[]>(
    ['usersAdministration'],
    async () => {
      try {
        const response = await apiClient.get<UserData[]>(ApiRoutes.USER);

        console.log(response.data);

        return response.data;
      } catch {
        return [];
      }
    },
    {
      initialData: [],
    }
  );

  function refetchUsers() {
    refetch();
  }

  return (
    <ScreenContainer>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <User user={item} refetchUsers={refetchUsers} />
        )}
        keyExtractor={(user) => String(user.id)}
      />
    </ScreenContainer>
  );
}
