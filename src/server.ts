import { Express } from "express";
import { configureRoutes, postRouteMiddleware, preRouteMiddleware } from "./core";

export async function init(app: Express) {
  const PORT = process.env.PORT || 5000;
  preRouteMiddleware.use(app);
  await configureRoutes("./src/apps", app);
  postRouteMiddleware.use(app);
  app.listen(PORT, () => {
    console.log(`Serving on http://localhost:${PORT}`);
  });
}
