import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';  // Import for mocking requests
import bcrypt from 'bcryptjs';  // Import bcryptjs for password hashing
// ✅ FIXED MOCK
jest.unstable_mockModule('../../../modules/auth/user.model.js', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

// 👇 Move all imports to after mocking
let User, signup, login, logout, getMe;

describe("🧪 Unit Test - Auth Controllers", () => {
  beforeAll(async () => {
    // Dynamically import the necessary modules after mocking
    const userModel = await import('../../../modules/auth/user.model.js');
    const userController = await import('../../../modules/auth/user.controller.js');

    User = userModel.User;
    ({ signup, login, logout, getMe } = userController);

    console.log("User.findOne is mocked?", jest.isMockFunction(User.findOne));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("📝 signup", () => {
    test("✅ should create a user and respond with success", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: { name: "Test", email: "test@example.com", password: "pass123" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: "1",
        name: "Test",
        email: "test@example.com",
      });

      await signup(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });

    test("🚫 should return error if user already exists", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: { name: "Test", email: "test@example.com", password: "pass123" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      User.findOne.mockResolvedValue({ email: "test@example.com" });

      await signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error" })
      );
    });
  });
  describe("🔐 login", () => {
    test("✅ should log in successfully", async () => {
      const plainPassword = "pass123";
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
      const req = httpMocks.createRequest({
        method: "POST",
        body: { email: "test@example.com", password: plainPassword },
      });
  
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });
      res.cookie = jest.fn();
  
      // mock comparePassword logic here
      User.findOne.mockResolvedValue({
        id: "1",
        email: "test@example.com",
        password: hashedPassword,
        comparePassword: async function (input) {
          return await bcrypt.compare(input, this.password);
        },
      });
  
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });
  
    test("🚫 should return error for invalid credentials", async () => {
      const plainPassword = "wrong";
      const hashedPassword = await bcrypt.hash("correctpass", 10);
  
      const req = httpMocks.createRequest({
        method: "POST",
        body: { email: "test@example.com", password: plainPassword },
      });
  
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });
  
      User.findOne.mockResolvedValue({
        email: "test@example.com",
        password: hashedPassword,
        comparePassword: async function (input) {
          return await bcrypt.compare(input, this.password);
        },
      });
  
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error" })
      );
    });
  });
  

  describe("🚪 logout", () => {
    test("✅ should clear accessToken cookie", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });
      res.clearCookie = jest.fn();

      await logout(req, res);
      expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("👤 getMe", () => {
    test("✅ should return user profile", async () => {
      const req = httpMocks.createRequest({
        user: { id: "1", email: "test@example.com", name: "Test" },
      });
      const res = httpMocks.createResponse();
      const json = jest.fn();
      res.status = jest.fn().mockReturnValue({ json });

      await getMe(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
    });
  });
});
