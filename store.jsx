import { create } from 'zustand'
import { createJSONStorage,persist } from 'zustand/middleware'

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))

export const PanierStore = create(persist((set) => ({
  FOODLIST: [],
  addFood: (food) => set((state) => ({ FOODLIST:[...state.FOODLIST, {...food, qte:1} ]})),
  // removeFood: (food) => set({ FOODLIST.filter((fod)=>fod.id !== food.id) }), OM NUM- 655 935 823
  setFoodList: (newFoodList) => set({ FOODLIST: newFoodList }),
  removeAllFood: () => set({ FOODLIST: [] }),

}),
{
  name:"plat",
  storage: createJSONStorage(()=>sessionStorage)
}
))

export const userStore = create(persist((set) => ({
  USERS: {},
  setCurrentUser: (user)=>set(({  USERS:{...user, isConnected: true}})),
  logOutCurrentUser: (user)=>set({USERS:{...user, isConnected: false}})
}),
{
  name: "utilisateur",
  storage: createJSONStorage(()=>sessionStorage)
}
))
//METTRE LE STORAGE SESSION DANS LE STORE DE COMMENTAIRES

export const commentStore = create((set) => ({
  COMMENTS: [],
  addToCommentList: (comment) => set((state) => ({ COMMENTS:[...comment ]})),
})
)

export const userListStorage = create((set) => ({
  USERLIST: [],
  removeAllUsers: () => set({ USERLIST: [] }),
  addUserOnList: (user) => set((state) => ({ USERLIST:[...state.USERLIST, ...user ]})),
  // removeFood: (food) => set({ FOODLIST.filter((fod)=>fod.id !== food.id) }), OM NUM- 655 935 823
  setUserList: (newUserList) => set({ USERLIST: newUserList })
  
})
)