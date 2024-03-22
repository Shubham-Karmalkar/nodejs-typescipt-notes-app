import { Express } from "express";

type Func = (...args: any[]) => void;
class RouteMiddleware {
  private readonly preRouteMiddleware: Func[] = [];
  add(func: Func) {
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
