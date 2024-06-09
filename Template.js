// AbstractClass.js
class AbstractClass {
  async getAll() {
    try {
      const data = await this.retrieveAll();
      return data;
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu.");
    }
  }

  async getByID(_id) {
    try {
      const entity = await this.retrieveByID(_id);
      if (!entity) {
        throw new Error("Entity not found");
      }
      return entity;
    } catch (error) {
      throw new Error("Error while fetching entity by ID");
    }
  }

  async retrieveAll() {
    throw new Error("Phương thức retrieveAll chưa được triển khai.");
  }

  async retrieveByID(_id) {
    throw new Error("Phương thức retrieveByID chưa được triển khai.");
  }
}

module.exports = AbstractClass;
