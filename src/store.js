import { create } from 'zustand'

// A "comanda": serviços escolhidos, preferências e se o painel está aberto.
// Partilhada entre a Carta, a barra de ação e o painel de reserva.
// capacidade: a aba aberta no capítulo do sistema (parte da demonstração).
export const useComanda = create((set) => ({
  ids: [],
  open: false,
  prefs: { dia: 'O mais cedo possível', periodo: 'Sem preferência', barbeiro: 'Sem preferência', nome: '' },
  capacidade: 'pedidos',
  toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id] })),
  setOpen: (open) => set({ open }),
  setPref: (key, value) => set((s) => ({ prefs: { ...s.prefs, [key]: value } })),
  setCapacidade: (capacidade) => set({ capacidade }),
}))
