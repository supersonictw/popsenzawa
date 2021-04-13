export const state = () => ({
  profile: {},
})

export const mutations = {
  setProfile(state, profile) {
    Object.assign(state.profile, profile)
  },
}
