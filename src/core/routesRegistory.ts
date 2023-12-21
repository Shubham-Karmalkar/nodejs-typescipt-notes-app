import fs from "fs";
import path from "path";
import { Express, Router } from "express";

export function collectRoute(dirPath: string): string[] {
  const totalPaths = collectAllPaths(dirPath);
  const routePaths = totalPaths.filter((path) => path.includes("routes"));
  return routePaths;
}

function collectAllPaths(dirPath: string): string[] {
  const resultFile = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isDirectory()) {
      const files = collectRoute(filePath);
      resultFile.push(...files);
    } else {
      resultFile.push(filePath);
    }
  }
  return resultFile;
}

export async function configureRoutes(dirPath: string | string[], app: Express) {
  const routes = typeof dirPath === "string" ? [dirPath] : dirPath;
  const routesPaths: string[] = [];

  routes.forEach((paths) => {
    routesPaths.push(...collectRoute(paths));
  });
  for (const route of routesPaths) {
    const routePath = "../" + route.split("/").slice(1).join("/").split(".").slice(0, -1).join(".");
    const router = await import(routePath);
    let apiPath = route.split("/").slice(2, -1).join("/");
    apiPath = "/" + apiPath;
    app.use(apiPath, router.router);
  }
  console.log("Routes are loaded");
}
