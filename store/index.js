export const state = () => ({
  loaded: false,
  profile: {},
})

export const mutations = {
  setLoaded(state) {
    state.loaded = true
  },
  setProfile(state, profile) {
    Object.assign(state.profile, profile)
  },
}
