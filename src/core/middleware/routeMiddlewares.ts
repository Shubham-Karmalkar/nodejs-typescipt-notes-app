import { Express } from "express";
import { Func } from "../../types";

class RouteMiddleware {
  private readonly preRouteMiddleware: Func<any>[] = [];
  add(func: Func<any>) {
    this.preRouteMiddleware.push(func);
  }
  use(app: Express) {
    for (const func of this.preRouteMiddleware) {
      app.use(func);
    }
  }
}

export const preRouteMiddleware = new RouteMiddleware();
export const postRouteMiddleware = new RouteMiddleware();
