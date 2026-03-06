import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getUserList, getUserById } from '../api/user';

// 定义类型
interface UserInfo {
  id: string | number;
  name: string;
  age?: number;
  email: string;
}

interface UserStore {
  userList: UserInfo[];
  currentUser: UserInfo | null;
  loading: boolean;
  login: (name: string, token: string) => void;
  logout: () => void; 
  setLoading: (loading: boolean) => void;
  fetchUserList: () => Promise<void>;
  fetchUserById: (id: string | number) => Promise<void>;
  clearCurrentUser: () => void;
}

// 关键：devtools 配置加 enabled: true + 明确 name
export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      userList: [],
      currentUser: null,
      loading: false,
      // 核心：login 方法要接收参数并更新状态
      login: (name, token) => set({ name, token }),
      logout: () => set({ name: '', token: '' }),
        setLoading: (loading) => set({ loading }),
      fetchUserList: async () => {
        set({ loading: true }, false, 'fetchUserList/start');
        try {
          const data = await getUserList();
          set({ userList: data, loading: false }, false, 'fetchUserList/success');
        } catch (error) {
          set({ loading: false }, false, 'fetchUserList/error');
        }
      },

      fetchUserById: async (id) => {
        set({ loading: true }, false, 'fetchUserById/start');
        try {
          const data = await getUserById(id);
          set({ currentUser: data, loading: false }, false, 'fetchUserById/success');
        } catch (error) {
          set({ loading: false }, false, 'fetchUserById/error');
        }
      },

      clearCurrentUser: () => {
        set({ currentUser: null }, false, 'clearCurrentUser');
      },
    }),
    {
      name: 'userStore', // 必须有，DevTools 里显示的名称
      enabled: true, // 强制启用 DevTools（关键！）
      anonymousActionType: 'userStore/action',
    }
  )
);
