export default {
  async getUser(user) {
    return userRepository.create(user);
  },
  async getAll() {
    return (await userRepository.findAll()).map((x) => x.toJSON);
  },
};
