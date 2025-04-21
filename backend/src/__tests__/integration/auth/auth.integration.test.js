import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import { app } from "../../../app.js"; // Your Express app
import { User } from "../../../modules/user/models/user.js";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("🔗 Auth Integration Flow", () => {
  const userData = {
    email: "integration@example.com",
    password: "Integration_123",
  };

  let cookie;

  test("1️⃣ Signup → should create user and set cookie", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send(userData)
      .expect(200);

    expect(res.body.type).toBe("success");
    expect(res.body.payload.user.email).toBe(userData.email.toLowerCase());
  });

  test("2️⃣ Login → should return cookie and user data", async () => {
    await request(app).post("/api/auth/signup").send(userData);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    expect(res.body.type).toBe("success");
    expect(res.body.payload.user.email).toBe(userData.email.toLowerCase());
    expect(res.headers["set-cookie"]).toBeDefined();

    cookie = res.headers["set-cookie"];
  });

  test("3️⃣ Authenticated GET /me → should return user", async () => {
    await request(app).post("/api/auth/signup").send(userData);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    cookie = loginRes.headers["set-cookie"];

    const res = await request(app)
      .get("/api/user/me")
      .set("Cookie", cookie)
      .expect(200);

    expect(res.body.type).toBe("success");
    expect(res.body.payload.user).toHaveProperty("_id");
    expect(res.body.payload.user.email).toBe(userData.email.toLowerCase());
  });

  test("4️⃣ Logout → should clear cookie", async () => {
    await request(app).post("/api/auth/signup").send(userData);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    cookie = loginRes.headers["set-cookie"];

    const res = await request(app)
      .get("/api/auth/logout")
      .set("Cookie", cookie)
      .expect(200);

    expect(res.body.type).toBe("success");
    expect(res.body.message.toLowerCase()).toContain("logged out");
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("accessToken=;")])
    );
  });

  test("5️⃣ /me without cookie → should return 401", async () => {
    const res = await request(app).get("/api/user/me").expect(401);
    expect(res.body.type).toBe("error");
    expect(res.body.message.toLowerCase()).toContain("unauthorized");
  });
});
