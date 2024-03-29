const express = require("express");
const app = express();

const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const reviewRoutes = require("./reviewRoutes");
const bannerRoutes = require("./bannerRoutes");

const jwt = require("jsonwebtoken");

app.get("/logout", (req, res) => {
  return res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send("access token cleared");
});

app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies["access_token"];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    return res.json({
      userInfo: {
        _id: decoded._id,
        name: decoded.name,
        email: decoded.email,
        doNotLogout: decoded.doNotLogout,
        isAdmin: decoded.isAdmin,
      },
    });
  } catch (err) {
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/review", reviewRoutes);
app.use("/banners", bannerRoutes);

module.exports = app;
