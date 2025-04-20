# 🔍 Basic Search Queries

## 1. Search by name or email (default)
```http
GET /api/users/search?q=john
```

## 2. Search by name only
```http
GET /api/users/search?q=john&searchBy=name
```

## 3. Search by email only
```http
GET /api/users/search?q=gmail.com&searchBy=email
```

---

# 🧑‍🧙‍ Relationship-Based Filters

## 4. Search only among friends
```http
GET /api/users/search?q=alex&filter=friends
```

## 5. Search only among blocked users
```http
GET /api/users/search?q=spam&filter=blocked
```

## 6. Search only among incoming requests
```http
GET /api/users/search?q=rahul&filter=requests
```

## 7. Search only among pending (sent requests)
```http
GET /api/users/search?q=deepa&filter=pending
```

---

# 🚫 Blocked User Handling

## 8. Search all users but exclude blocked ones
```http
GET /api/users/search?q=arya&excludeBlocked=true
```

## 9. Search among friends but exclude blocked ones
```http
GET /api/users/search?q=lucas&filter=friends&excludeBlocked=true
```

---

# 📧 Email Exclusion Filter

## 10. Search all users but exclude a specific email
```http
GET /api/users/search?q=singh&excludeEmail=admin@bolt.com
```

## 11. Search only by email, and exclude an email
```http
GET /api/users/search?q=@gmail.com&searchBy=email&excludeEmail=owner@bolt.com
```

---

# 🧪 Combined Power

## 12. Search pending requests, by name, excluding blocked
```http
GET /api/users/search?q=devika&filter=pending&searchBy=name&excludeBlocked=true
```

## 13. Search friends, by email, excluding a certain email
```http
GET /api/users/search?q=workmail.com&filter=friends&searchBy=email&excludeEmail=ceo@bolt.com
```

---

# ℹ️ Notes

- `q` is the search query (required).
- `searchBy` supports: `name`, `email`, or defaults to both.
- `filter` supports: `friends`, `blocked`, `requests`, `pending`, or `all` (default).
- `excludeBlocked=true` removes blocked users from the result.
- `excludeEmail=example@domain.com` omits a specific email from the result.
- All results are **lexicographically ordered** by name or email.

