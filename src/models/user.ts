

export default {
  namespace: 'user',
  state: {
    name: '一二一三八'
  },
  reducers: {
    saveName(state, { payload }) {
      return {
        ...state,
        name: payload
      }
    }
  },
  effects: {

  }
}