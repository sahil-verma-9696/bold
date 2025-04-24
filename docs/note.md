httpOnly: true, // prevent XSS attacks, cross-site script injection
secure: false, // allow only http
sameSite: "None", // preven


if **sameSite** == "None" then **secure** should be **true**