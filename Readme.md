# 🛠️ Project Roadmap: Real-Time Chat App

## ✅ Completed
- [x] Setup project structure
- [x] Authentication Module (with unit & integration tests)
- [x] MongoDB schema design
- [ ] Redis cache planning
- [x] ERD generation

---

## 🔧 In Progress
- [x] Folder structure finalization
- [ ] Module scaffolding
- [ ] Base utility functions (e.g., response wrapper, error handler)

---

## 🔜 To Do

### 1. User Module
- [ ] Get user by ID/email
- [ ] Update profile info
- [ ] Avatar upload & retrieval
- [ ] Block user / Unblock user
- [ ] Settings (dark mode, notifications)

### 2. Chat Module
- [ ] Create private chat
- [ ] Create group chat
- [ ] Fetch user chat list
- [ ] Chat deletion/archival

### 3. Message Module
- [ ] Send text message
- [ ] Send media (image, video, etc.)
- [ ] Fetch messages with pagination
- [ ] Mark as read/delivered
- [ ] Real-time socket messaging

### 4. Group Module
- [ ] Group creation
- [ ] Add/remove participants
- [ ] Admin controls (promote/demote)
- [ ] Group settings & metadata

### 5. Notification Module
- [ ] New message notifications
- [ ] Group invites
- [ ] Mention alerts
- [ ] Read/unread toggle

### 6. Attachment Module
- [ ] Upload files
- [ ] File type detection
- [ ] Download endpoint

### 7. Invite Module
- [ ] Generate invite links
- [ ] Accept/Reject invites
- [ ] Expiry & permissions

### 8. Message Status Module
- [ ] Track delivery & read receipts
- [ ] Per-user message view status

### 9. Know User / Relationship Module
- [ ] Send friend request
- [ ] Accept/Reject
- [ ] Block/unfriend logic

---

## 📦 Infrastructure
- [ ] MongoDB connection pooling
- [ ] Redis integration
- [ ] Socket.IO setup
- [ ] Environment config & validation
- [ ] Logging (Winston or similar)

---

## 🧪 Testing
- [ ] Unit tests for all modules
- [ ] Integration tests for major flows
- [ ] Mocking external services (e.g., S3, Redis)
- [ ] Manual test cases

---

## 🚀 Deployment
- [ ] Docker setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] .env setup and secret management
- [ ] Production readiness checklist

---

## 📚 Documentation
- [ ] Swagger/OpenAPI spec
- [ ] Dev setup guide
- [ ] Endpoint descriptions
- [ ] README polish
