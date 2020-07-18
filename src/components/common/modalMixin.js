const modalMixin = {
  openModal(newObject) {
    newObject.required = true;
    this.setState({ ...this.state, newObject });
  },

  closeModal(newObject) {
    newObject.required = false;
    this.setState({ ...this.state, newObject });
  },
};

export default modalMixin;
