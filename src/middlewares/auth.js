import { auth } from "../configs/firebase.js";

export const authentificateToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Token required" });

      const decodedToken = await auth.verifyIdToken(token);

      let user = await prisma.user.findUnique({
        where: {
          user_uid: decodedToken.uid,
        },
      });

      // If the user does not exist, create a new user
      if (!user) {
        user = await prisma.user.create({
          data: {
            user_uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || "Anonymous", // You can adjust based on the available fields
          },
        });
      }

      // Attach the user to the request object for further use
      req.user = user;
      
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(403).json({ message: "Forbidden" });
  }
};
